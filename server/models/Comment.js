import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    names: String,
    content: String,
    article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("Comment", Schema)