import { Collection } from "../deps.ts";
import type { OrderSchema } from "../models/Order.ts";
const orderSeeder = async (orders: Collection<OrderSchema>) => {
  await orders.deleteMany(
    {},
  );
};
export { orderSeeder };
