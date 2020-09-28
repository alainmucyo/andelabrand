import {NewError} from "../utils/errors";
import {JsonResponse} from "../utils/response";
import Article from "../models/Article";
import Query from "../models/Query";

class AdminController {
    static async reports(req, res) {
        // try {
            const articles = await Article.countDocuments()
            const queries = await Query.countDocuments()
            const group = await Article.aggregate([{
                $group: {
                    _id: null,
                    views: {$sum: "$views"},
                    likes: {$sum: "$likes"},
                    comments: {$sum: "$comments_count"}
                }
            }])

            return JsonResponse(res, "Admin statistics", {
                articles: articles,
                queries: queries,
                views: group[0].views,
                likes: group[0].likes,
                comments: group[0].comments
            })
       /* } catch (e) {

            return NewError(res, 404, "Article not found")
        }*/
    }
}

export default AdminController