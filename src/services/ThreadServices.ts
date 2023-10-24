import { Repository } from "typeorm";
import { Thread } from "../entities/thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createThreadSchema } from "../utils/Thread";

export default new (class ThreadServices {
	private readonly ThreadRepository: Repository<Thread> =
		AppDataSource.getRepository(Thread);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const threads = await this.ThreadRepository.find({
				relations: ["usersId"],
			});

			let newResponse = [];
			threads.forEach((data) => {
				newResponse.push({
					...data,
					likes_count: Math.floor(Math.random() * 10),
					replies_count: Math.floor(Math.random() * 10),
				});
			});

			return res.status(200).json(threads);
		} catch (err) {
			return res.status(500).json({ Error: "Error while getting threads" });
		}
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const findId = await this.ThreadRepository.findOne({
				where: { id },
			});

			if (!findId) return res.status(404).json({ Error: "ID Not Found" });

			return res.status(200).json(findId);
		} catch (err) {
			return res.status(500).json({ Error: "Error while getting threads" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = createThreadSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang dimasukan tidak Valid" });

			// console.log(data);

			const obj = this.ThreadRepository.create({
				content: data.content,
				image: data.image,
				usersId: data.usersId,
			});

			const result = await this.ThreadRepository.save(obj);

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
			const thread = await this.ThreadRepository.findOne({
				where: { id },
			});

			if (!thread) return res.status(404).json({ Error: "ID Not Found" });

			const data = req.body;
			const { error } = createThreadSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang dimasukan tidak Valid" });
			if (data.conten != "") thread.content = data.content;
			if (data.conten != "") thread.image = data.image;

			const update = await this.ThreadRepository.save(thread);
			return res.status(200).json(update);
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting threads ${err.message}` });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const threadDelete = await this.ThreadRepository.findOne({
				where: { id },
			});
			if (!threadDelete) return res.status(404).json({ Error: "ID Not Found" });

			const deleteThread = await this.ThreadRepository.delete({
				id: id,
			});
			return res.status(200).json({ data: deleteThread });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while deleting threads ${err.message}` });
		}
	}
})();
