import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"

import {itemAdd,itemDelete,itemFetchById,itemMany,itemUpdate,getAllFoodItemsByHotelId} from "../controllers/item.control.js"

const itemRoute=express.Router()

itemRoute.route("/add/:hotelId").post(verifyJWT,itemAdd)
itemRoute.route("/hotelsitem/:hotelId").get(getAllFoodItemsByHotelId)
itemRoute.route("/oneitem/:hotelId").get(itemFetchById)
itemRoute.route("/allitem/:hotelId").get(itemMany)
itemRoute.route("/update/:hotelId/:itemId").post(verifyJWT,itemUpdate)
itemRoute.route("/delete/:hotelId/:itemId").delete(verifyJWT,itemDelete)


export default itemRoute
