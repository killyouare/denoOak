import { Router } from "../deps.ts";
import controller from "../controller/ProductController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
const productRouter = new Router();

productRouter
  .get("/", controller.index)
  .post("/", roleCheck(true), controller.create);
export { productRouter };
