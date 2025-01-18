import { User } from "../Models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token", error)
    }
}



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body
    if ([name, phone, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All Fields are required")
    }

    const existUser = await User.findOne({ email })
    if (existUser) {
        throw new ApiError(400, "User allready Register")
    }

    const user = await User.create({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password,
        phone
    })

    return res.status(200).json(
        new ApiResponse(200, user, "User created succsufully done")
    )
})



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(404, "Invalid details")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(404, "invalid credential")
    }

    const isPassword = user.isPasswordCorrect(password)
    if (!isPassword) {
        throw new ApiError(404, "invalid credential")
    }

    const { accessToken, refreshToken } =await generateAccessAndRefereshTokens(user._id)
    console.log(accessToken, refreshToken)
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Getting Error While creating Tokens")
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const Options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, Options)
        .cookie("refreshToken", refreshToken, Options)
        .json(
            new ApiResponse(200, {
                data: loggedInUser, refreshToken, accessToken
            }, "User Login successful")
        )
})



const logout=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{$set:{refreshToken:undefined},new:true})
    const Options={
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",Options)
    .clearCookie("refreshToken",Options)
    .json(
        new ApiResponse(200,{},"User LogOut successfully")
    )


})



const passwordUpdate=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword,}=req.body

    if(!oldPassword || !newPassword){
        throw new ApiError(401,"Empty field are not required")
    }
    
    const user = await User.findById(req.user._id)
    const isPasswordValid=await user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid){
        throw new ApiError(401,"Password is not valid")
    }

    if (oldPassword===newPassword){
        throw new ApiError(401,"Both Password are same")
    }

    user.password = newPassword
    user.save()

    return res.status(200).json(
        new ApiResponse(200, "password Updated succssfully done")
    )

    return res.status(200).json(
        new ApiResponse(200,{user},"Update successfully done")
    )

})



const getUserDetails = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(
            new ApiResponse(200, req.user, "Fetched User details succssfully")
        )
})




export { registerUser, loginUser,logout,passwordUpdate,getUserDetails }