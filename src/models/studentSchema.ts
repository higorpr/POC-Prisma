import Joi from "joi";

export const studentSchema = Joi.object({
	name: Joi.string().required(),
	cpf: Joi.string().length(11).required(),
	birthday: Joi.string().isoDate().required(),
	current_class_id:Joi.number().integer().required()
});

export const cpfSchema = Joi.object({
	cpf: Joi.string().length(11).required(),
});

export const updateSchema = Joi.object({
	name: Joi.string().required(),
	birthday: Joi.string().isoDate().required(),
});
