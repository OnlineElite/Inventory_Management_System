const pool = require("../config/db");

class Product {
    static async importProducts() {
      const query = `select 
      products.id as product_id,
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

    static async importStatus() {
      const query = `select
      count(distinct products.id) as total_products,
      sum(products.price) as total_values,
      count(distinct categories.id) as total_categories,
      count(distinct users.username) as total_users,
      count(distinct brands.id) as total_brands,
      sum(case when products.stock = 0 then 1 else 0 end) as total_outOfStock
      from products
      inner join categories on categories.id = products.category_id
      inner join brands on brands.id = products.brand_id
      left join users on true
      where products.deleted_date is null
      and users.deleted_date IS null 
      and categories.deleted_date is null
      and brands.deleted_date is null;`;
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

    static async importIncart(user_id) {
      const query = `select 
      products.id as product_id,
      products.name as product_name, 
      products.ref as product_ref, 
      products.stock as product_stock,
      incart.quantity as incart_quantity,
      products.price as product_price,
      products.Description as product_desc,
      products.created_date as product_date,
      products.image as product_image,
      categories.name as category_name, 
      brands.name as brand_name
      from products
      inner join categories on categories.id = products.category_id
      inner join brands on brands.id = products.brand_id
      inner join incart on incart.product_id =  products.id
      inner join users on incart.user_id = users.user_id
      where users.user_id = ${user_id}`;
      const result = await pool.query(query);
      return result.rows;
    }

    static async importInfavories(user_id) {
      const query = `select 
      products.id as product_id,
      products.name as product_name, 
      products.ref as product_ref, 
      products.stock as product_stock,
      products.price as product_price,
      products.Description as product_desc,
      products.created_date as product_date,
      products.image as product_image,
      categories.name as category_name, 
      brands.name as brand_name
      from products
      inner join categories on categories.id = products.category_id
      inner join brands on brands.id = products.brand_id
      inner join infavories on infavories.product_id =  products.id
      inner join users on infavories.user_id = users.user_id
      where users.user_id = ${user_id}`;
      const result = await pool.query(query);
      return result.rows;
    }

    static async checkIfExistInCart(info) {
      const query = `SELECT * FROM incart WHERE user_id = ${info.user_id} and product_id = ${info.product_id}`;
      const result = await pool.query(query);
      return result.rows[0];
    }

    static async checkIfExistInFavories(info) {
      const query = `SELECT * FROM infavories WHERE user_id = ${info.user_id} and product_id = ${info.product_id}`;
      const result = await pool.query(query);
      return result.rows[0];
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

  static async updateProductWithImage(product){
    const query = `update products set name = '${product.name}',ref = '${product.ref}',
     stock = ${product.quantity}, price = ${product.price}, Description =  '${product.desc}', category_id = ${product.category},
    brand_id = ${product.brand}, image = '${product.image}', updated_date = CURRENT_TIMESTAMP where ref = '${product.condition}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async updateProductWithOutImage(product){
    const query = `update products set name = '${product.name}',ref = '${product.ref}',
     stock = ${product.quantity}, price = ${product.price}, Description =  '${product.desc}', category_id = ${product.category},
    brand_id = ${product.brand}, updated_date = CURRENT_TIMESTAMP where ref = '${product.condition}'`

    const result = await pool.query(query);
    return result.rows;
  }

  static async addProductToCart(info){
    const query = `insert into incart (user_id, product_id) values ( ${info.user_id}, ${info.product_id}) `

    const result = await pool.query(query);
    return result.rows;
  }

  static async DeleteProductFromCart(info){
    const query = `delete from incart where user_id = ${info.user_id} and product_id = ${info.product_id}`

    const result = await pool.query(query);
    return result.rows;
  }

  static async UpdateProductFromCart(info){
    const query = `update incart set quantity = ${info.newValue} where user_id = ${info.user_id} and product_id = ${info.product_id}`

    const result = await pool.query(query);
    return result.rows;
  }

  static async addProductToFavories(info){
    const query = `insert into infavories (user_id, product_id) values ( ${info.user_id}, ${info.product_id})`

    const result = await pool.query(query);
    return result.rows;
  }

  static async DeleteProductFromFavories(info){
    const query = `delete from infavories where user_id = ${info.user_id} and product_id = ${info.product_id}`

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
  