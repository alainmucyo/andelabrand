import express from "express"
import QueryController from "../controllers/QueryController";

const router = express.Router()
router.get("/", QueryController.index)
 router.post("/", QueryController.store)
export default router