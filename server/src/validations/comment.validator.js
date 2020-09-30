import joi from 'joi'

const commentValidation = (body) => {
    const commentSchema = joi.object({
        names: joi.string().required().min(3).max(20),
        content: joi.string().required().min(5),
    })
    return commentSchema.validate(body)
}
export default commentValidation