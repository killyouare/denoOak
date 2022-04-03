import { db } from "../db.ts";
import { Bson } from "../deps.ts";
import { orderSeeder } from "../Seeders/OrderSeeder.ts";
interface orderProducts {
  name: string;
  price: Bson.Decimal128;
}
interface OrderSchema {
  _id: Bson.ObjectId;
  user: Bson.ObjectId;
  products: orderProducts[];
}

const orders = db.collection<OrderSchema>("orders");
orderSeeder(orders);
export { orders };
export type { orderProducts, OrderSchema };
