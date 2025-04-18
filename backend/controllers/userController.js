const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel")
exports.registerUser=catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicurl"
        }
    })

   sendToken(user,201,res)
})

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return next(new ErrorHandler("please enter email and password",400))
    }
    //const user = await User.findOne({ email }).select("+password");

    const user=await User.findOne({email:email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const isPasswordMatch=await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password",401))
    }
   
   sendToken(user,200,res);
})