import { Router } from "../deps.ts";
import controller from "../controller/CartController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
const cartRouter = new Router();

cartRouter
  .post("/", roleCheck(false), controller.add)
  .get("/", roleCheck(false), controller.index);
export { cartRouter };
