import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 }, // Calculated dynamically

}, { timestamps: true });



export const Cart = mongoose.model('Cart', CartSchema);
