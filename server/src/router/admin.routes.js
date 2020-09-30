import express from "express"
import {isAuth} from "../middleware/is-auth";
import passport from "passport";
import AdminController from "../controllers/AdminController";

const router = express.Router()
router.get("/reports", isAuth(passport), AdminController.reports)
export default router