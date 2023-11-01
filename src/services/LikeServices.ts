import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Like } from "../entities/like";
import { likesSchema } from "../utils/Like";
import { Thread } from "../entities/thread";
import { User } from "../entities/user";

export default new (class LikeServices {
	private readonly LikeRepository: Repository<Like> =
		AppDataSource.getRepository(Like);
	private readonly ThreadRepository: Repository<Thread> =
		AppDataSource.getRepository(Thread);
	private readonly UserRepository: Repository<User> =
		AppDataSource.getRepository(User);

	async like(req: Request, res: Response): Promise<Response> {
		try {
			const threadId = Number(req.params.threadId);
			if (!threadId)
				return res
					.status(400)
					.json({ Error: `threadId is not valid ${threadId}` });

			const userSelected: User | null = await this.UserRepository.findOne({
				where: {
					id: res.locals.loginSession.user.id,
				},
			});
			if (!userSelected)
				return res.status(400).json({
					Error: `user with ID ${res.locals.loginSession.id} not found`,
				});

			const threadSelected: Thread | null = await this.ThreadRepository.findOne(
				{
					where: {
						id: threadId,
					},
				}
			);
			if (!threadSelected)
				return res
					.status(400)
					.json({ Error: `Thread with ID ${threadId} not found` });

			// CHECK LIKE IF EXIST
			const likeSelected: Like | null = await this.LikeRepository.findOne({
				where: {
					users: {
						id: userSelected.id,
					},
					threads: {
						id: threadSelected.id,
					},
				},
			});

			// UNLIKE IF ALREADY LIKE EXIST
			if (likeSelected) {
				await this.LikeRepository.delete(likeSelected.id);

				return res.status(200).json({
					status: "success",
					message: "undo Like Thread Success",
				});
			}

			// IF NOT ALREADY LIKE EXIST
			const like = new Like();
			like.users = userSelected;
			like.threads = threadSelected;
			await this.LikeRepository.save(like);

			return res.status(200).json({
				status: "success",
				message: "Like Thread Success",
			});
		} catch (error) {
			return res.status(500).json({
				Error: `Error while Like a Thread with error ${error.message}`,
			});
		}
	}

	// async find(req: Request, res: Response): Promise<Response> {
	// 	try {
	// 		const likes = await this.LikeRepository.find({
	// 			relations: ["users", "threads"],
	// 		});

	// 		return res.status(200).json({
	// 			status: "success",
	// 			data: {
	// 				likes: likes,
	// 			},
	// 		});
	// 	} catch (err) {
	// 		return res
	// 			.status(500)
	// 			.json({ Error: `Error while getting replies ${err.message}` });
	// 	}
	// }

	// async like(req: Request, res: Response): Promise<Response> {
	// 	try {
	// 		const data = req.body;

	// 		const { error } = likesSchema.validate(data);
	// 		if (error)
	// 			return res
	// 				.status(401)
	// 				.json({ Error: "Data yang dimasukan tidak valid" });

	// 		const obj = this.LikeRepository.create({
	// 			users: data.users,
	// 			threads: data.threads,
	// 		});

	// 		const result = await this.LikeRepository.save(obj);
	// 		return res.status(201).json({ Replie: result });
	// 	} catch (err) {
	// 		return res
	// 			.status(500)
	// 			.json({ Error: `Error while creating Replie: ${err.message}` });
	// 	}
	// }

	// async unlike(req: Request, res: Response): Promise<Response> {
	// 	try {
	// 		const id = Number(req.params.id);
	// 		const unlikes = await this.LikeRepository.findOne({
	// 			where: { id },
	// 		});

	// 		if (!unlikes) return res.status(404).json({ Error: "ID Not Found" });

	// 		await this.LikeRepository.delete({
	// 			id: id,
	// 		});
	// 		return res.status(200).json({ data: unlikes });
	// 	} catch (err) {
	// 		return res
	// 			.status(500)
	// 			.json({ Error: `Error while deleting ${err.message}` });
	// 	}
	// }
})();
