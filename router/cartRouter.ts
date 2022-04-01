import { Router } from "../deps.ts";
import controller from "../controller/CartController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
import { fieldsCheck } from "../middlewares/fieldsMiddleware.ts";
import { getUser } from "../middlewares/getUserMiddleware.ts";

const cartRouter = new Router();

cartRouter
  .post(
    "/",
    getUser,
    roleCheck(false),
    fieldsCheck(["product"]),
    controller.add,
  )
  .delete("/:id", getUser, roleCheck(false), controller.del)
  .get("/", getUser, roleCheck(false), controller.index);
export { cartRouter };
