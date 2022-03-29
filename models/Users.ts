import { db } from "../db.ts";
import { Bson } from "../deps.ts";
import { userSeeder } from "../Seeders/UserSeeder.ts";

interface UserSchema {
  _id: Bson.ObjectId;
  username: string;
  password: string;
  is_admin: boolean;
  cart: Bson.ObjectId[];
  name?: string;
  lastname?: string;
}

const users = db.collection<UserSchema>("users");

userSeeder(users);

export { users };
export type { UserSchema };
