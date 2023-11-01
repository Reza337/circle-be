import { Repository } from "typeorm";
import { Thread } from "../entities/thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createThreadSchema, updateThreadSchema } from "../utils/Thread";
const cloudinary = require("cloudinary").v2;

export default new (class ThreadServices {
	private readonly ThreadRepository: Repository<Thread> =
		AppDataSource.getRepository(Thread);

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const threads = await this.ThreadRepository.find({
				relations: ["users", "likes", "likes.users", "replies"],
				order: {
					id: "DESC",
				},
			});

			return res.status(200).json({ status: "success", data: threads });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while getting threads ${err.message}` });
		}
	}

	async findOne(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			const threads = await this.ThreadRepository.findOne({
				where: { id },
				relations: [
					"replies",
					"replies.users",
					"users",
					"likes",
					"likes.users",
				],
			});

			if (!threads) return res.status(404).json({ Error: "ID Not Found" });

			// Memeriksa apakah 'threads' telah ditemukan
			if (threads) {
				// Mengakses data 'replies' dari 'threads'
				const replies = threads.replies;

				// Melakukan sesuatu dengan data 'replies', misalnya, mencetaknya
				console.log("Replies:", replies);

				// Anda juga dapat melakukan pengolahan data lebih lanjut di sini
				// Misalnya, Anda bisa mengubah cara responsnya ditampilkan atau menambahkan lebih banyak informasi.

				return res.status(200).json(threads); // Ini hanya contoh, Anda dapat menyesuaikan respons sesuai kebutuhan Anda.
			}
		} catch (err) {
			return res.status(500).json({ Error: err.message });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = req.body;
			const user = res.locals.loginSession;

			// console.log(user);

			const { error } = createThreadSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang dimasukan tidak Valid" });

			// console.log(data);

			// connecting to claudinary
			cloudinary.config({
				cloud_name: "dws0nodlr",
				api_key: "358419996286175",
				api_secret: "nxJYyhSNS57_ryQ3phWyqmGw7pY",
			});

			//upload data to cloudinary
			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: "circle-app",
			});

			const obj = this.ThreadRepository.create({
				content: data.content,
				image: result.secure_url,
				users: user.users.id,
			});

			const createThread = await this.ThreadRepository.save(obj);

			return res.status(201).json({ Thread: createThread });
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

			if (!thread) {
				return res.status(404).json({ Error: "Thread not found" });
			}

			const data = req.body;

			const { error } = updateThreadSchema.validate(data);
			if (error)
				return res
					.status(401)
					.json({ Error: "Data yang di Input tidak valid" });

			if (data.content) {
				thread.content = data.content;
			}

			if (data.image) {
				thread.image = data.image;
			}

			const update = await this.ThreadRepository.save(thread);
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
			const threadDelete = await this.ThreadRepository.findOne({
				where: { id },
			});
			if (!threadDelete) return res.status(404).json({ Error: "ID Not Found" });

			await this.ThreadRepository.delete({
				id: id,
			});
			return res.status(200).json({ data: threadDelete });
		} catch (err) {
			return res
				.status(500)
				.json({ Error: `Error while deleting threads ${err.message}` });
		}
	}
})();
