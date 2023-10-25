import { Request, Response } from "express";
import ReplieServices from "../services/ReplieServices";

export default new (class ReplieControllers {
	find(req: Request, res: Response) {
		ReplieServices.find(req, res);
	}

	findOne(req: Request, res: Response) {
		ReplieServices.findOne(req, res);
	}

	create(req: Request, res: Response) {
		ReplieServices.create(req, res);
	}

	update(req: Request, res: Response) {
		ReplieServices.update(req, res);
	}

	delete(req: Request, res: Response) {
		ReplieServices.delete(req, res);
	}
})();
