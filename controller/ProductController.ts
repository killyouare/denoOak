import { products } from "../models/Products.ts";
import { rr, rs } from "../interfaces.ts";

import type { ProductSchema } from "../models/Products.ts";

export default {
  index: async ({ response }: rs) => {
    return response.body = {
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
  create: async ({ request, response }: rr) => {
    const body = await request.body();
    const { name, description, price }: ProductSchema = await body.value;
    await products.insertOne({ name, description, price });
    response.status = 201;
    response.body = { data: { msg: "OK" } };
  },
};
