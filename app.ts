import { Application } from "./deps.ts";

import { HOST, PORT } from "./config.ts";
const app: Application = new Application();

import { router } from "./router.ts"
router(app);
console.log(`${HOST}:${PORT}`);

await app.listen(`${HOST}:${PORT}`);

