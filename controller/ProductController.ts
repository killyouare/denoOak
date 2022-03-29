import { products } from "../models/Products.ts";
import { Context } from "../deps.ts";
import type { ProductSchema } from "../models/Products.ts";

export default {
  index: async (ctx: Context) => {
    return ctx.response.body = {
      data: {
        products: (await products.find().toArray()).map(
          (product: ProductSchema) => {
            return {
              id: product._id,
              name: product.name,
              description: product.description,
              price: product.price,
            };
          },
        ),
      },
    };
  },
  create: async (ctx: Context) => {
    const body = await ctx.request.body();
    const { name, description, price }: ProductSchema = await body.value;
    await products.insertOne({ name, description, price });
    ctx.response.status = 201;
    ctx.response.body = { data: { msg: "OK" } };
  },
};
