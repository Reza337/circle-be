import * as express from "express";
import LikeControllers from "../controllers/LikeControllers";
const likeRouter = express.Router();

likeRouter.get("/likes", LikeControllers.find);
likeRouter.post("/like", LikeControllers.like);
likeRouter.delete("/like/:id", LikeControllers.unlike);

export default likeRouter;
