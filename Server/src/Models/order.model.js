import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
        {
            foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['placed', 'confirmed', 'prepared', 'out-for-delivery', 'delivered',"Cancelled"], default: 'placed' },
    deliveryAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


export const Order = mongoose.model('Order', OrderSchema);