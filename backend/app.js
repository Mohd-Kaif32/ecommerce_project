const express=require("express");
const app=express();


const errorMiddleware=require("./middleware/error");


app.use(express.json());
const product=require("./routes/productRoute");







const user=require("./routes/userRoute");

app.use("/api/v1",user);
app.use("/api/v1",product);
// Middleware for error
// app.use(errorMiddleware);


module.exports=app;