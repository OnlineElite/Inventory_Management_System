const pool = require("../config/db");
const Product = require("../models/Products.js");

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

module.exports = {getProducts, getCategories, getBrands}