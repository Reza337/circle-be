import * as express from "express";
import UserControllers from "../controllers/UserControllers";
const userRouter = express.Router();

userRouter.get("/users", UserControllers.find);
userRouter.get("/user/:id", UserControllers.findOne);
userRouter.post("/user", UserControllers.create);
userRouter.patch("/user/:id", UserControllers.update);
userRouter.delete("/user/:id", UserControllers.delete);

export default userRouter;
