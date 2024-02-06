import Joi from "joi";

//The abortEarly: false gives all the errors, true gives only the first
//Payload is the req ==> {username, email, password}

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const registerSchema = Joi.object({
  username: Joi.string().min(5).max(20).trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(3).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required,
});

export const registerValidator = validator(registerSchema);

export const loginValidator = validator(loginSchema);
