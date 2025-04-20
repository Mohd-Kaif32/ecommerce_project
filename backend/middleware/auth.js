const catchAsyncErrors=require("./catchAsyncErrors");
const ErrorHandler=require("../utils/errorhandler");
const jwt =require("jsonwebtoken");
const User=require("../models/userModel");

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
   const token=req.cookie || req.headers.authorization.split("Bearer ")[1];
   console.log("token===>" ,token)
   if(!token){
    return next(new ErrorHandler("Please login to access this resource",401));
   }
//    console.log(req.headers.cookie);
   const decodedData=jwt.verify(token,process.env.JWT_SECRET);
   const user =await User.findById(decodedData.id);
   req.user = user
   next();
})

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
          return next(  new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`,403
            ))
        }
        next();
    }
    
}

