import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../Models/user.model.js";
import { Restaurant } from "../Models/restorent.model.js"
import { FoodItem } from "../Models/foodItem.model.js";


const HotelOwnerIdCheck = async (hotelId, itemId,userId) => {

    const Itemcheck = await FoodItem.findOne({ _id: itemId, restaurant_id: hotelId })
    if (!Itemcheck) {
        throw new ApiError(404, 'Food item Owner Error')
    }


    const usercheck = await Restaurant.findOne({ _id: hotelId, ownerId:userId })
    if (!usercheck) {
        throw new ApiError(404, 'Restaurant UserAdminError')
    }
    return true

}


const itemAdd = asyncHandler(async (req, res) => {
    console.log("wrking")
    const { hotelId } = req.params
    const { name, description, price, category, cuisine, image_url, preparation_time, is_vegetarian, discount, nutritional_info } = req.body;

    if (!name || !price || !category || !preparation_time) {
        throw new ApiError(400, 'Name, price, category, and preparation time are required')
    }

    const foodItem = new FoodItem({
        name,
        description,
        price,
        category,
        cuisine,
        image_url,
        preparation_time,
        discount,
        is_vegetarian,
        nutritional_info,
        restaurant_id: hotelId, // Assuming the logged-in user is a restaurant admin
    });

    const createdFoodItem = await foodItem.save();

    return res.status(201).json(
        new ApiResponse(201, createdFoodItem, "Added food item")
    );

})



const itemUpdate = asyncHandler(async (req, res) => {
    const { hotelId, itemId } = req.params
    const OnershipCheck = await HotelOwnerIdCheck(hotelId, itemId,req.user._id)
    if (!OnershipCheck) {
        throw new ApiError(404, "Invalid data credential")
    }

    const { name, description, price, category, cuisine, image_url, preparation_time } = req.body;

    const foodItem = await FoodItem.findById(req.params.itemId);

    if (!foodItem) {
    throw new ApiError(404,'Food item not found')
    }

    // Update fields
    foodItem.name = name || foodItem.name;
    foodItem.description = description || foodItem.description;
    foodItem.price = price || foodItem.price;
    foodItem.category = category || foodItem.category;
    foodItem.cuisine = cuisine || foodItem.cuisine;
    foodItem.image_url = image_url || foodItem.image_url;
    foodItem.preparation_time = preparation_time || foodItem.preparation_time;

    const updatedFoodItem = await foodItem.save();

    return res.status(200).json(
        new ApiResponse(200, updatedFoodItem, "Update successfully done")
    );


})



const itemDelete = asyncHandler(async (req, res) => {
    const { hotelId, itemId } = req.params
    const foodItem = await FoodItem.findById(itemId);

    if (!foodItem) {
        throw new ApiError(404, 'Food item not found');
    }
    const OnershipCheck = await HotelOwnerIdCheck(hotelId, itemId,req.user._id)
    if (!OnershipCheck) {
        throw new ApiError(404, "Invalid data credential")
    }

    await foodItem.remove();
    return res.status(200).json(
        new ApiResponse(200, {}, 'Food item deleted successfully')
    )
})



const getAllFoodItemsByHotelId = async (req, res) => {
    const {hotelId}=req.params
    const hotel= await Restaurant.findById(hotelId)
    if (!hotel){
        throw new ApiError(400,"Invalid Hotel details.")
    }
    const items= await FoodItem.find({restaurant_id:hotelId})
    return res.status(200).json(
        new ApiResponse(200,items,"Success")
    )

};

const itemFetchById = asyncHandler(async (req, res) => {
    const foodItem = await FoodItem.findById(req.params.id);
    if (!foodItem) {
        throw new ApiError(404, "Food item not found")
    }
    return res.status(200).json(
        new ApiResponse(200, foodItem, "fooditem found")
    );
})


const itemMany = asyncHandler(async (req, res) => {
    const foodItems = await FoodItem.find()
    if (!foodItems) {
        throw new ApiError(404, "Food Item Not found")
    }
    return res.status(200).json(
        new ApiResponse(200, foodItems, "foodItem found")
    )

})


export { itemAdd, itemUpdate, itemDelete, itemFetchById, itemMany,getAllFoodItemsByHotelId }