import {NewError} from "../utils/errors";
import {JsonResponse} from "../utils/response";
import bcrypt from "bcrypt";
import User from "../models/User";
import {generateToken} from "../utils/passport";
import {userValidation} from "../validations/user.validator";
import cloudinary from "../config/cloudinary";
import {cloudinaryUpload} from "../utils/cloudinary-upload";

class AuthController {
    /*   static async index(req, res) {
           const encryptedPassword = await bcrypt.hash(req.body.password, 12)

           const user = new User({
               name: req.body.name,
               email: req.body.email,
               image: 'https://res.cloudinary.com/alainmucyo/image/upload/v1600252935/blog/user_yndsrs.png',
               password: encryptedPassword
           })
           await user.save()
           res.status(201).send(user)
       }*/

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
        } catch (e) {
            return NewError(res, 500, "Error occurred")
        }
    }

    static async profile(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const {error} = userValidation(req.body)
            if (error)
                return NewError(res, 422, error.details[0].message)

            if (req.body.old_password && req.body.password) {
                const oldPasswordValid = await bcrypt.compare(req.body.old_password, user.password)
                if (!oldPasswordValid)
                    return NewError(res, 422, "Invalid old password credentials")

                user.password = await bcrypt.hash(req.body.password, 12)
            }
   /*         const userExists = await User.findOne({email: req.body.email, _id: {$ne: user._id}})
            if (userExists)
                return NewError(res, 422, "Email has already been taken")*/

            user.name = req.body.name
            user.email = req.body.email
            if (req.file) {
                const path = req.file.path
                user.image = await cloudinaryUpload(path)
            }
            await user.save()
            return JsonResponse(res, "Profile updated successfully!", {user})
        } catch (e) {
            return NewError(res, 500, "Error occurred")
        }
    }
}

export default AuthController