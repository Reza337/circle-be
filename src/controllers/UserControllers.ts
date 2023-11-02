import { Request, Response } from "express";
import UserServices from "../services/UserServices";

export default new (class UserControllers {
	find(req: Request, res: Response) {
		UserServices.find(req, res);
	}

	findOneByParams(req: Request, res: Response) {
		UserServices.findOneByParams(req, res);
	}

	findOneByAuth(req: Request, res: Response) {
		UserServices.findOneByAuth(req, res);
	}

	create(req: Request, res: Response) {
		UserServices.create(req, res);
	}

	update(req: Request, res: Response) {
		UserServices.update(req, res);
	}

	delete(req: Request, res: Response) {
		UserServices.delete(req, res);
	}
})();
