import * as express from "express";
import FollowingControllers from "../controllers/FollowingControllers";
import FollowerController from "../controllers/FollowerController";
const followRouter = express.Router();

followRouter.get("/followings", FollowingControllers.findFollowing);
followRouter.post("/following", FollowingControllers.following);
followRouter.delete("/following/:id", FollowingControllers.followingDelete);

followRouter.get("/followers", FollowerController.findFollower);
followRouter.post("/follower", FollowerController.follower);
followRouter.delete("/follower/:id", FollowerController.followerDelete);

export default followRouter;

// import { Router } from "express";
// import { jwtAuth } from "../middlewares/jwtAuth";
// import FollowControllers from "../controllers/FollowControllers";

// const FollowRoutes = Router();

// // POST | /follow/:userId
// FollowRoutes.post("/follow/:userId", jwtAuth, FollowControllers.follow);

// export default FollowRoutes;
