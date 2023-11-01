import { Request, Response } from "express";
import LikeServices from "../services/LikeServices";

export default new (class LikeControllers {
	// find(req: Request, res: Response) {
	// 	LikeServices.find(req, res);
	// }

	like(req: Request, res: Response) {
		LikeServices.like(req, res);
	}

	// unlike(req: Request, res: Response) {
	// 	LikeServices.unlike(req, res);
	// }
})();
