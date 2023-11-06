import { AppDataSource } from "./data-source";
import * as express from "express";
import router from "./routes";
import * as cors from "cors";
import "dotenv/config";
import { redisConnect } from "./libs/radisConfig";

AppDataSource.initialize()
	.then(async () => {
		const app = express();
		const PORT = 5000;
		redisConnect();

		app.use(cors());
		app.use(express.json());
		app.use("/api/v1", router);

		app.listen(PORT, () => {
			console.log(`server Running on PORT ${PORT}`);
		});
	})
	.catch((error) => console.log(error));
