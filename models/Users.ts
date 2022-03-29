import { db } from "../db.ts";
import { Bson, bycript } from "../deps.ts";
import { userSeeder } from "../Seeders/UserSeeder.ts";
interface UserSchema {
  _id?: Bson.ObjectId;
  username: string;
  name: string;
  lastname: string;
  password: string;
  is_admin: boolean;
  cart: Bson.ObjectId[];
}

const users = db.collection<UserSchema>("users");

userSeeder(users);

export { users };
export type { UserSchema };
