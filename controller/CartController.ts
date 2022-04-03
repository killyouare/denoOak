import { users, UserSchema } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { Context, ObjectId, Status } from "../deps.ts";

export default {
  add: async (ctx: Context) => {
    try {
      const request = await ctx.request.body();
      const { product } = await request.value;
      const user = ctx.app.state.user;
      const productItem = await products.findOne({
        _id: new ObjectId(product),
      });
      if (productItem == undefined) {
        return ctx.response.body = {
          error: { msg: "Product not found" },
        };
      }

      await users.updateOne({ _id: user._id }, {
        $push: {
          cart: { $each: [productItem._id] },
        },
      });
      ctx.response.status = Status.Created;
      ctx.response.body = {
        data: { msg: "Created" },
      };
    } catch (e) {
      ctx.response.body = {
        error: {
          msg: e.toString(),
        },
      };
    }
  },
  index: async (ctx: Context) => {
    try {
      const user: UserSchema = ctx.app.state.user;
      const _products = (await products.find({
        _id: { $in: user.cart },
      }).toArray());
      return ctx.response.body = {
        data: {
          username: user.username,
          cart: user.cart.map((product) => {
            return _products.find((productItem) => {
              return productItem._id.toString() == product.toString();
            });
          }),
        },
      };
    } catch (e) {
      ctx.response.status = Status.UnprocessableEntity;
      return ctx.response.body = {
        error: {
          msg: e.msg,
        },
      };
    }
  },
  del: async (ctx: any) => {
    try {
      const id: string = ctx.params.id;
      const user: UserSchema = ctx.app.state.user;
      const cartStr = user.cart.map((product) => product.toString());

      if (!user.cart.length) {
        throw {
          code: Status.BadRequest,
          message: "Cart is empty",
        };
      }

      const index = cartStr.indexOf(id);
      if (index == -1) {
        throw {
          code: Status.BadRequest,
          message: "No specified product",
        };
      }
      user.cart.splice(index, 1);
      await users
        .updateOne(
          { _id: user._id },
          {
            $set: {
              cart: user.cart,
            },
          },
        );

      return ctx.response.body = {
        data: { msg: "Item removed" },
      };
    } catch (e) {
      ctx.response.status = e.code;
      return ctx.response.body = { error: { msg: e.message } };
    }
  },
};
