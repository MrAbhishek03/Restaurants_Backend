import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['customer', 'delivery'], default: 'customer' },
    refreshToken: { type: String },
    createdAt: { type: Date, default: Date.now }
});



UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})



UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}



UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        role: this.role
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCES_TOKEN_EXPIRY || "10d"
        })
}



UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "1d"
        })
}



export const User = mongoose.model('User', UserSchema);
