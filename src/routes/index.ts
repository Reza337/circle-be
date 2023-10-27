import * as express from "express";
import threadRouter from "./threadsRoutes";
import replieRouter from "./replieRoutes";
import userRouter from "./userRoutes";
import likeRouter from "./likeRoutes";
import AuthRoutes from "./AuthRoutes";
// import FollowRoutes from "./followRoutes";
import followRouter from "./followRoutes";
const router = express.Router();

router.use("/", threadRouter);
router.use("/", replieRouter);
router.use("/", userRouter);
router.use("/", likeRouter);
router.use("/", AuthRoutes);
// router.use("/", FollowRoutes);
router.use("/", followRouter);

export default router;
