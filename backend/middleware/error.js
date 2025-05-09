
const ErrorHandler = require("../utils/errorhandler");
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";


    // wrong mongodb Id enter
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid:${err.path}`;
        err=new ErrorHandler(message,400);
    }

    // Mongoose duplicate key error
    if(err.code=11000){
        const message="User already";
       err=new ErrorHandler(message,400);
    }
    
    // Wrong JWT error
    if(err.name==="JsonWebtokenError"){
        const message=`Json Web Token is expired,Try again`;
        err=new ErrorHandler(message,400);
    }

    if(err.name==="TokenExpiredError"){
        const message=`Json Web Token is Expired,Try again`;
        err=new ErrorHandler(message,400);
    }

    
    res.status(err.statusCode).json({
        success:false,
       message:err.message
    });
}