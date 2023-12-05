import Joi from "joi"
const userNameValidator = Joi.string()
    .required()
    .min(3)
    .max(12)
    .messages({
        'any.required': 'username cannot be empty',
        'string.max': 'username must be between 5 to 12 characters',
        'string.min': 'username must be between 5 to 12 characters',
    })
    .custom((value, helper) => {
        const specialCharactersRegex = /[!@#$&*]/;
        if (specialCharactersRegex.test(value)) {
            return helper.message('username cannot contains any special character');
        } else return value;
    });
const passwordValidator = Joi.string()
    .required()
    .messages({
    'any.required': 'password cannot be empty',
    });
export const usernamePasswordValidator = Joi.object({
    username:userNameValidator,
    password: passwordValidator,
});