import * as Joi from "joi";

export const createThreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
	usersId: Joi.number(),
});

export const updateThreadSchema = Joi.object({
	content: Joi.string().min(8),
	image: Joi.string(),
});
