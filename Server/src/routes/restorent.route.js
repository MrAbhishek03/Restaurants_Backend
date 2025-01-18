import express from "express"
import {restaurantRegistration,restaurantFetchAll , restaurantFetchOne, restaurantUpdate, restaurantDelete} from "../controllers/restorent.control.js"
import verifyJWT from "../middlewares/auth.middleware.js"

const restRouter=express.Router()

restRouter.route("/register").post(verifyJWT,restaurantRegistration)
restRouter.route("/restorents").get(restaurantFetchAll)
restRouter.route("/restorent/:hotelId").get(restaurantFetchOne)
restRouter.route("/delete/:hotelId").delete(verifyJWT,restaurantDelete)


export default restRouter