import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

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
		const loginSession = jwt.verify(token, process.env.SECRET_KEY);
		res.locals.loginSession = loginSession;
		next();
	} catch (error) {
		return res.status(401).json({
			error: "unauthorized",
		});
	}
}
