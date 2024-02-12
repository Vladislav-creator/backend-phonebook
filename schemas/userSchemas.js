import Joi from "joi";

export const registerSchema = Joi.object({
	name: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string().required(),
});
export const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});