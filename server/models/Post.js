const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    title: String,
    content: String
})

module.exports = mongoose.model("Post", Schema)