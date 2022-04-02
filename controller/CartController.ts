import { users, UserSchema } from "../models/Users.ts";
import { products, ProductSchema } from "../models/Products.ts";
import { Context, ObjectId, Status } from "../deps.ts";

export default {
  add: async (ctx: Context) => {
    try {
      const request = await ctx.request.body();
      const { product } = await request.value;
      const user = ctx.app.state.user;
      const productId = new ObjectId(product);
      if (!await products.findOne({ _id: productId })) {
        return ctx.response.body = {
          error: { msg: "Product not found" },
        };
      }

      await users.updateOne(user, {
        $push: {
          cart: product,
        },
      });
      ctx.response.status = Status.Created;
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
  index: (ctx: Context) => {
    try {
      const user: UserSchema = ctx.app.state.user;
      const err: string[] = [];
      const data = {
        username: user.username,
        cart: user.cart.map(async (value) => {
          const product: ProductSchema | undefined = await products.findOne({
            _id: value,
          });
          if (product == undefined) {
            await users.updateOne(user, {
              $pull: {
                cart: value,
              },
            });
            err.push(`Product ${value} not exists`);
            return;
          }
          return {
            name: product.name,
            description: product.description,
            price: product.price,
          };
        }),
      };
      if (err.length) {
        throw {
          msg: err,
        };
      }
      return ctx.response.body = {
        data: data,
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
      const id = ctx.params.id;
      const user = ctx.app.state.user;

      const cart = user.cart;

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
        user,
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
