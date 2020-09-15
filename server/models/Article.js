import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    title: String,
    image: String,
    content: String,
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    comments: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("Article", Schema)