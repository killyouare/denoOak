import { users } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { Context, ObjectId, Status } from "../deps.ts";
import { getUsername } from "../Helpers/getUser.ts";

export default {
  add: async (ctx: Context) => {
    try {
      const request = await ctx.request.body();
      const { product } = await request.value;
      const productId = new ObjectId(product);
      if (!await products.findOne({ _id: productId })) {
        return ctx.response.body = {
          error: { msg: "Product not found" },
        };
      }
      const { iss } = await getUsername(ctx);

      await users.updateOne({
        username: iss,
      }, {
        $push: {
          cart: product,
        },
      });
      ctx.response.status = Status.OK;
      ctx.response.body = {
        data: { msg: "Added" },
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
      const { iss } = await getUsername(ctx);
      const user = await users.findOne({ username: iss });
      const cart = user?.cart ?? [];
      ctx.response.status = Status.Created;
      return ctx.response.body = {
        data: {
          username: user?.username,
          cart,
        },
      };
    } catch (e) {
      ctx.response.status = Status.FailedDependency;
      return ctx.response.body = {
        error: {
          msg: e.toString(),
        },
      };
    }
  },
  del: async (ctx: any) => {
    try {
      const id = await ctx.params.id;
      const { iss } = await getUsername(ctx);
      const user = await users.findOne({ username: iss });
      const cart = user?.cart ?? [];

      if (!cart.length) {
        throw {
          code: Status.BadRequest,
          message: "Cart is empty",
        };
      }

      const index = cart.indexOf(id);

      if (index == -1) {
        throw {
          code: Status.BadRequest,
          message: "No specified product",
        };
      }

      cart.splice(index, 1);

      await users.updateOne(
        { username: iss },
        {
          $set: { cart },
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
