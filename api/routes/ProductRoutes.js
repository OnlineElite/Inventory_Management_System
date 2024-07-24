const express = require("express");
const verifyToken = require("../middleware/AuthMiddleware");
const path = require('path')
const multer =require('multer')
const router = express.Router();
const {
  getOrdersDetails,
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
  DeletingBrand,
  addingProductToCart,
  deletingProductFromCart,
  deletingProductFromFavories,
  addingProductToFavories,
  getIncart,
  getInfavories,
  updatingProductFromCart,
  getStatus,
  contactMessage,
  sendingOrders,
  getOrders,
  bringStatus,
  bringOrderProducts,
  deletingProductFromOrder,
  ChangeOrderStatus,
  changeOrderProductsQuantity,
  updateOrderTotalAmount,
  addingProductToOrder
} = require("../controlers/ProductsControler");

/*const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });*/

const storage = multer.memoryStorage();
const upload = multer({ storage });

// General Routers
router.get('/States',getStatus)
router.post('/sendMessage', contactMessage)
// Orders Routers
router.get('/ordersDetails', getOrdersDetails)
router.post('/sendOrder',upload.any(), sendingOrders)
router.get('/importOrders', getOrders)
router.get('/status',bringStatus)
router.post('/orderProducts', bringOrderProducts)
router.post('/deleteProductFromOrder', deletingProductFromOrder)
router.post('/changeStatus', ChangeOrderStatus)
router.post('/changeTotalAmount', updateOrderTotalAmount)
router.post('/updateOrderProducts', changeOrderProductsQuantity)
router.post('/addProductToOrder', addingProductToOrder)
// Product Routers
router.get("/products", upload.any(), getProducts);
router.post("/addProduct", upload.single("image"), AddingProduct);
router.post('/deleteProduct', DeletingProduct)
router.post('/updateProduct',upload.single("image"), UpdatingProduct)
// incart Routers
router.post('/incart',getIncart)
router.post('/addTocart', addingProductToCart)
router.post('/deleteFromCart', deletingProductFromCart)
router.post('/updateincart', updatingProductFromCart)
// Favories Routers
router.post('/infavories',getInfavories)
router.post('/addToFavories', addingProductToFavories)
router.post('/deleteFromFavories', deletingProductFromFavories)
// Categories Routers
router.get('/categories',getCategories)
router.post('/addCategory', AddingCategory)
router.post('/updateCategory', UpdatingCategory)
router.post('/deleteCategory', DeletingCategory)
// Brands Routers
router.get('/brands',getBrands)
router.post('/addBrand', AddingBrand)
router.post('/updateBrand', UpdatingBrand)
router.post('/deleteBrand', DeletingBrand)

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You are authorized to access this route" });
});

module.exports = router;