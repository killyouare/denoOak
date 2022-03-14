import { db } from "../db.ts";
import { Bson } from "../deps.ts";
interface UserSchema {
  _id?: Bson.ObjectId;
  username: string;
  name: string;
  lastname: string;
  password: string;
  is_admin: boolean;
}
const users = db.collection<UserSchema>("users");

export { users };
export type { UserSchema };
