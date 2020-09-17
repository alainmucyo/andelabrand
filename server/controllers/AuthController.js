import {NewError} from "../utils/errors";
import {JsonResponse} from "../utils/response";
import bcrypt from "bcrypt";
import User from "../models/User";
import {generateToken} from "../utils/passport";

class AuthController {
    static async index(req, res) {
        const password = "password"
        const encryptedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            name: "Admin",
            email: "admin@gmail.com",
            image: 'https://res.cloudinary.com/alainmucyo/image/upload/v1600252935/blog/user_yndsrs.png',
            password: encryptedPassword
        })
        await user.save()
        res.send(user)
    }

    static async userDetails(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            if (!user)
                return NewError(res, 404, "User not found")
            return JsonResponse(res, "User found", {
                _id: user.id,
                name: user.name,
                email: user.email,
                image: user.image
            })
        } catch (e) {
            return NewError(res, 500, "Error occurred")
        }
    }

    static async login(req, res) {
        try {
            if (!req.body) return NewError(res, 422, "Email and password are required")
            const user = await User.findOne({email: req.body.email})
            if (!user)
                return NewError(res, 422, "Invalid credentials")
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordValid)
                return NewError(res, 422, "Invalid credentials")

            const token = generateToken(user);
            return JsonResponse(res, "Login succeed", {token})
        }
        catch (e) {
            return NewError(res, 500, "Error occurred")
        }
    }
}

export default AuthController