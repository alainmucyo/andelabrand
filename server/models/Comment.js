import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    names: {type: String, required: true},
    content: {type: String, required: true},
    article: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("Comment", Schema)