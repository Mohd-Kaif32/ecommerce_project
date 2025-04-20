const Product=require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
req.body.user=req.user.id;
    const product=await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

exports.getAllProducts=catchAsyncErrors(async(req,res)=>{

const resultPerPage=5;
const ProductCount=await Product.countDocuments();
    const ApiFeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    // const products=await apiFeatures.query;


    const products=await ApiFeature.query;
    // if(!products){
    //     return res.status(400).json({
    //         success:false,
    //         message:"No products found"
    //     })
    // }
    res.status(200).json({
        sucess:true,
        products,
        ProductCount
    })
})


exports.updateProduct=catchAsyncErrors(async(req,res)=>{
    let product =await  Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProdut=catchAsyncErrors(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})

exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
    }

    res.status(200).json({
        success:true,
        product
    })
})

exports.createProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productId}=req.body;

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product= await Product.findById(productId);
    const isReviewed=product.reviews.find(
        (rev)=>rev.user.toString()==req.user._id.toString()
    );
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating=rating),(rev.comment=comment);
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let avg=0;
    product.ratings=product.reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    avg/=product.reviews.length;  

    await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
    })
})

//Get All Reviews of a Product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
})

exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.product);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    product.ratings=avg/reviews.length;
    res.status(200).json({
        success:true,
    })
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
})


