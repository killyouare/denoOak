import { Application } from "./deps.ts";
import { userRouter } from "./router/userRouter.ts";
import { productRouter } from "./router/productRouter.ts";
import { cartRouter } from "./router/cartRouter.ts";
import { HOST, PORT } from "./config.ts";

const app = new Application();

app.use(userRouter.prefix("/user").routes());
app.use(userRouter.allowedMethods());
app.use(productRouter.prefix("/product").routes());
app.use(productRouter.allowedMethods());
app.use(cartRouter.prefix("/cart").routes());
app.use(cartRouter.allowedMethods());

console.log(`${HOST}:${PORT}`);

await app.listen(`${HOST}:${PORT}`);

