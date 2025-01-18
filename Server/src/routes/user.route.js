import express from "express"
import { loginUser, logout, passwordUpdate, registerUser } from "../controllers/user.control.js"
import verifyJWT from "../middlewares/auth.middleware.js"



const userRouter=express.Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT,logout)
userRouter.route("/passrdupdate").post(verifyJWT,passwordUpdate)



export default userRouter