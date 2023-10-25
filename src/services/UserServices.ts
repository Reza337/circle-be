import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/user";
import { createUserSchema, updateUserSchema } from "../utils/User";

export default new (class UserServices {
	private readonly UserRepository: Repository<User> =
		AppDataSource.getRepository(User);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const users = await this.UserRepository.find();

			return res.status(200).json({ status: "success", data: users });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting threads ${err.message}` });
		}
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const users = await this.UserRepository.findOne({
				where: { id },
			});

			if (!users) return res.status(404).json({ Error: "ID Not Found" });

			return res.status(200).json(users);
		} catch (err) {
			return res.status(500).json({ Error: "Error while getting threads" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = createUserSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang dimasukan tidak Valid" });

			// console.log(data);

			const obj = this.UserRepository.create({
				username: data.username,
				full_name: data.full_name,
				email: data.email,
				password: data.password,
				profile_picture: data.profile_picture,
				profile_description: data.profile_description,
			});

			const result = await this.UserRepository.save(obj);

			return res.status(201).json({ Thread: result });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting threads ${err.message}` });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const users = await this.UserRepository.findOne({
				where: { id },
			});

			if (!users) {
				return res.status(404).json({ Error: "Thread not found" });
			}

			const data = req.body;

			const { error } = updateUserSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang di Input tidak valid" });

			if (data.username) {
				users.username = data.username;
			}

			if (data.full_name) {
				users.full_name = data.full_name;
			}

			if (data.email) {
				users.email = data.email;
			}

			if (data.password) {
				users.password = data.password;
			}

			if (data.profile_picture) {
				users.profile_picture = data.profile_picture;
			}

			if (data.profile_description) {
				users.profile_description = data.profile_description;
			}

			const update = await this.UserRepository.save(users);
			return res.status(200).json(update);
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while updating thread: ${err.message}` });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const userDelete = await this.UserRepository.findOne({
				where: { id },
			});
			if (!userDelete) return res.status(404).json({ Error: "ID Not Found" });

			await this.UserRepository.delete({
				id: id,
			});
			return res.status(200).json({ data: userDelete });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while deleting threads ${err.message}` });
		}
	}
})();
