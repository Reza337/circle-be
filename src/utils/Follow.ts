import * as Joi from "joi";

export const followingSchema = Joi.object({
	followingToUser: Joi.number(),
});

export const followerSchema = Joi.object({
	followerToUser: Joi.number(),
});
