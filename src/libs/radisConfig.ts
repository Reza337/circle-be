import { createClient } from "redis";

const redisClient = createClient({
	password: "4S3QudkXLtO0L5LIeNwM0oiwBbRJPzwz",
	socket: {
		host: "redis-11631.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
		port: 11631,
	},
});

redisClient.on("error", (error) => {
	console.log("Redis Client", error);
	process.exit(1);
});

export async function redisConnect() {
	try {
		await redisClient.connect();
		console.log("Connected To Redis");
	} catch (error) {
		console.log("Redis Client", error);
		process.exit(1);
	}
}

const DEFAULT_EXPIRATION = 3600;

export { redisClient, DEFAULT_EXPIRATION };
