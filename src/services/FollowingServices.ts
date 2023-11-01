// import { Request, Response } from "express";
// import { Repository } from "typeorm";
// import { AppDataSource } from "../data-source";
// import { Follow } from "../entities/following";
// import { followingSchema } from "../utils/Follow";

// export default new (class FollowingServices {
// 	private readonly FollowingRepository: Repository<Follow> =
// 		AppDataSource.getRepository(Follow);

// 	async findFollowing(req: Request, res: Response): Promise<Response> {
// 		try {
// 			const following = await this.FollowingRepository.find({
// 				relations: ["followingToUser"],
// 			});

// 			return res.status(200).json({
// 				status: "success",
// 				data: {
// 					following: following,
// 				},
// 			});
// 		} catch (err) {
// 			return res
// 				.status(500)
// 				.json({ Error: `Error while getting replies ${err.message}` });
// 		}
// 	}

// 	async following(req: Request, res: Response): Promise<Response> {
// 		try {
// 			const data = req.body;

// 			const { error } = followingSchema.validate(data);
// 			if (error)
// 				return res
// 					.status(401)
// 					.json({ Error: "Data yang dimasukan tidak valid" });

// 			const obj = this.FollowingRepository.create({
// 				usersFollowing: data.usersFollowing,
// 			});

// 			const result = await this.FollowingRepository.save(obj);
// 			return res.status(201).json({ Replie: result });
// 		} catch (err) {
// 			return res
// 				.status(500)
// 				.json({ Error: `Error while creating Replie: ${err.message}` });
// 		}
// 	}

// 	async followingDelete(req: Request, res: Response): Promise<Response> {
// 		try {
// 			const id = Number(req.params.id);
// 			const following = await this.FollowingRepository.findOne({
// 				where: { id },
// 			});

// 			if (!following) return res.status(404).json({ Error: "ID Not Found" });

// 			await this.FollowingRepository.delete({
// 				id: id,
// 			});
// 			return res.status(200).json({ data: following });
// 		} catch (err) {
// 			return res
// 				.status(500)
// 				.json({ Error: `Error while deleting ${err.message}` });
// 		}
// 	}
// })();
