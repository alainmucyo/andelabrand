import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    name: String,
    email: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Query", Schema)