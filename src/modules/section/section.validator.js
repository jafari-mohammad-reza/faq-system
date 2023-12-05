import Joi from "joi";

export const createTopicValidator = Joi.object({
    name: Joi.string().required().min(5),
    status: Joi.string().valid('Draft', 'Published').optional()
});
export const updateTopicValidator = Joi.object({
    name: Joi.string().optional().min(5),
    status: Joi.string().optional().valid('Draft', 'Published')
});
export const  IdValidator = Joi.number().required()