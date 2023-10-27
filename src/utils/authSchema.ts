import * as Joi from "joi";

export const registerSchema = Joi.object({
	full_name: Joi.string().required().max(100),
	email: Joi.string().email().required().max(50),
	username: Joi.string(),
	password: Joi.string().required().min(8),
	// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
	// .message(
	// 	'"password" must contains one lowercase character, one uppercase character, one number, and one special character from (@$!%*?&)'
	// ),
});

export const loginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});
