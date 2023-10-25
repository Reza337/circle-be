import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Replie } from "../entities/replies";
import { AppDataSource } from "../data-source";
import { createReplieSchema, updateReplieSchema } from "../utils/Replie";

export default new (class ReplieServices {
	private readonly ReplieRepository: Repository<Replie> =
		AppDataSource.getRepository(Replie);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const replies = await this.ReplieRepository.find({
				relations: ["selecteduser", "ReplyToThread"], // Menambahkan relasi "selectedthread"
			});

			return res.status(200).json({
				status: "success",
				data: {
					replies: replies,
				},
			});
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting replies ${err.message}` });
		}
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const replies = await this.ReplieRepository.findOne({
				where: { id },
				relations: ["selecteduser", "ReplyToThread"],
			});

			if (!replies) return res.status(404).json({ Error: "ID Not Found" });

			return res.status(200).json(replies);
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting replies ${err.message}` });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;

			const { error } = createReplieSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang dimasukan tidak valid" });

			const obj = this.ReplieRepository.create({
				content: data.content,
				image: data.image,
				selecteduser: data.selecteduser,
				ReplyToThread: data.ReplyToThread,
			});

			const result = await this.ReplieRepository.save(obj);
			return res.status(201).json({ Replie: result });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while creating Replie: ${err.message}` });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const replies = await this.ReplieRepository.findOne({
				where: { id },
			});

			if (!replies) return res.status(404).json({ Error: "ID Not Found" });

			const data = req.body;

			const { error } = updateReplieSchema.validate(data);
			if (error) return res.status(401).json({ Error: "Data tidak Valid" });

			if (data.content) {
				replies.content = data.content;
			}

			if (data.image) {
				replies.content = data.image;
			}

			const update = await this.ReplieRepository.save(replies);
			return res.status(200).json(update);
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error While Updatting ${err.message}` });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const replieDelete = await this.ReplieRepository.findOne({
				where: { id },
			});

			if (!replieDelete) return res.status(404).json({ Error: "ID Not Found" });

			await this.ReplieRepository.delete({
				id: id,
			});
			return res.status(200).json({ data: replieDelete });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while deleting ${err.message}` });
		}
	}
})();
