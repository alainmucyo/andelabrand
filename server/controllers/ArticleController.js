import {NewError} from "../utils/errors";
import {JsonResponse} from "../utils/response";
import Article from "../models/Article";
import articleValidation from "../validations/article.validator";
import cloudinary from "../config/cloudinary";
import fs from "fs"

class ArticleController {
    static async index(req, res) {

        try {
            const queries = await Article.find()
            return JsonResponse(res, "Listing queries!", queries)
        } catch (e) {
            return NewError(res, 500, "Server error")
        }
    }

    static async store(req, res) {
        try {
            const {error} = articleValidation(req.body);
            if (error)
                return NewError(res, 422, error.details[0].message)
            if (!req.file) return NewError(res, 422, "Image is required")

            const path = req.file.path
            const uniqueFilename = new Date().toISOString()
            const image = await cloudinary.uploader.upload(path, {
                public_id: `blog/${uniqueFilename}`,
                tags: `blog`
            })
            fs.unlinkSync(path)
            const article = new Article({
                title: req.body.title,
                image: image.url,
                content: req.body.content,
            })
            await article.save()
            return JsonResponse(res, "Article Created!", article, 201)

        } catch (e) {
            return NewError(res, 500, "Server error")
        }
    }

    static async show(req, res) {
        try {
            const article = await Article.findOne({_id: req.params.id}).populate("comments")

            if (!article) return NewError(res, 404, "Article not found!")
            article.views++
            await article.save()
            return JsonResponse(res, "Article found!", article)
        } catch (e) {
            return NewError(res, 404, "Article not found")
        }
    }

    static async update(req, res) {
        try {
            const {error} = articleValidation(req.body);
            if (error)
                return NewError(res, 422, error.details[0].message)

            const article = await Article.findOne({_id: req.params.id})
            if (!article) return NewError(res, 404, "Article not found!")

            if (req.body.title)
                article.title = req.body.title

            if (req.body.content)
                article.content = req.body.content

            if (req.file && req.file.path) {
                const path = req.file.path
                const uniqueFilename = new Date().toISOString()
                const image = await cloudinary.uploader.upload(path, {
                    public_id: `blog/${uniqueFilename}`,
                    tags: `blog`
                })
                article.image = image.url
                fs.unlinkSync(path)
            }
            await article.save()
            return JsonResponse(res, "Article updated!", article, 200)

        } catch (e) {
            return NewError(res, 404, "Article not found")
        }
    }

    static async destroy(req, res) {
        try {
            await Article.deleteOne({_id: req.params.id})
            return JsonResponse(res, "Article Deleted!", null)
        } catch (e) {
            return NewError(res, 404, "Article not found")
        }
    }

    static async addLike(req, res) {
        try {
            const article = await Article.findOne({_id: req.params.id})
            article.likes++
            await article.save
            return JsonResponse(res, "Like added!", article)
        } catch (e) {
            return NewError(res, 404, "Article not found")
        }
    }
}

export default ArticleController
