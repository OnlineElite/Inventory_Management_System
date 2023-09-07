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
  destination : (req, file, calback)=>{
    calback(null, 'public/images')
  },
  filename : (req, file, calback)=>{
    calback(null, file.fieldname +'_'+ Date.now()+ path.extname(file.originalname))
  }
})
const upload = multer({ storage : storage })
// Product Routers
router.get('/products',upload.single('image'), getProducts)
router.post('/addProduct',AddingProduct)
router.post('/deleteProduct', DeletingProduct)
router.post('/updateProduct', UpdatingProduct)
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