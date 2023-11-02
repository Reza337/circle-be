import * as Joi from "joi";

export const createThreadSchema = Joi.object({
	content: Joi.string().allow("", null),
	image: Joi.string().allow("", null),
	users: Joi.number(),
});

export const updateThreadSchema = Joi.object({
	content: Joi.string(),
	image: Joi.string(),
});
