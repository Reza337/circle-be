import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
// import runValidation from "../utils/runValidation";
// import { loginSchema, registerSchema } from "../utils/authSchema";
// import runValidation from "../utils/validator/runValidation";
// import {
//   registerSchema,
//   loginSchema,
// } from "../utils/validator/schema/authSchema";

export default new (class AuthControllers {
	register(req: Request, res: Response) {
		AuthServices.register(req, res);
	}

	login(req: Request, res: Response) {
		AuthServices.login(req, res);
	}

	check(req: Request, res: Response) {
		AuthServices.check(req, res);
	}
})();
