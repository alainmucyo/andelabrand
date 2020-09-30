import express from "express"
import QueryController from "../controllers/QueryController";
import {isAuth} from "../middleware/is-auth";
import passport from "passport";

const router = express.Router()
router.get("/", isAuth(passport),QueryController.index)
 router.post("/", QueryController.store)
export default router