import { users } from "../models/Users.ts";
import { bycript, create, getNumericDate, Payload } from "../deps.ts";
import { rr, rs } from "../interfaces.ts";
import { HEADER, KEY } from "../config.ts";

import type { UserSchema } from "../models/Users.ts";

export default {
  register: async ({
    request,
    response,
  }: rr) => {
    try {
      const body = await request.body();
      const { username, name, lastname, password }: UserSchema = await body
        .value;
      const user = await users.findOne({ username });
      if (user) {
        response.body = { error: { msg: "User already exists" } };
        response.status = 422;
        return;
      }
      const hash: string = await bycript.hash(password);
      await users.insertOne({
        username,
        name,
        lastname,
        password: hash,
        is_admin: false,
        cart: []
      });
      response.status = 201;
      response.body = { data: { msg: "OK" } };
    } catch (e) {
      response.body = { error: { msg: e.toString() } };
    }
  },
  login: async ({ request, response }: rr) => {
    const body = request.body();
    const { username, password }: UserSchema = await body.value;
    const user: UserSchema | undefined = await users.findOne({ username });
    if (!await bycript.compare(password, user ? user.password : "")) {
      response.body = {
        error: { msg: "Unauthorizesd" },
      };
      return;
    }
    const payload: Payload = {
      iss: username,
      exp: getNumericDate(60 * 60),
    };
    const jwt = await create(HEADER, payload, KEY);
    response.body = {
      data: {
        token: jwt,
      },
    };
  },
  index: async ({
    response,
  }: rs) => {
    try {
      response.body = {
        data: {
          users: (await users.find().toArray()).map((value) => {
            return {
              username: value.username,
              name: value.name,
              lastname: value.lastname,
            };
          }),
        },
      };
    } catch (e) {
      response.body = { error: { msg: e.toString() } };
    }
  },
};
