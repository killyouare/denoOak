import { Router } from "../deps.ts";
import controller from "../controller/ProductController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
import { fieldsCheck } from "../middlewares/fieldsMiddleware.ts";
import { getUser } from "../middlewares/getUserMiddleware.ts";

const productRouter = new Router();

productRouter
  .get("/", controller.index)
  .post(
    "/",
    getUser,
    roleCheck(true),
    fieldsCheck(["name", "price", "description"]),
    controller.create,
  );
export { productRouter };
