import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
// import { Follow } from "../entities/following";
// import { followingSchema } from "../utils/Follow";
import { User } from "../entities/user";
// import { promises } from "dns";

export default new (class FollowingServices {
	// private readonly FollowRepository: Repository<Follow> =
	// 	AppDataSource.getRepository(Follow);
	private readonly UserRepository: Repository<User> =
		AppDataSource.getRepository(User);

	async follow(req: Request, res: Response): Promise<Response> {
		try {
			const userId = Number(req.params.userId);
			const user = res.locals.loginSession;


			if (!userId) return res.status(400).json({ Error: `userId not valid` });

			const followingUser: User | null = await this.UserRepository.findOne({
				where: {
					id: userId,
				},
			});
			if (!followingUser)
				return res
					.status(400)
					.json({ Error: `user with ID ${userId} not found` });

			const followerUser: User | null = await this.UserRepository.findOne({
				where: {
					id: user.user.id,
				},
			});
			if (!followerUser)
				return res.status(400).json({
					Error: `user with ID ${res.locals.loginSession.user.id} not found`,
				});

			if (followerUser.id === followingUser.id)
				return res.status(400).json({ Error: `You can't follow Yourself` });

			// CHECK IF ALREADY FOLLOW
			const checkFollow = await this.UserRepository.query(
				"SELECT * FROM following WHERE following_id=$1 AND follower_id=$2",
				[followingUser.id, followerUser.id]
			);

			// IF ALREADY FOLLOW
			if (checkFollow.length) {
				await this.UserRepository.query(
					"DELETE FROM following WHERE following_id=$1 AND follower_id=$2",
					[followingUser.id, followerUser.id]
				);

				return res.status(200).json({
					status: "success",
					message: "Undo Follow User Success",
				});
			}

			// IF NOT YET FOLLOW
			await this.UserRepository.query(
				"INSERT INTO following(following_id, follower_id) VALUES($1, $2)",
				[followingUser.id, followerUser.id]
			);

			return res.status(200).json({
				status: "success",
				message: "Follow User Success",
			});
		} catch (error) {}
	}
})();
