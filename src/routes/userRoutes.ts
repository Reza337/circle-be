import * as express from "express";
import UserControllers from "../controllers/UserControllers";
import { authenticate } from "../middlewares/Auth";
const userRouter = express.Router();

userRouter.get("/users", authenticate, UserControllers.find);
userRouter.get("/user/:id", UserControllers.findOne);
userRouter.post("/user", UserControllers.create);
userRouter.patch("/user/:id", UserControllers.update);
userRouter.delete("/user/:id", UserControllers.delete);

export default userRouter;
