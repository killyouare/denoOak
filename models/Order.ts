import { db } from "../db.ts";
import { Bson } from "../deps.ts";

interface OrderSchema {
  _id: Bson.ObjectId;
  user: Bson.ObjectId;
  products: Map<Bson.ObjectId, Bson.Decimal128>;
}

const orders = db.collection<OrderSchema>("users");

export { orders };
export type { OrderSchema };
