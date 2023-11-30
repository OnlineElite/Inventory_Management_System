let formidable = require("formidable");
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const pool = require("../config/db");
const { Product, ProductAction, ordersActions} = require("../models/Products.js");

require("dotenv").config();
// Initialize Firebase in Node.js script:
const googleStorage = require("@google-cloud/storage");
var serviceAccount = require("../config/ServiceAccountKey.json");

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL,
});

var bucket = admin.storage().bucket();

// End initialize
async function contactMessage (req, res){
  try{
    const {userName, userEmail ,userPhoneNumber, userMessage} = req.body
    let myEmail = process.env.EMAIL;
    let myPassword = process.env.PASSWORD;

    let config = {
      service : 'gmail',
      auth : {
        user : myEmail,   //here should use userEmail from database
        pass : myPassword  //here should use userPassword from database
      }
    }
    let transporter = nodemailer.createTransport(config);
    // Define the email content
    const emailContent = `
    Name: ${userName}
    Email: ${userEmail}
    Phone Number: ${userPhoneNumber}

    Message:
    ${userMessage}

    ---

    This is a new contact message. Thank you in advance. `;

    // Set the email subject
    const emailSubject = 'New TechWave Message';

    // Send the email
    let email = {
        text: emailContent,
        subject: emailSubject,
        to: myEmail,
    };

    transporter.sendMail(email).then(()=>{
      return res.status(201).json({message : 'Your message has been sent successfully'})
    }).catch((error)=>{
      return res.status(500).json({error})
    })

  }catch(err){
    console.error(err)
    res.status(500).json({ error: "Internal server error" });
  }
}

// Orders Actions

async function sendingOrders(req, res){
  try{
    //console.log(req.body)
  
    await ordersActions.addOrder(req.body)
    res.status(201).json({ message: "Order sent successfully"});

  }catch(err){
    console.error(err)
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getOrders(req, res){
  try {
    const importedOrders = await ordersActions.importOrders()
    //console.log('imported', importedOrders)
    res.status(201).json({orders: importedOrders})

  }catch(err){
    console.error(err)
    res.status(500).json({error: 'Internal server error'})
  }
}

async function bringStatus(req, res) {
  try {
    const state = await ordersActions.importStatus();

    res.status(201).json({ status: state });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function bringOrderProducts(req, res){
  try{
    const prods = await ordersActions.importOrderProducts(req.body.order_id);
    res.status(201).json({orderProducts : prods })

  }catch(err){
    console.error(err)
    res.status(500).json({error: 'Internal server error'})
  }
}

async function deletingProductFromOrder(req, res) {
  try{
    //console.log(req.body)
    await ordersActions.deleteProductFromOrder(req.body)
    res.status(201).json({ message: "Product deleted from order successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

async function ChangeOrderStatus(req, res){
  try{
    //console.log(req.body)
    await ordersActions.changeOrderStatus(req.body)
    res.status(201).json({ message: "Staus changed successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

async function updateOrderTotalAmount(req, res){
  try{
    //console.log(req.body)
    await ordersActions.changeOrderTotalAmount(req.body)
    res.status(201).json({ message: "Total amount changed successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

async function changeOrderProductsQuantity(req, res){
  try{
    //console.log(req.body)
    await ordersActions.updateOrderProductsQuantity(req.body)
    res.status(201).json({ message: "product updated successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

async function addingProductToOrder(req, res){
  try{
    console.log(req.body)
    await ordersActions.addProductToOrder(req.body)
    res.status(201).json({ message: "product added successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

// Product Action
async function getStatus(req, res) {
  try {
    const state = await Product.importStatus();
    res.status(201).json({ states: state });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProducts(req, res) {
  try {
    const Prods = await Product.importProducts();

    res.status(201).json({ products: Prods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function AddingProduct(req, res) {
  try {
    if (req.file) {
      // Generate a unique filename for the image (e.g., use a UUID or other logic)
      const uniqueFilename = `${Date.now()}_${req.file.originalname}`;
      // Define the destination in Firebase Storage
      const file = bucket.file(uniqueFilename);
      // Create a write stream to Firebase Storage
      const fileStream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      // Pipe the uploaded image data to Firebase Storage
      fileStream.end(req.file.buffer);

      fileStream.on("error", (err) => {
        console.error("Error uploading image:", err);
        res.status(500).json({ message: "Error uploading image" });
      });

      fileStream.on("finish", async () => {
        // Set the image property to the URL of the uploaded image in Firebase Storage
        req.body.image = `v0/b/${process.env.BUCKET_URL}/o/${uniqueFilename}?alt=media`;
        try {
          // Add the product with the Firebase Storage URL
          await ProductAction.addProduct(req.body);

          res
            .status(201)
            .json({ message: "Product added successfully", product: req.body });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
    } else {
      // If no file was uploaded, add the product without an image
      await ProductAction.addProductWithoutImage(req.body);

      res
        .status(201)
        .json({ message: "Product added successfully", product: req.body });
    }
  } catch (error) {
    console.error(error);

    if (error.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

async function DeletingProduct(req, res) {
  try {
    if(req.body.image_src !== null){
      // Delete old image from firebase
      const oldImageSrc = req.body.image_src;
  
      const parts = oldImageSrc.split("/");
      const fullImageName = parts.pop();
  
      const imageParts = fullImageName.split("?");
      const imageName = imageParts[0];
  
      await bucket
        .file(`${imageName}`)
        .delete()
        .then(() => {
          console.log("image deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });

      // Delete product from postgresql database
      await ProductAction.deleteProduct(req.body.product_ref);
    }else{
      // Delete product from postgresql database
      await ProductAction.deleteProduct(req.body.product_ref);
    }
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function UpdatingProduct(req, res){
  try {
    if (req.file){
      // Delete old image
      const oldImagePath = req.body.oldImageUrl;
      const parts = oldImagePath.split("/");
      const fullImageName = parts.pop();

      const imageParts = fullImageName.split("?");
      const imageName = imageParts[0];

      await bucket
        .file(`${imageName}`)
        .delete()
        .then(() => {
          console.log("Old image deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting old image:", error);
        });
        
      // Add new image
      // Generate a unique filename for the image
      const uniqueFilename = `${Date.now()}_${req.file.originalname}`;
      // Define the destination in Firebase Storage
      const file = bucket.file(uniqueFilename);
      // Create a write stream to Firebase Storage
      const fileStream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      // Pipe the uploaded image data to Firebase Storage
      fileStream.end(req.file.buffer);
      
      fileStream.on("error", (err) => {
        console.error("Error uploading image:", err);
        res.status(500).json({ message: "Error uploading image" });
      });

      fileStream.on("finish", async () => {
        // Set the image property to the URL of the uploaded image in Firebase Storage
        req.body.image = `v0/b/${process.env.BUCKET_URL}/o/${uniqueFilename}?alt=media`;
        try {
          // update the product with the Firebase Storage URL
          await ProductAction.updateProductWithImage(req.body);
          res.status(201).json({ message: "Product added successfully", product: req.body });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
    }else{
      // If no file was uploaded, update the product without an image
      await ProductAction.updateProductWithOutImage(req.body);
      res.status(201).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    console.error(error);
    if (error.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

// Cart action
async function getIncart(req, res) {
  try {
    const Prods = await Product.importIncart(req.body.user_id);

    res.status(201).json({ products: Prods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addingProductToCart(req, res) {
  
  try{
    const isAllreadyExist = await Product.checkIfExistInCart(req.body.info);
    if (isAllreadyExist) {
      return res.status(409).json({ message: "Product already exists" });
    }

    await ProductAction.addProductToCart(req.body.info)
    res.status(201).json({ message: "Product added to cart successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

async function deletingProductFromCart(req, res) {
  
  try{
    await ProductAction.DeleteProductFromCart(req.body.info)
    res.status(201).json({ message: "Product deleted from cart successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

async function updatingProductFromCart(req, res) {
  
  try{
    await ProductAction.UpdateProductFromCart(req.body.info)
    res.status(201).json({ message: "Product updated incart successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}
// Favories action
async function getInfavories(req, res) {
  try {

    const Prods = await Product.importInfavories(req.body.user_id);

    res.status(201).json({ products: Prods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addingProductToFavories(req, res) {
  
  try{
    const isAllreadyExist = await Product.checkIfExistInFavories(req.body.info);
    if (isAllreadyExist) {
      return res.status(409).json({ message: "Product already exists" });
    }

    await ProductAction.addProductToFavories(req.body.info)
    res.status(201).json({ message: "Product added to Favories successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

async function deletingProductFromFavories(req, res) {
  
  try{
    await ProductAction.DeleteProductFromFavories(req.body.info)
    res.status(201).json({ message: "Product deleted from Favories successfully" })
  }catch(error){
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
}

// Categories Action
async function getCategories(req, res) {
  try {
    const categs = await Product.importCategories();

    res.status(201).json({ categories: categs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function AddingCategory(req, res) {
  try {
    await ProductAction.addCategory(req.body.category);
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function UpdatingCategory(req, res) {
  try {
    await ProductAction.updateCategory(req.body.category);

    res.status(201).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function DeletingCategory(req, res) {
  try {
    await ProductAction.deleteCategory(req.body.category_name);
    res.status(201).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Brands Action
async function getBrands(req, res) {
  try {
    const brand = await Product.importBrands();

    res.status(201).json({ brands: brand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function AddingBrand(req, res) {
  try {
    await ProductAction.addBrand(req.body.brand);
    res.status(201).json({ message: "Brand added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function UpdatingBrand(req, res) {
  try {
    await ProductAction.updateBrand(req.body.brand);

    res.status(201).json({ message: "Brand updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function DeletingBrand(req, res) {
  try {
    await ProductAction.deleteBrand(req.body.brand_name);
    res.status(201).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  getProducts,
  getCategories,
  getBrands,
  AddingProduct,
  DeletingProduct,
  UpdatingProduct,
  AddingCategory,
  AddingBrand,
  UpdatingCategory,
  UpdatingBrand,
  DeletingCategory,
  DeletingBrand,
  addingProductToCart,
  deletingProductFromCart,
  addingProductToFavories,
  deletingProductFromFavories,
  getInfavories,
  getIncart,
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
};
