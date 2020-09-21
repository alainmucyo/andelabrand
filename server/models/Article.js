import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    comments_count: {type: Number, default: 0},
    comments: [{type: mongoose.Schema.Types.ObjectID, ref: "Comment"}],
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("Article", Schema)