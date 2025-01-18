import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../Models/user.model.js";
import { Restaurant } from "../Models/restorent.model.js"


const restaurantRegistration = asyncHandler(async (req, res) => {
    const { name, email, address, phone, description } = req.body

    if ([name, email, address, phone].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are required")
    }

    const userId = req.user
    if (!userId) {
        throw new ApiError(404, "User Not LoggedIn.")
    }

    const user = await User.findById(userId?._id)
    if (!user) {
        throw new ApiError(404, "User Not LoggedIn--.")
    }

    const restrnt = await Restaurant.create({
        name,
        email,
        address,
        phone,
        description,
        ownerId: user?._id
    })
    return res.status(200).json(
        new ApiResponse(200, restrnt, "Hotel Ragistration Successfully")
    )
})



const restaurantUpdate = asyncHandler(async (req, res) => {


})



const restaurantFetchOne = asyncHandler(async (req, res) => {
    const {hotelId} = req.params
    if (!hotelId) {
        throw new ApiError(400, "Hotel Id not found Error")
    }

    const hotel = await Restaurant.findById(hotelId)
    if (!hotel) {
        throw new ApiError(400, "Invalid Hotel Request. ")
    }
    return res.status(200).json(
        new ApiResponse(200, hotel, "Data fetched successfully")
    )

})



const restaurantFetchAll = asyncHandler(async (req, res) => {
    const hotel = await Restaurant.find()
    if (!hotel) {
        throw new ApiError(400, "Invalid Hotel Request. ")
    }
    return res.status(200).json(
        new ApiResponse(200, hotel, "Data fetched successfully")
    )

})



const restaurantDelete = asyncHandler(async (req, res) => {
    // console.log(req.params)
    const {hotelId} = req.params
    // const userId=req.user
    if (!hotelId) {
        throw new ApiError(400, "Hotel Id not found Error")
    }

    const findhotel=await Restaurant.findById(hotelId)
    if (!findhotel){
        throw new ApiError(400,"Hotel not found Error")
    }
    console.log()

    if (!findhotel.ownerId.equals(req.user._id)){
        throw new ApiError(404,"Only admin can delete the Hotel.")
    }

    const hotel = await Restaurant.findByIdAndDelete(hotelId)
    console.log(hotel)
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Hotel deleted successfully")
    )


})



export { restaurantRegistration,restaurantFetchAll , restaurantFetchOne, restaurantUpdate, restaurantDelete }