import { db } from "../db.ts";
import { Bson } from "../deps.ts";
interface UserSchema {
  _id?: Bson.ObjectId;
  name: string;
  lastname: string;
  password: string;
}

const users = db.collection<UserSchema>("users");

export { users };
export type { UserSchema };
