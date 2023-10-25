import * as express from "express";
import ReplieControllers from "../controllers/ReplieControllers";
const replieRouter = express.Router();

replieRouter.get("/replies", ReplieControllers.find);
replieRouter.get("/replie/:id", ReplieControllers.findOne);
replieRouter.post("/replie", ReplieControllers.create);
replieRouter.patch("/replie/:id", ReplieControllers.update);
replieRouter.delete("/replie/:id", ReplieControllers.delete);

export default replieRouter;
