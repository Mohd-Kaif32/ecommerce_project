const Product=require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");




exports.createProduct=async(req,res,next)=>{

    const product=await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}

exports.getAllProducts=async(req,res)=>{
    const products=await Product.find();
    res.status(200).json({
        sucess:true,
        products
    })
}


exports.updateProduct=async(req,res)=>{
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
}

exports.deleteProdut=async(req,res)=>{
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
}

exports.getProductDetails=async(req,res,next)=>{
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
}


