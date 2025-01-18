import mongoose from "mongoose";

// const FoodItemSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     discount: { type: Number,default:0 },
//     image: { type: String },
//     category: { type: String, required: true },
//     restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },

//   },{timestamps:true});

// export const FoodItem = mongoose.model('FoodItem', FoodItemSchema);


const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, },         // Name of the food item
    description: { type: String, trim: true, },                  // Description of the food item
    price: { type: Number, required: true, min: 0, },
    category: { type: String, required: true },                  // Category (e.g., Pizza, Burgers, Drinks)
    cuisine: { type: String, trim: true },                       // Cuisine type (e.g., Indian, Italian, Chinese)
    image_url: { type: String, trim: true },
    availability: { type: Boolean, default: true },
    ingredients: { type: [String] },                             // List of ingredients used
    allergens: { type: [String] },                               // List of potential allergens
    calories: { type: Number, min: 0 },                          // Caloric value of the item
    preparation_time: { type: Number, required: true, min: 0 },  // Time (in minutes) required for preparation
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, trim: true },
        rating: { type: Number, min: 0, max: 5, required: true },
      },
    ],
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    tags: { type: [String] },
    discount: {
      percentage: { type: Number, min: 0, max: 100 },
      valid_until: { type: Date },
    },
    is_vegan: { type: Boolean, default: false },                    // Whether the item is vegan
    is_vegetarian: { type: Boolean, default: true },               // Whether the item is vegetarian
    spiciness_level: { type: Number, min: 0, max: 5, },             // Spiciness level (e.g., 1 to 5)
    nutritional_info: {
      protein: { type: Number, min: 0 },
      carbohydrates: { type: Number, min: 0 },
      fats: { type: Number, min: 0 },
      fiber: { type: Number, min: 0 },
      sugar: { type: Number, min: 0 },
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

export const FoodItem = mongoose.model('FoodItem', foodItemSchema);





