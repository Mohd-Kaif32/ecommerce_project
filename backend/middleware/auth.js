const catchAsyncErrors=require("./catchAsyncErrors");


exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookie || req.headers.authorization.split("Bearer ")[1];
   console.log(token)
   return res.json({
    token:token
   })
})

