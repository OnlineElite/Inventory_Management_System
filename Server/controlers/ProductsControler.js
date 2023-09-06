const pool = require("../config/db");
const {Product, ProductAction} = require("../models/Products.js");

async function getProducts(req, res) {

  try { 
    const Prods = await Product.importProducts();
    
    res.status(201).json({ products: Prods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCategories(req, res) {

  try { 
    const categs = await Product.importCategories();
    
    res.status(201).json({ categories: categs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getBrands(req, res) {

  try { 
    const brand = await Product.importBrands();
    
    res.status(201).json({ brands: brand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function AddingProduct(req, res) {

  try { 
    
    await ProductAction.addProduct(req.body.product);
    res.status(201).json({ message: 'Product added successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function DeletingProduct(req, res) {

  try{
    await ProductAction.deleteProduct(req.body.product_ref)
    res.status(201).json({ message: 'Product deleted successfully' });
  }catch(error){
    console.log(error)
    res.status(500).json({error : "Internal server error"})
  }
}

async function UpdatingProduct(req, res) {

  try { 
    await ProductAction.updateProduct(req.body.product);
    
    res.status(201).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {getProducts, getCategories, getBrands, AddingProduct, DeletingProduct, UpdatingProduct}