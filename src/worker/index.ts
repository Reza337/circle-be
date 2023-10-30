import * as amqp from "amqplib";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";
import ThreadWorker from "./ThreadWorker";

export default new (class WorkerHub {
	constructor() {
		AppDataSource.initialize()
			.then(async () => {
				cloudinary.upload();

				const connection = await amqp.connect(process.env.RABBIT_MQ);

				// create worker anymore
				const resp = await ThreadWorker.create(process.env.THREAD, connection);
				console.log("test Response ", resp);
			})
			.catch((err) => console.log(err));
	}
})();
