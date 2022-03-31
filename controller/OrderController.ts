import { Bson, Context, Status } from "../deps.ts";
import { users } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { orders } from "../models/Order.ts";
import { getUsername } from "../Helpers/getUser.ts";
export default {
  create: async (ctx: Context) => {
    try {
      const { iss } = await getUsername(ctx);
      const user = await users.findOne({ username: iss });
      const cart = user?.cart ?? [];

      if (!cart.length) {
        throw {
          code: Status.BadRequest,
          message: "Cart is empty",
        };
      }

      const order: Map<Bson.ObjectId, Bson.Decimal128 | number> = new Map();

      cart.forEach(async (el) => {
        const product = await products.findOne({ _id: el });
        order.set(el, product?.price ?? 15);
      });
      await orders.insertOne({
        user: user?._id,
        products: order,
      });
    } catch (e) {
      ctx.response.status = e.code;
      return ctx.response.body = { error: { msg: e.message } };
    }
  },
};
