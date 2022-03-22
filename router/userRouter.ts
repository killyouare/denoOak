import { Router } from "../deps.ts";
import controller from "../controller/UserController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
const userRouter = new Router();

userRouter
  .post("/register", controller.register)
  .get("/", roleCheck(true), controller.index)
  .post("/login", controller.login);
export { userRouter };
