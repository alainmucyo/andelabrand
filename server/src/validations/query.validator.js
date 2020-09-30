import joi from 'joi'

const queryValidation =  (body) => {
    const querySchema = joi.object({
        name: joi.string().required().min(3).max(20),
        email: joi.string().email().required(),
        content: joi.string().required().min(10),
    })
    return querySchema.validate(body)
}
export default queryValidation