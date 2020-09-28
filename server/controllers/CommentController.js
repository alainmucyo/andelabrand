import {NewError} from "../utils/errors";
import {JsonResponse} from "../utils/response";
import commentValidation from "../validations/comment.validator";
import Comment from "../models/Comment";
import Article from "../models/Article";

class CommentController {
    static async store(req, res) {
        try {
            const article = await Article.findOne({_id: req.params.id})
            if (!article) return NewError(res, 404, "Article not found!")

            const {error} = commentValidation(req.body);
            if (error) {

                return NewError(res, 422, error.details[0].message)
            }

            const comment = new Comment({
                names: req.body.names,
                content: req.body.content,
            })
            await comment.save()
            article.comments.push(comment)
            article.comments_count++
            await article.save()
            return JsonResponse(res, "Comment added", comment, 201)
        } catch (e) {
            return NewError(res, 404, "Article not found")
        }
    }
}

export default CommentController