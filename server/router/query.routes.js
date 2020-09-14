import express from "express"
import QueryController from "../controllers/QueryController";

const router = express.Router()
router.get("/query", QueryController.index)
 router.post("/query", QueryController.store)
export default router