import { users } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { DBRef, Context } from "../deps.ts";
import { rr, rs } from "../interfaces.ts";
import { getUsername } from "../Helpers/getUser.ts";
import type { ProductSchema } from "../models/Products.ts";

export default {
  add: async (ctx: Context) => {
    try {
      const request = await ctx.request.body();
      const { product } = await request.value;
      const { iss } = await getUsername(ctx);
      const user = await users.findOne({ username: iss });
      let cart = user?.cart ??  [];
      cart.push(product)
      await users.updateOne({
        username: iss
      }, {
        cart,
      })
      ctx.response.body = {
        data: { msg: "Added"}
      }
    } catch (e) {
      ctx.response.body = { error: { msg: e.toString() } };
    }
  },
  index: async (ctx: Context) => {
    const { iss } = await getUsername(ctx);
    const user = await users.findOne({ username: iss });
    const cart = user?.cart ?? [];
    return ctx.response.body = {
      data: {
        cart
      }
    };
  }
};
