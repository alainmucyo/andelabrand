import Query from "../models/Query";
import {NewError} from "../utils/errors";
import {JsonResponse} from "../utils/response";
import queryValidation from "../validations/query.validator";

class QueryController {
    static async index(req, res) {
        const queries = await Query.find()
        return JsonResponse(res, "Listing queries!", queries)
    }

    static async store(req, res) {
        const {error} = queryValidation(req.body);

        if (error) {
            console.log("Errors", error.details)
            return NewError(res, 422, error.details[0].message)
        }
        const query = new Query({
            name: req.body.name,
            email: req.body.email,
            content: req.body.content,
        })
        await query.save()
        return JsonResponse(res, "Query Created!", query, 201)
    }
}

export default QueryController