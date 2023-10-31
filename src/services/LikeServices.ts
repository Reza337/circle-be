import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Like } from "../entities/like";
import { likesSchema } from "../utils/Like";

export default new (class LikeServices {
	private readonly LikeRepository: Repository<Like> =
		AppDataSource.getRepository(Like);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const likes = await this.LikeRepository.find({
				relations: ["users", "threads"],
			});

			return res.status(200).json({
				status: "success",
				data: {
					likes: likes,
				},
			});
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting replies ${err.message}` });
		}
	}

	async like(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = likesSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang dimasukan tidak valid" });

			const obj = this.LikeRepository.create({
				users: data.users,
				threads: data.threads,
			});

			const result = await this.LikeRepository.save(obj);
			return res.status(201).json({ Replie: result });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while creating Replie: ${err.message}` });
		}
	}

	async unlike(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const unlikes = await this.LikeRepository.findOne({
				where: { id },
			});

			if (!unlikes) return res.status(404).json({ Error: "ID Not Found" });

			await this.LikeRepository.delete({
				id: id,
			});
			return res.status(200).json({ data: unlikes });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while deleting ${err.message}` });
		}
	}
})();
