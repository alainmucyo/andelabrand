import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("User", Schema)