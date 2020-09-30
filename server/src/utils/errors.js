export const NewError = (res,status,message) => {
       return  res.status(status).send({message})
}
