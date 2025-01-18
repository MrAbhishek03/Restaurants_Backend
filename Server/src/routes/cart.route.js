import express from "express"
import { addCart, removeFormCart, updateCart, getCartDetails } from "../controllers/cart.control.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const cartRouter=express.Router()

cartRouter.route("/addcart").post(verifyJWT,addCart)
cartRouter.route("/remove").post(verifyJWT,removeFormCart)
cartRouter.route("/update").post(verifyJWT,updateCart)
cartRouter.route("/get").get(verifyJWT,getCartDetails)


export default cartRouter
