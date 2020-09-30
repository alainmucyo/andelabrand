import joi from 'joi'

export const userValidation = (body) => {
    const userSchema = joi.object({
        name: joi.string().required().min(3).max(20),
        email: joi.string().email().required(),
        password: joi.string().min(6),
        old_password: joi.string()
    })
    return userSchema.validate(body)
}