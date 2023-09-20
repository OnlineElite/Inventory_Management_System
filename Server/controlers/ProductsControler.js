let formidable = require("formidable");
let fs = require("fs");

const pool = require("../config/db");
const { Product, ProductAction } = require("../models/Products.js");

// Product Action
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

    if (req.file){
      req.body.image = req.file.filename;
    }
    
    await ProductAction.addProduct(req.body);

    res
      .status(201)
      .json({ message: "Product added successfully", product: req.body });
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
    await ProductAction.deleteProduct(req.body.product_ref);
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function UpdatingProduct(req, res) {
  try {
    console.log("image ################ ", req.file);

    if (req.file){
      req.body.image = req.file.filename;
    }

    await ProductAction.updateProduct(req.body);

    res.status(201).json({ message: "Product updated successfully" });
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
  getIncart
};
