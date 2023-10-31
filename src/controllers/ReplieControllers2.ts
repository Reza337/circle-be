import { Request, Response } from "express";
import ReplieServices2 from "../services/ReplieServices2";
// import ReplyServices from "../services/ReplyServices";

export default new (class ReplyControllers {
	async find(req: Request, res: Response) {
		try {
			const response = await ReplieServices2.find(req.query);
			return res.status(200).json(response);
		} catch (err) {
			return res
				.status(500)
				.json({ error: "Something went wrong on the server!" });
		}
	}

	async create(req: Request, res: Response) {
		try {
			const loginSession = res.locals.loginSession;

			const response = await ReplieServices2.create(req.body, loginSession);
			return res.status(200).json(response);
		} catch (err) {
			return res
				.status(500)
				.json({ error: "Something went wrong on the server!" });
		}
	}
})();
