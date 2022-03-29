import { Application } from "./deps.ts";

import { HOST, PORT } from "./config.ts";
const app: Application = new Application();

import { router } from "./router.ts";
// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Routers
router(app);

console.log(`${HOST}:${PORT}`);

await app.listen(`${HOST}:${PORT}`);
