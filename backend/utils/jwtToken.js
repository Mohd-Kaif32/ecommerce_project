//creating token and saving in cookie
const sendToken=(user,statusCode,res)=>{
    const token=user.getJWTToken();
    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
    }
    // console.log(token)
    res.status(statusCode).cookie("token",token,options).json({
        sucsess:true,
        user,
        token,
        message:"Logged in"
    })
};
module.exports=sendToken;