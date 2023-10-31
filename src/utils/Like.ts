import * as Joi from "joi";

export const likesSchema = Joi.object({
	users: Joi.number(),
	threads: Joi.number(),
});
