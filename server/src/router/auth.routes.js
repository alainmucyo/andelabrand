import express from "express"
import AuthController from "../controllers/AuthController";
import {isAuth} from "../middleware/is-auth";
import passport from "passport";

const router = express.Router()
router.get("/user", isAuth(passport), AuthController.userDetails)
router.post("/login", AuthController.login)
router.post("/mock", AuthController.index)
router.put("/profile", isAuth(passport), AuthController.profile)
export default router