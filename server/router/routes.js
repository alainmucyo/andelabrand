const express = require("express")
const Post = require("../models/Post")
const route = express.Router()
    route.get("/posts", async (req, res) => {
        const posts = await Post.find()
        res.send(posts)
    })
    route.post("/posts", async (req, res) => {
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        })
        await post.save()
        res.send(post)
    })
    route.get("/posts/:id", async (req, res) => {
        try {
            const post = await Post.findOne({_id: req.params.id})
            if (!post)
                res.status(404).send({error: "Post not found"})

            res.send(post)
        } catch {
            res.status(404).send({error: "Post not found"})
        }
    })
    route.patch("/posts/:id", async (req, res) => {
        try {
            const post = await Post.findOne({_id: req.params.id})
            if (req.body.title)
                post.title = req.body.title
            if (req.body.content)
                post.content = req.body.content
            await post.save()
            res.send(post)
        } catch {
            res.status(404).send({error: "Post not found"})
        }
    })
    route.delete("/posts/:id", async (req, res) => {
        try {
            await Post.deleteOne({_id: req.params.id})
            res.status(204).send()
        } catch {
            res.status(404).send({error: "Post not found"})
        }
    })
export default route