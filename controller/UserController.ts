import { users } from "../models/Users.ts";
import {
  bycript,
  Context,
  create,
  getNumericDate,
  Payload,
  Status,
} from "../deps.ts";
import { HEADER, KEY } from "../config.ts";

import type { UserSchema } from "../models/Users.ts";

interface userPayload extends Payload {
  user: UserSchema;
}

export type { userPayload };

export default {
  register: async (ctx: Context) => {
    try {
      const body = ctx.request.body();
      const { username, name, lastname, password }: UserSchema = await body
        .value;
      const user = await users.findOne({ username });
      if (user) {
        ctx.response.body = { error: { msg: "User already exists" } };
        ctx.response.status = 422;
        return;
      }
      await users.insertOne({
        username,
        name,
        lastname,
        password: await bycript.hash(password),
        is_admin: false,
        cart: [],
      });
      ctx.response.status = 201;
      ctx.response.body = { data: { msg: "OK" } };
    } catch (e) {
      ctx.response.body = { error: { msg: e.toString() } };
    }
  },
  login: async (ctx: Context) => {
    try {
      const body = ctx.request.body();
      const { username, password }: UserSchema = await body.value;
      const user = await users.findOne({ username });
      if (!await bycript.compare(password, user ? user.password : "")) {
        throw {
          msg: "Unauthorized",
        };
      }
      const payload: userPayload = {
        user: user,
        exp: getNumericDate(60 * 60),
      };
      const jwt = await create(HEADER, payload, KEY);
      ctx.response.body = {
        data: {
          token: jwt,
        },
      };
    } catch ({ msg }) {
      ctx.response.status = Status.Unauthorized;
      return ctx.response.body = {
        error: { msg },
      };
    }
  },
  index: async (ctx: Context) => {
    try {
      ctx.response.body = {
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
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { error: { msg: e.toString() } };
    }
  },
};
