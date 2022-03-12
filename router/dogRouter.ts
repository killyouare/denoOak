import { Router } from "../deps.ts";
import controller from "../controller/DogController.ts";
const router = new Router();

router
  .get("/", controller.getDogs)
  .get("/:name", controller.getDog)
  .post("/", controller.addDog)
  .put("/:name", controller.updateDog)
  .delete("/:name", controller.removeDog);
export { router };
