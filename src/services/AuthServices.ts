import { Repository } from "typeorm";
import { Request, Response } from "express";
// import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
// import _ from "lodash";
// import { PostgreDataSource } from "../../database/data-source";
// import { User } from "../../database/entities/User";
// import handleError from "../utils/exception/handleError";
// import ConflictError from "../utils/exception/custom/ConflictError";
// import BadRequestError from "../utils/exception/custom/BadRequestError";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { loginSchema, registerSchema } from "../utils/authSchema";
// import Env from "../utils/variables/Env";

export default new (class AuthServices {
	private readonly AuthRepository: Repository<User> =
		AppDataSource.getRepository(User);

	async register(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error, value } = registerSchema.validate(data);

			if (error) {
				return res.status(500).json({ error: error.details[0].message });
			}

			const checkEmail = await this.AuthRepository.count({
				where: { email: value.email },
			});

			if (checkEmail > 0)
				return res.status(404).json({
					error: "Email is already taken",
				});

			const password = await bcrypt.hash(value.password, 10);

			const user = this.AuthRepository.create({
				full_name: value.full_name,
				email: value.email,
				password: password,
				username: value.username,
			});

			const createdUser = await this.AuthRepository.save(user);
			return res.status(200).json({
				message: "User created successfully",
				user: createdUser,
			});
		} catch (error) {
			return res.status(500).json({ Error: `${error.message}` });
		}
	}

	async login(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error, value } = loginSchema.validate(data);

			const isCheckEmail = await this.AuthRepository.findOne({
				where: {
					email: value.email,
				},
				select: ["id", "full_name", "email", "username", "password"],
			});

			if (!isCheckEmail)
				return res.status(404).json({ Error: "Email not found" });

			const isCheckPassword = await bcrypt.compare(
				value.password,
				isCheckEmail.password
			);
			// isCheckPassword = false => !isCheckPassword = true
			// isCheckPassword = true => !isCheckPassword = false

			if (!isCheckPassword)
				return res.status(400).json({ Error: "Incorrect password" });

			const user = this.AuthRepository.create({
				id: isCheckEmail.id,
				full_name: isCheckEmail.full_name,
				email: isCheckEmail.email,
				username: isCheckEmail.username,
			});

			const token = jwt.sign({ user }, "jwt_secret", {
				expiresIn: "1h",
			});

			return res.status(200).json({
				user,
				token,
			});
		} catch (err) {
			return res.status(500).json({ Error: "Error while logging in" });
		}
	}

	async check(req: Request, res: Response): Promise<Response> {
		try {
			const loginSession = res.locals.loginSession;

			const user = await this.AuthRepository.findOne({
				where: {
					id: loginSession.user.id,
				},
			});

			return res.status(200).json({
				message: "You are logged in",
				user,
			});
		} catch (err) {
			return res.status(501).json({ Error: `${err.message}` });
		}
	}
})();
