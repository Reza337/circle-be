import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
// import UnauthorizedError from "../utils/exception/custom/UnauthorizedError";
// // import Env from "../utils/variables/Env";
// import handleError from "../utils/exception/handleError";

export function authenticate(
	req: Request,
	res: Response,
	next: NextFunction
): Response {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "No token provided" });
	}

	const token = authHeader.split(" ")[1];

	try {
		// dotenv.config();
		const loginSession = jwt.verify(token, "jwt_secret");
		res.locals.loginSession = loginSession;
		next();
	} catch (error) {
		return res.status(401).json({
			error: "unauthorized",
		});
	}
}
