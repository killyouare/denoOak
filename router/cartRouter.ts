import { Router } from "../deps.ts";
import controller from "../controller/CartController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
const cartRouter = new Router();

cartRouter
  .get("/:productId", roleCheck(false), controller.add)
  .get("/cart", roleCheck(true), controller.index)
  .delete("/cart", roleCheck(true), controller.index);
export { cartRouter };
