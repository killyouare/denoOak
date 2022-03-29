import { users } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { Context, Status } from "../deps.ts";
import { getUsername } from "../Helpers/getUser.ts";

export default {
  add: async (ctx: Context) => {
    try {
      const request = await ctx.request.body();
      const { product } = await request.value;
      if (!await products.findOne({ _id: { $oid: product } })) {
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
  del: async (ctx: Context) => {
    await console.log(ctx);
  },
};
