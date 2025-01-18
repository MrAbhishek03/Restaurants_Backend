import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { FoodItem } from "../Models/foodItem.model.js"
import { Cart } from "../Models/cart.model.js";


const addCart = asyncHandler(async (req, res) => {
    const { foodItemId, quantity } = req.body;
    const userId = req.user._id

    if (!userId || !foodItemId || !quantity) {
        throw new ApiError(400, "Food Item ID, and Quantity are required")
    }

    // Check if the food item exists
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
        throw new ApiError(404, "Food item not found.")
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        // Create a new cart if it doesn't exist
        cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // Check if the food item is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.foodItem.toString() === foodItemId);

    if (existingItemIndex >= 0) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.items.push({ foodItem: foodItemId, quantity });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * foodItem.price), 0);

    // Save the cart
    const savedCart = await cart.save();
    return res.status(201).json(
        new ApiResponse(201, savedCart, "Item added to cart.")
    )
})



const removeFormCart = asyncHandler(async (req, res) => {
    const { foodItemId } = req.body;
    const userId = req.user._id

    if (!userId || !foodItemId) {
        throw new ApiError(400, "User ID and Food Item ID are required.")
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found.")
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item.foodItem.toString() !== foodItemId);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.foodItem.price), 0);

    const savedCart = await cart.save();
    return res.status(200).json(
        new ApiResponse(200, savedCart, "Item removed from cart.")
    )
})



const updateCart = asyncHandler(async (req, res) => {

    const { foodItemId, quantity } = req.body;
    const userId = req.user._id

    if (!userId || !foodItemId || quantity === undefined) {
        throw new ApiError(400, "User ID, Food Item ID, and Quantity are required.")
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found.")
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.foodItem.toString() === foodItemId);

    if (itemIndex >= 0) {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.foodItem.price), 0);

        const savedCart = await cart.save();
        return res.status(200).json(
            new ApiResponse(200, savedCart, "Cart updated successfully.")
        )
    } else {
        return res.status(404).json(
            new ApiResponse(404, {}, "Item not found in cart.")
        );
    }
})


const getCartDetails = asyncHandler(async (req, res) => {
    const userId = req.user._id


    const cart = await Cart.findOne({ user: userId }).populate('items.foodItem');

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found.' });
    }

    res.status(200).json(cart);

})




export { addCart, removeFormCart, updateCart, getCartDetails }