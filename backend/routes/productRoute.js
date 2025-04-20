const express=require("express");
const {getAllProducts,createProduct, updateProduct, deleteProdut,getProductDetails,createProductReviews,getProductReviews,deleteReview}=require("../controllers/productController");
// const router=express.Router();
const {isAuthenticatedUser,authorizeRoles}=require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router
.route("/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProdut)

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser,createProductReviews);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)

module.exports=router;