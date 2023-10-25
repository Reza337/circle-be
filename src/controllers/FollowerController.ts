import { Request, Response } from "express";
import FollowerServices from "../services/FollowerServices";

export default new (class FollowerControllers {
	findFollower(req: Request, res: Response) {
		FollowerServices.findFollower(req, res);
	}

	follower(req: Request, res: Response) {
		FollowerServices.follower(req, res);
	}

	followerDelete(req: Request, res: Response) {
		FollowerServices.followerDelete(req, res);
	}
})();
