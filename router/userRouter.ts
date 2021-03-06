import { Router } from "../deps.ts";
import controller from "../controller/UserController.ts";
import { roleCheck } from "../middlewares/roleMiddleware.ts";
import { fieldsCheck } from "../middlewares/fieldsMiddleware.ts";
import { getUser } from "../middlewares/getUserMiddleware.ts";
const userRouter = new Router();

userRouter
  .post("/register", fieldsCheck(["username", "password"]), controller.register)
  .get("/", getUser, roleCheck(true), controller.index)
  .post("/login", fieldsCheck(["username", "password"]), controller.login)
  .get("/logout", getUser, controller.logout);
export { userRouter };
