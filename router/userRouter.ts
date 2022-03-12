import { Router } from "../deps.ts";
import controller from "../controller/UserController.ts";
const router = new Router();

router
  .get("/", controller.getUser)
  .get("/:name", controller.getDog)
  .post("/", controller.addUser);
// .put("/:name", controller.updateDog)
// .delete("/:name", controller.removeDog);
export { router };
