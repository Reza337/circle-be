import * as Joi from "joi";

export const followingSchema = Joi.object({
	usersFollowing: Joi.number(),
});

export const followerSchema = Joi.object({
	usersFollower: Joi.number(),
});
