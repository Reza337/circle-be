import { v2 as cloudinary } from "cloudinary";

export default new (class CloudinaryConfig {
	upload() {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
	}

	async destination(image: any) {
		try {
			const cloudinaryResponse = await cloudinary.uploader.upload(
				"src/Upload/" + image,
				{
					folder: "circle-app",
				}
			);
			return cloudinaryResponse.secure_url;
		} catch (err) {
			throw err;
		}
	}
})();
