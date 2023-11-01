// import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Replie } from "../entities/replies";
import { AppDataSource } from "../data-source";
// import { createReplieSchema, updateReplieSchema } from "../utils/Replie";

export default new (class ReplieServices2 {
	private readonly replyRepository: Repository<Replie> =
		AppDataSource.getRepository(Replie);

	async find(reqQuery: any): Promise<any> {
		try {
			const threadId = parseInt(reqQuery.thread_id as string);
			// console.log(threadId);
			// console.log(typeof threadId);

			const replies = await this.replyRepository.find({
				relations: ["users"],
				where: {
					threads: {
						id: threadId,
					},
				},
				order: {
					id: "DESC",
				},
			});
			// console.log(replies);

			return replies;
		} catch (err) {
			throw new Error("Something wrong in server!");
		}
	}

	async create(reqBody: any, loginSession: any): Promise<any> {
		try {
			const reply = this.replyRepository.create({
				content: reqBody.content,
				users: {
					id: loginSession.user.id,
				},
				threads: {
					id: reqBody.thread_id,
				},
			});

			const response = await this.replyRepository.save(reply);

			return response;
		} catch (err) {
			throw new Error("Something wrong in server!");
		}
	}
})();
