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