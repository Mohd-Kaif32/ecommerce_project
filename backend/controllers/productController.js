const Product=require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


exports.createProduct=catchAsyncErrors(async(req,res,next)=>{

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


