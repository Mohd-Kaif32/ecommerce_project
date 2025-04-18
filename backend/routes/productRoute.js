const express=require("express");
const {getAllProducts,createProduct, updateProduct, deleteProdut,getProductDetails}=require("../controllers/productController");
// const router=express.Router();
const {isAuthenticatedUser}=require("../middleware/auth");
const router=express.Router();

router.route("/products").get( isAuthenticatedUser, getAllProducts);
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProduct).delete(deleteProdut).get(getProductDetails);

module.exports=router;