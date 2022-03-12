import { users } from "../models/User.ts";
import type { UserSchema } from "../models/User.ts";
export default {
  getUser: async ({ response }: { response: any }) => {
    response.body = await users.find();
  },

  getDog: async ({
    params,
    response,
  }: {
    params: {
      name: string;
    };
    response: any;
  }) => {
    const user = await users.findOne({ name: params.name });
    if (user) {
      response.status = 200;
      response.body = user;
      return;
    }

    response.status = 400;
    response.body = { msg: `Cannot find user ${params.name}` };
  },
  addUser: async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    const body = await request.body();
    const { name, lastname, password }: UserSchema = await body.value;
    await users.insertOne({
      name,
      lastname,
      password,
    });
    response.body = { msg: "OK" };
    response.status = 200;
  },
  // updateDog: async ({
  //   params,
  //   request,
  //   response,
  // }: {
  //   params: {
  //     name: string;
  //   };
  //   request: any;
  //   response: any;
  // }) => {
  //   const temp = dogs.filter((existingDog) => existingDog.name === params.name);
  //   const body = await request.body();
  //   const { age }: { age: number } = await body.value;

  //   if (temp.length) {
  //     temp[0].age = age;
  //     response.status = 200;
  //     response.body = { msg: "OK" };
  //     return;
  //   }

  //   response.status = 400;
  //   response.body = { msg: `Cannot find dog ${params.name}` };
  // },

  // removeDog: ({
  //   params,
  //   response,
  // }: {
  //   params: {
  //     name: string;
  //   };
  //   response: any;
  // }) => {
  //   const lengthBefore = dogs.length;
  //   dogs = dogs.filter((dog) => dog.name !== params.name);

  //   if (dogs.length === lengthBefore) {
  //     response.status = 400;
  //     response.body = { msg: `Cannot find dog ${params.name}` };
  //     return;
  //   }

  //   response.body = { msg: "OK" };
  //   response.status = 200;
  // },
};
