import * as express from "express";
// import ReplieControllers from "../controllers/ReplieControllers";
import { authenticate } from "../middlewares/Auth";
import ReplieControllers2 from "../controllers/ReplieControllers2";
const replieRouter = express.Router();

// replieRouter.get("/replies", ReplieControllers.find);
// replieRouter.get("/reply/:id", authenticate, ReplieControllers.findOne);
// replieRouter.post("/reply", authenticate, ReplieControllers.create);
// replieRouter.patch("/reply/:id", ReplieControllers.update);
// replieRouter.delete("/reply/:id", ReplieControllers.delete);

replieRouter.get("/reply", authenticate, ReplieControllers2.find);
replieRouter.post("/reply", authenticate, ReplieControllers2.create);
export default replieRouter;
