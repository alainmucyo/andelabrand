import {NewError} from "../utils/errors";
import {JsonResponse} from "../utils/response";
import Article from "../models/Article";
import articleValidation from "../validations/article.validator";
import multer from 'multer'

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
            if (!req.body) return NewError(res, 422, "Input fields are required")
            const {error} = articleValidation(req.body);
            if (error)
                return NewError(res, 422, error.details[0].message)
            if (!req.file) return NewError(res, 422, "Image is required")
            const article = new Article({
                title: req.body.title,
                image: req.file.path,
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
            const article = await Article.findOne({_id: req.params.id})
            if (!article) return NewError(res, 404, "Article not found!")
            return JsonResponse(res, "Article found!", article)
        } catch (e) {
            return NewError(res, 404, "Article not found")
        }
    }
}

export default ArticleController