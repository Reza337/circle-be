import * as Joi from "joi";

export const likesSchema = Joi.object({
	likeToUser: Joi.number(),
	likeToThread: Joi.number(),
});
