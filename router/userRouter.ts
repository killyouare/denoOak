import { Router } from "../deps.ts";
import controller from "../controller/UserController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
import { fieldsCheck } from "../middlewares/fieldsMiddleware.ts";
const userRouter = new Router();

userRouter
  .post("/register", fieldsCheck(["username", "password"]), controller.register)
  .get("/", roleCheck(true), controller.index)
  .post("/login", fieldsCheck(["username", "password"]), controller.login);
export { userRouter };
