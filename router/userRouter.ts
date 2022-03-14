import { Router } from "../deps.ts";
import controller from "../controller/UserController.ts";
import test from "../controller/test.ts";
import { authCheck } from "../middlewares/authMiddleware.ts";
const router = new Router();

router
  .post("/register", controller.register)
  .get("/", authCheck, controller.index)
  .post("/login", controller.login);
export { router };
