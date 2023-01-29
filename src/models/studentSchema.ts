import Joi from "joi";

export const createOrUpdateSchema = Joi.object({
    name: Joi.string().required(),
    birthday: Joi.string().isoDate().required(),
    cpf: Joi.string().length(11).required(),
    className: Joi.string().required(),
});
