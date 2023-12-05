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
    .min(8)
    .max(16)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .messages({
        'any.required': 'password cannot be empty',
        'string.max': 'password must be between 8 to 16 characters',
        'string.min': 'password must be between 8 to 16 characters',
        'string.pattern': 'password must contains at least on uppercase and lowercase character and one number.',
        'string.equal': 'confirmPassword must be exactly equal to password',
    });
export const usernamePasswordValidator = Joi.object({
    username:userNameValidator,
    password: passwordValidator,
});