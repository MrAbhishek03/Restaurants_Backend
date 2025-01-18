import Order from "../Models/order.model.js"
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"


const orderAdd=asyncHandler(async(req,res)=>{
    const { restaurant, items, totalPrice, deliveryAddress } = req.body;

    if (!user || !restaurant || !items || !totalPrice || !deliveryAddress) {
        throw new ApiError(400,'All fields are required.')
    }

    const newOrder = new Order({
      user:req.user._id,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(
        new ApiResponse(201,savedOrder,"Order created successfully")
    );
  
})

const OrderUpdate=asyncHandler(async(req,res)=>{
    const {status}=req.body
    const user=req.body


})



export {OrderUpdate,orderAdd}