import { db } from "../db.ts";
import { Bson } from "../deps.ts";
interface UserSchema {
  _id?: ObjectId;
  username: string;
  name: string;
  lastname: string;
  password: string;
  is_admin: boolean;
  cart: ObjectId[];
}

const users = db.collection<UserSchema>("users");

export { users };
export type { UserSchema };
