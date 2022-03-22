import { db } from "../db.ts";
import { Bson } from "../deps.ts";
interface ProductSchema {
  _id?: ObjectId;
  name: string;
  description: string;
  price: Decimal128;
}

const products = db.collection<ProductSchema>("products");

export { products };
export type { ProductSchema };
