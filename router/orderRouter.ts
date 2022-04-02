import { Router } from "../deps.ts";
import controller from "../controller/OrderController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
import { getUser } from "../middlewares/getUserMiddleware.ts";

const orderRouter = new Router();

orderRouter
  .get("/", getUser, roleCheck(false), controller.index)
  .post("/", getUser, roleCheck(false), controller.create);
export { orderRouter };
