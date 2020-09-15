import express from "express"
import CommentController from "../controllers/CommentController";

const router = express.Router()
 router.post("/:id", CommentController.store)
export default router