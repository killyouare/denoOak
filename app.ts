import { Application } from "./deps.ts";
import { router } from "./router/userRouter.ts";
import { HOST, PORT } from "./config.ts";

const app = new Application();

app.use(router.prefix("/users/").routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
