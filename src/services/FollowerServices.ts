import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Follow } from "../entities/following";
import { followerSchema } from "../utils/Follow";

export default new (class FollowerServices {
	private readonly FollowerRepository: Repository<Follow> =
		AppDataSource.getRepository(Follow);

	async findFollower(req: Request, res: Response): Promise<Response> {
		try {
			const follower = await this.FollowerRepository.find({
				relations: ["followerToUser"],
			});

			return res.status(200).json({
				status: "success",
				data: {
					follower: follower,
				},
			});
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting replies ${err.message}` });
		}
	}

	async follower(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = followerSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang dimasukan tidak valid" });

			const obj = this.FollowerRepository.create({
				followerToUser: data.followerToUser,
			});

			const result = await this.FollowerRepository.save(obj);
			return res.status(201).json({ Replie: result });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while creating Replie: ${err.message}` });
		}
	}

	async followerDelete(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const follower = await this.FollowerRepository.findOne({
				where: { id },
			});

			if (!follower) return res.status(404).json({ Error: "ID Not Found" });

			await this.FollowerRepository.delete({
				id: id,
			});
			return res.status(200).json({ data: follower });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while deleting ${err.message}` });
		}
	}
})();
