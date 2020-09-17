import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    name: String,
    email: String,
    image: String,
    password: String,
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("User", Schema)