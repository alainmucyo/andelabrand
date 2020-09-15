import express from "express"
import ArticleController from "../controllers/ArticleController";

const router = express.Router()
router.get("/", ArticleController.index)
router.get("/:id", ArticleController.show)
router.post("/", ArticleController.store)
router.put("/:id", ArticleController.update)
router.delete("/:id", ArticleController.destroy)
router.put("/like/:id", ArticleController.addLike)
export default router