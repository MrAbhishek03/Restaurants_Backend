import { User } from "../Models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const verifyJWT=asyncHandler(async(req,res,next)=>{
    console.log("ashu");
    
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        // console.log(!token)
        if(token===undefined){
            throw new ApiError(401,"User is not LoggedIn")
        }
        if(!token){
           throw new ApiError(401,"Invalid Access secret token")
        }
        const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
        const user=await User.findById(decodeToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"invalid access secret token---")
        }

        req.user=user
        next()

    } catch (error) {
        throw new ApiError(500, "Somethig went wrong while decoding Token")
    }
})






export default verifyJWT