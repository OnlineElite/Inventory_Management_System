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
      products.liked as product_liked,
      products.image as product_image,
      categories.name as category_name, 
      brands.name as brand_name
      products.inCart as product_incart,
      from products
      inner join categories on categories.id = products.category_id
      inner join brands on brands.id = products.brand_id
      where products.deleted_date is null`;
      const result = await pool.query(query);
      return result.rows;
    }

    static async importStatus() {
      const query = `SELECT
      (SELECT COUNT(*) FROM users WHERE deleted_date IS NULL) AS total_users,
      (SELECT COUNT(*) FROM categories WHERE deleted_date IS NULL) AS total_categories,
      (SELECT COUNT(*) FROM brands WHERE deleted_date IS NULL) AS total_brands,
      (SELECT COUNT(*) FROM products WHERE deleted_date IS NULL) AS total_products,
      (SELECT COUNT(*) FROM products WHERE deleted_date IS NULL AND stock = 0) AS total_outOfStock,
      (SELECT SUM(price) FROM products WHERE deleted_date IS NULL) AS total_values,
      (SELECT COUNT(*) FROM orders ) AS total_orders,
      (select COUNT(*) FROM orders WHERE status_id = 3) AS total_Delivered,
      (select COUNT(*) FROM orders WHERE status_id = 2) AS total_In_Progress,
      (select COUNT(*) FROM orders WHERE status_id = 1) AS total_Pending,
      (select COUNT(*) FROM orders WHERE status_id = 4) AS total_Return;`;
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

  static async addProductWithoutImage(product){
    const query = `insert into products (name , ref, stock, price, Description, category_id, brand_id)
    values ('${product.name}', '${product.ref}', ${product.quantity}, 
    ${product.price}, '${product.desc}', ${product.category}, ${product.brand})`;

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

class ordersActions{
  
  static async addOrder(order){
    /******* Add orders *******/
    const query1 = `insert into orders (user_id, customer_name, total_amount, total_item, payment_method,
      delivery_method, city, country, address, additional_info)
      values(${order.user_id}, '${order.fname} ${order.lname}', ${order.TotalAmount}, ${order.total_item},
      '${order.payment}', '${order.Delivery}', '${order.city}', '${order.country}', '${order.address}',
      '${order.info}') returning *`
    const result1 = await pool.query(query1);
    const orderId =  result1.rows[0].order_id;

    /******* Add Order products *******/
    const query2 = `insert into Order_Products (order_id, product_id, product_ref, order_quantity)
      values ${JSON.parse(order.Products).map((product) => `(${orderId}, ${product.prod_id}, '${product.prod_ref}', ${product.prod_quantity})`).join(', ')} 
      returning *`;
    const result2 = await pool.query(query2);

    /*******Clear cart *******/
    const query3 = `delete from incart where user_id = ${order.user_id}`
    const result3 = await pool.query(query3)

    /******* Decrease Product Stock *******/
    const query4 = `update products 
    set stock = 
      case
        ${JSON.parse(order.Products).map((product) => ` when id = ${product.prod_id} then (${product.prod_stock} - ${product.prod_quantity})`).join(' ')}
        else stock
      end`;
    const result4 = await pool.query(query4)

    return { order: result1.rows[0], orderProducts: result2.rows , clearCart : result3.rows , DecreaseStock : result4.rows};
  }

  static async importOrders(){
    const query =`select 
    orders.order_id as order_id,
	  orders.user_id as user_id,
    orders.customer_name as customer_name,
    orders.created_date as created_date,
    orders.total_amount as total_amount,
    orders.total_item as total_item,
    orders.payment_method as payment_method,
    orders.delivery_method as delivery_method,
    orders.city as city,
    orders.country as country,
    orders.address as address,
    orders.additional_info as additional_info,
    orders.updated_date as updated_date,
    orders.deleted_date,
    status.name as orders_status,
    status.color as status_color from orders
    inner join status on status.id = orders.status_id
    where orders.deleted_date is null`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async importStatus() {
    const query = `select * from status where deleted_date is null`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async importOrderProducts(order_id){
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
    Order_Products.order_quantity as order_quantity,
    Order_Products.order_id as order_id,
    brands.name as brand_name
    from products
    inner join categories on categories.id = products.category_id
    inner join brands on brands.id = products.brand_id
    inner join Order_Products on Order_Products.product_id =  products.id
    inner join orders on Order_Products.order_id = orders.order_id
    where Order_Products.order_id = ${order_id}`;

    const result = await pool.query(query);
    return result.rows;
  }

  static async deleteProductFromOrder(ids){
    const query1 = `delete from Order_Products where product_id = ${ids.pod_id} and order_id = ${ids.ord_id}`;
    const result1 = await pool.query(query1);

    const query2 = `update orders set total_item = (total_item - 1) where order_id= ${ids.ord_id}`
    const result2 = await pool.query(query2)
    return {deleteProduct : result1.rows, decreaseTotalItem : result2.rows};
  }

  static async changeOrderStatus(ids){
    const query = `update orders set status_id = ${ids.stat_id} where order_id = ${ids.ord_id}`
    const result = await pool.query(query)
    return result.rows
  }

  static async changeOrderTotalAmount(vals){
    const query = `update orders set total_amount = ${vals.total} where order_id = ${vals.ord_id}`;
    const result = await pool.query(query);
    return result.rows
  }

  static async updateOrderProductsQuantity(vals){
    const query = `update Order_Products set order_quantity = ${vals.newVal} where order_id= ${vals.ord_id} and product_id = ${vals.prod_id} `
    const result = await pool.query(query)
    return result.rows
  }

  static async addProductToOrder(vals){
    const query1 = `insert into Order_Products (product_ref, order_id, product_id, order_quantity)
    values ('${vals.prod_ref}', ${vals.ord_id}, ${vals.prod_id}, ${vals.prod_quantity})`;

    const result1 = await pool.query(query1);

    const query2 = `update orders set total_item = (total_item + 1) where order_id= ${vals.ord_id}`
    const result2 = await pool.query(query2)

    return {addProduct : result1.rows, increaseTotalItem : result2.rows};

  }
}
  
  
  module.exports = {Product, ProductAction, ordersActions};
  
