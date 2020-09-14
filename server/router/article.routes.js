import express from "express"
import ArticleController from "../controllers/ArticleController";

const router = express.Router()
router.get("/", ArticleController.index)
router.get("/:id", ArticleController.show)
 router.post("/",ArticleController.store)
export default router