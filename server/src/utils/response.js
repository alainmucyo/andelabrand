export const JsonResponse = (res, message, data, status = 200) => {
    return res.status(status).send({message, data})
}