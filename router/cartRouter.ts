import { Router } from "../deps.ts";
import controller from "../controller/CartController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
import { fieldsCheck } from "../middlewares/fieldsMiddleware.ts";

const cartRouter = new Router();

cartRouter
  .post("/", roleCheck(false), fieldsCheck(["product"]), controller.add)
  .delete("/:id", roleCheck(false), controller.del)
  .get("/", roleCheck(false), controller.index);
export { cartRouter };
