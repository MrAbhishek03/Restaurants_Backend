import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    logo: { type: String },       // cloudinary
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',require:true },
  },{timestamps:true});
  
export const Restaurant= mongoose.model('Restaurant', RestaurantSchema);
  