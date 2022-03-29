import { bycript, Collection } from "../deps.ts";
import type {UserSchema} from "../models/Users.ts"
const userSeeder = async (users: Collection<UserSchema>) => {
  await users.deleteMany(
    {}
  );
  await users.insertMany([{
    username: "admin",
    password: await bycript.hash("admin"),
    name: "admin",
    lastname: "admin",
    is_admin: true,
    cart: [],
  }, {
    username: "user",
    password: await bycript.hash("user"),
    name: "user",
    lastname: "user",
    is_admin: false,
    cart: [],
  }])
}
export{
  userSeeder
}