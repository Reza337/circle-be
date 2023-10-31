import * as Joi from "joi";

export const createReplieSchema = Joi.object({
	content: Joi.string(),
	users: Joi.number(),
	threads: Joi.number(),
});

export const updateReplieSchema = Joi.object({
	content: Joi.string(),
});
