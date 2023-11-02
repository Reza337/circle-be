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

			const followings = await this.UserRepository.query(
				"SELECT u.id, f.following_id, f.follower_id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=f.following_id"
			);
			const followers = await this.UserRepository.query(
				"SELECT u.id, f.following_id, f.follower_id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=f.follower_id "
			);

			const usersMap = users.map((user) => {
				const followingsPersonal = followings.filter((following) => {
					return following.follower_id === user.id;
				});
				const followersPersonal = followers.filter((follower) => {
					return follower.following_id === user.id;
				});

				return {
					...user,
					followings: followingsPersonal,
					followers: followersPersonal,
				};
			});

			return res.status(200).json({
				status: "success",
				message: "Find user success",
				data: usersMap,
			});
		} catch (err) {
			return res.status(500).json({ Error: `${err.message}` });
		}
	}

	async findOneByParams(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const users = await this.UserRepository.findOne({
				where: { id },
			});

			if (!users) return res.status(404).json({ Error: "ID Not Found" });

			const followings = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=f.following_id WHERE f.follower_id=$1",
				[id]
			);
			const followers = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=follower_id WHERE f.following_id=$1",
				[id]
			);

			return res.status(200).json({
				status: "success",
				message: "Find One User By Param success",
				data: {
					...users,
					password: null,
					followers,
					followings,
				},
			});
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while get user by param ${err.message}` });
		}
	}

	async findOneByAuth(req: Request, res: Response): Promise<Response> {
		try {
			const loginSession = res.locals.loginSession;
			const user: User | null = await this.UserRepository.findOne({
				where: {
					id: loginSession.user.id,
				},
			});
			if (!user)
				return res.status(400).json({
					Error: `User with ID ${res.locals.loginSession.user.id} not found`,
				});

			const followings = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture, u.bio FROM following as f INNER JOIN users as u ON u.id=f.following_id WHERE f.follower_id=$1",
				[loginSession.user.id]
			);
			const followers = await this.UserRepository.query(
				"SELECT u.id, u.username, u.full_name, u.profile_picture, u.bio FROM following as f INNER JOIN users as u ON u.id=follower_id WHERE f.following_id=$1",
				[loginSession.user.id]
			);

			return res.status(200).json({
				status: "success",
				message: "Find one user by jwt success",
				data: {
					...user,
					password: null,
					followers,
					followings,
				},
			});
		} catch (error) {
			console.log(error);

			return res.status(500).json({ Error: error.message });
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
				bio: data.bio,
			});

			const result = await this.UserRepository.save(obj);

			return res.status(201).json({ Thread: result });
		} catch (err) {
			return res.status(500).json({ Error: `${err.message}` });
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
				users.bio = data.bio;
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
