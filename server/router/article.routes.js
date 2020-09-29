import express from "express"
import ArticleController from "../controllers/ArticleController";
import {isAuth} from "../middleware/is-auth";
import  passport from "passport";

const router = express.Router()

router.get("/", ArticleController.index)
router.get("/:id", ArticleController.show)
router.post("/", isAuth(passport), ArticleController.store)
router.put("/:id", isAuth(passport), ArticleController.update)
router.delete("/:id", isAuth(passport), ArticleController.destroy)
router.put("/like/:id", ArticleController.addLike)
export default router
/*
"/article/like/{articleID}": {
    "put": {
        "tags": [
            "Articles"
        ],
            "summary": "Add like to article",
            "description": "Adds a like to an article",
            "produces": [
            "application/json"
        ],
            "parameters": [
            {
                "name": "articleID",
                "in": "path",
                "description": "ID of article to like",
                "required": true,
                "type": "string"
            }
        ],
            "responses": {
            "200": {
                "description": "successful operation",
                    "schema": {
                    "$ref": "#/definitions/article"
                }
            },
            "404": {
                "description": "Article not found"
            }
        }
    }
},
"/comment/{articleID}": {
    "post": {
        "tags": [
            "Articles"
        ],
            "summary": "Create a new comment",
            "consumes": [
            "application/json"
        ],
            "produces": [
            "application/json"
        ],
            "parameters": [
            {
                "name": "articleID",
                "in": "path",
                "description": "ID of article to comment",
                "required": true,
                "type": "string"
            },
            {
                "in": "body",
                "name": "Comment",
                "description": "Comment Body",
                "schema": {
                    "$ref": "#/definitions/comment"
                }
            }
        ],
            "responses": {
            "201": {
                "description": "Comment added successfully!"
            },
            "422": {
                "description": "Validation fails"
            }
        }
    }
},*/
/*
"comment": {
    "type": "object",
        "required": [
        "names",
        "content"
    ],
        "properties": {
        "names": {
            "type": "string",
                "example": "Alain MUCYO"
        },
        "content": {
            "type": "string",
                "example": "This is some comment"
        }
    }
}*/
