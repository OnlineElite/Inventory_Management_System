const express = require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const {getProducts, getCategories, getBrands, AddingProduct} = require("../controlers/ProductsControler");

const router = express.Router();

router.get('/products',getProducts)
router.get('/categories',getCategories)
router.get('/brands',getBrands)
router.post('/addProduct',AddingProduct)

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You are authorized to access this route" });
});

module.exports = router;