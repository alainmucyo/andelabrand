import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("Query", Schema)