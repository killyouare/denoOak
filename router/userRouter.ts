import { Router } from "../deps.ts";
import controller from "../controller/UserController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
const router = new Router();

router
  .post("/register", controller.register)
  .get("/", roleCheck(true), controller.index)
  .post("/login", controller.login);
export { router };
