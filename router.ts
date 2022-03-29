import { Application } from "./deps.ts"
import { userRouter } from "./router/userRouter.ts";
import { productRouter } from "./router/productRouter.ts";
import { cartRouter } from "./router/cartRouter.ts";
const router = (app: Application) => {
  app.use(userRouter.prefix("/user").routes());
  app.use(userRouter.allowedMethods());
  app.use(productRouter.prefix("/product").routes());
  app.use(productRouter.allowedMethods());
  app.use(cartRouter.prefix("/cart").routes());
  app.use(cartRouter.allowedMethods());
  app.use(function (ctx) {
    return ctx.response.body = {
      error: {
      message: "Page not found",
    }}
  })
}
export {router}