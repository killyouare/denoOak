import { Bson, Context, Status } from "../deps.ts";
import { users, UserSchema } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { orders } from "../models/Order.ts";
export default {
  create: async (ctx: Context) => {
    try {
      const request = ctx.request.body();
      const { user }: { user: UserSchema } = await request.value;

      const cart = user.cart;
      if (!cart.length) {
        throw {
          code: Status.BadRequest,
          message: "Cart is empty",
        };
      }

      const order: Map<Bson.ObjectId, Bson.Decimal128> = new Map();

      cart.forEach(async (el) => {
        const product = await products.findOne({ _id: el });
        if (product == undefined) ctx.throw(Status.BadRequest, "Bad cart");
        order.set(el, product.price);
      });
      await orders.insertOne({
        user: user._id,
        products: order,
      });
      ctx.response.status = Status.OK;
      return ctx.response.body = {
        data: { msg: "Created" },
      };
    } catch (e) {
      ctx.response.status = e.code;
      return ctx.response.body = { error: { msg: e.message } };
    }
  },
};
