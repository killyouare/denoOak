import { users } from "../models/Users.ts";
import { products } from "../models/Products.ts";
import { DBRef, Context } from "../deps.ts";
import { rr, rs } from "../interfaces.ts";

import type { UserSchema} from "../models/Users.ts";
import type { ProductSchema } from "../models/Products.ts";

export default {
  index: async (ctx: Context) => {
    console.log(ctx);
  },
};
