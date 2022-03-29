import { Router } from "../deps.ts";
import controller from "../controller/ProductController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
import { fieldsCheck } from "../middlewares/fieldsMiddleware.ts";

const productRouter = new Router();

productRouter
  .get("/", controller.index)
  .post(
    "/",
    roleCheck(true),
    fieldsCheck(["name", "price", "description"]),
    controller.create,
  );
export { productRouter };
