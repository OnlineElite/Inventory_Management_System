const pool = require("../config/db");

class Product {
    static async importProducts() {
      const query = `select 
      products.name as product_name, 
      products.ref as product_ref, 
      products.stock as product_stock,
      products.price as product_price,
      categories.name as category_name, 
      brands.name as brand_name
      from products 
      inner join categories on categories.id = products.category_id
      inner join brands on brands.id = products.brand_id`;
      const result = await pool.query(query);
      return result.rows;
    }

    static async importCategories() {
      const query = `select id, name from categories`;
      const result = await pool.query(query);
      return result.rows;
    }

    static async importBrands() {
      const query = `select id, name from brands`;
      const result = await pool.query(query);
      return result.rows;
    }
  }

class ProductAction {
  static async addProduct(product){
    const query = `insert into products (name , ref, stock, price, category_id, brand_id)
    values ('${product.product_name}', '${product.product_ref}', ${product.product_stock}, 
    ${product.product_price}, ${product.category_name}, ${product.brand_name})`

    const result = await pool.query(query);
    return result.rows;
  }

  static async deleteProduct(product_ref){
    const query = `delete from products where ref = '${product_ref}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async updateProduct(product){
    const query = `update products set name = '${product.product_name}',ref = '${product.product_ref}',
     stock = ${product.product_stock}, price = ${product.product_price}, category_id = ${product.category_name},
    brand_id = ${product.brand_name} where ref = '${product.condition}'`

    const result = await pool.query(query);
    return result.rows;
  }
}
  
  
  module.exports = {Product, ProductAction};
  