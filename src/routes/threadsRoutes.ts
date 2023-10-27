import * as express from "express";
import ThreadControllers from "../controllers/ThreadControllers";
// import { jwtAuth } from "../middlewares/Auth";
import { authenticate } from "../middlewares/Auth";
const threadRouter = express.Router();

threadRouter.get("/threads", authenticate, ThreadControllers.find);
threadRouter.get("/thread/:id", ThreadControllers.findOne);
threadRouter.post("/thread", ThreadControllers.create);
threadRouter.patch("/thread/:id", ThreadControllers.update);
threadRouter.delete("/thread/:id", ThreadControllers.delete);

export default threadRouter;
