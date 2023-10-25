import * as express from "express";
import ThreadControllers from "../controllers/ThreadControllers";
const threadRouter = express.Router();

threadRouter.get("/threads", ThreadControllers.find);
threadRouter.get("/thread/:id", ThreadControllers.findOne);
threadRouter.post("/thread", ThreadControllers.create);
threadRouter.patch("/thread/:id", ThreadControllers.update);
threadRouter.delete("/thread/:id", ThreadControllers.delete);

export default threadRouter;
