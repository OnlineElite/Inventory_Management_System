const pool = require("../config/db");

class Product {
    static async importProducts() {
      const query = `select 
      products.name as product_name, 
      products.ref as product_ref, 
      products.stock as product_stock,
      products.price as product_price,
      products.Description as product_desc,
      products.created_date as product_date,
      products.inCart as product_incart,
      products.liked as product_liked,
      products.image as product_image,
      categories.name as category_name, 
      brands.name as brand_name
      from products
      inner join categories on categories.id = products.category_id
      inner join brands on brands.id = products.brand_id
      where products.deleted_date is null`;
      const result = await pool.query(query);
      return result.rows;
    }

    static async importCategories() {
      const query = `select * from categories where deleted_date is null`;
      const result = await pool.query(query);
      return result.rows;
    }

    static async importBrands() {
      const query = `select * from brands where deleted_date is null`;
      const result = await pool.query(query);
      return result.rows;
    }
  }

class ProductAction {

  //---Products Action
  static async addProduct(product){
    const query = `insert into products (name , ref, stock, price, Description, category_id, brand_id, image)
    values ('${product.name}', '${product.ref}', ${product.quantity}, 
    ${product.price}, '${product.desc}', ${product.category}, ${product.brand}, '${product.image}')`;

    const result = await pool.query(query);
    return result.rows;
  }

  static async deleteProduct(product_ref){
    //const query = `delete from products where ref = '${product_ref}'`
    const query = `update products set deleted_date = CURRENT_TIMESTAMP  where ref = '${product_ref}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async updateProduct(product){
    const query = `update products set name = '${product.name}',ref = '${product.ref}',
     stock = ${product.quantity}, price = ${product.price}, Description =  '${product.desc}', category_id = ${product.category},
    brand_id = ${product.brand}, image = '${product.image}', updated_date = CURRENT_TIMESTAMP where ref = '${product.condition}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async addProductToCart(ref){
    const query = `update products set inCart = true where ref = '${ref}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async DeleteProductFromCart(ref){
    const query = `update products set inCart = false where ref = '${ref}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async addProductToFavories(ref){
    const query = `update products set liked = true where ref = '${ref}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async DeleteProductFromFavories(ref){
    const query = `update products set liked = false where ref = '${ref}'`

    const result = await pool.query(query);
    return result.rows;
  }

  //---Categories Action
  static async addCategory(category){
    const query = `insert into categories (name) values ('${category}')`

    const result = await pool.query(query);
    return result.rows;
  }

  static async updateCategory(category){
    
    //const query = `update categories set name = '${category.newValue}' where name = '${category.condition}'`
    const query = `update categories set name = '${category.newValue}', updated_date = CURRENT_TIMESTAMP where name = '${category.condition}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async deleteCategory(categName){
    //const query = `delete from categories where name = '${categName}'`
    const query = `update categories set deleted_date = CURRENT_TIMESTAMP where name = '${categName}'`

    const result = await pool.query(query);
    return result.rows;
  }

  //---Brands Action
  static async addBrand(brand){
    const query = `insert into brands (name) values ('${brand}')`

    const result = await pool.query(query);
    return result.rows;
  }

  static async updateBrand(brand){
    const query = `update brands set name = '${brand.newValue}', updated_date = CURRENT_TIMESTAMP where name = '${brand.condition}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async deleteBrand(brandName){
    //const query = `delete from brands where name = '${brandName}'`
    const query = `update brands set deleted_date = CURRENT_TIMESTAMP where name = '${brandName}'`

    const result = await pool.query(query);
    return result.rows;
  }

}
  
  
  module.exports = {Product, ProductAction};
  