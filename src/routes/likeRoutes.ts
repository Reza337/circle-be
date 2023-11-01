import * as express from "express";
import LikeControllers from "../controllers/LikeControllers";
import { authenticate } from "../middlewares/Auth";
const likeRouter = express.Router();

// likeRouter.get("/likes", LikeControllers.find);
likeRouter.post("/thread/:threadId/like", authenticate, LikeControllers.like);
// likeRouter.delete("/like/:id", LikeControllers.unlike);

export default likeRouter;
