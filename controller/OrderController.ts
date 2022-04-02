import { Bson, Context, Status } from "../deps.ts";
import { users, UserSchema } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { orders } from "../models/Order.ts";
export default {
  create: async (ctx: Context) => {
    try {
      const user: UserSchema = ctx.app.state.user;
      const cart = user.cart;
      if (!cart.length) {
        throw {
          message: "Cart is empty",
        };
      }

      const order: Map<Bson.ObjectId, Bson.Decimal128> = new Map();

      cart.forEach(async (el) => {
        const product = await products.findOne({ _id: el });
        if (product == undefined) {
          throw {
            message: "Product not found",
          };
        }
        order.set(el, product.price);
      });
      await orders.insertOne({
        user: user._id,
        products: order,
      });
      await users.updateOne(user, {
        $set: { cart: [] },
      });
      ctx.response.status = Status.Created;
      return ctx.response.body = {
        data: { msg: "Created" },
      };
    } catch (e) {
      ctx.response.status = Status.BadRequest;
      return ctx.response.body = { error: { msg: e.message } };
    }
  },
  index: async (ctx: Context) => {
    try {
      const { _id, username }: UserSchema = ctx.app.state.user;
      return ctx.response.body = {
        data: {
          username: username,
          orders: (await orders.find({ user: _id }).toArray()).map((value) => {
            return {
              date: value._id.getTimestamp(),
              value: value.products,
            };
          }),
        },
      };
    } catch (e) {
      ctx.response.status = Status.BadRequest;
      return ctx.response.body = { error: { msg: e.message } };
    }
  },
};
