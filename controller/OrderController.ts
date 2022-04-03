import { Context, Status } from "../deps.ts";
import { users, UserSchema } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { orderProducts, orders } from "../models/Order.ts";
export default {
  create: async (ctx: Context) => {
    try {
      const user: UserSchema = ctx.app.state.user;
      const cart = user.cart;
      const err: string[] = [];
      if (!cart.length) {
        throw {
          message: "Cart is empty",
        };
      }
      const _products = (await products.find({
        _id: { $in: user.cart },
      }).toArray());

      const order: orderProducts[] = [];
      user.cart.forEach(async (value) => {
        const product = _products.find((product) =>
          product._id.toString() == value.toString()
        );
        if (product === undefined) {
          await users.updateOne({ _id: user._id }, {
            $pull: { cart: value },
          });
          err.push(`product ${value} not found`);
          return;
        }
        order.push({ name: product.name, price: product.price });
      });

      if (err.length) {
        throw {
          message: err,
        };
      }

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
          orders: (await orders.find({ user: _id }).toArray()).map(
            (value) => {
              return {
                date: value._id.getTimestamp(),
                product: value.products,
              };
            },
          ),
        },
      };
    } catch (e) {
      ctx.response.status = Status.BadRequest;
      return ctx.response.body = { error: { msg: e.message } };
    }
  },
};
