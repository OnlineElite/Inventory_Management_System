const express = require("express");
const multer =require('multer')
const path = require('path')
const verifyToken = require("../middleware/AuthMiddleware");
const {
  getProducts, 
  getCategories, 
  getBrands, 
  AddingProduct, 
  DeletingProduct, 
  UpdatingProduct,
  AddingBrand,
  AddingCategory,
  UpdatingCategory,
  UpdatingBrand,
  DeletingCategory,
  DeletingBrand
} = require("../controlers/ProductsControler");

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Product Routers
router.get("/products", upload.any(), getProducts);
router.post("/addProduct", upload.single("image"), AddingProduct);
router.post('/deleteProduct', DeletingProduct)
router.post('/updateProduct',upload.single("image"), UpdatingProduct)
// Categories Routers
router.get('/categories',getCategories)
router.post('/addCategory', AddingCategory)
router.post('/updateCategory', UpdatingCategory)
router.post('/deleteCategory', DeletingCategory)
//Brands Routers
router.get('/brands',getBrands)
router.post('/addBrand', AddingBrand)
router.post('/updateBrand', UpdatingBrand)
router.post('/deleteBrand', DeletingBrand)

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You are authorized to access this route" });
});

module.exports = router;