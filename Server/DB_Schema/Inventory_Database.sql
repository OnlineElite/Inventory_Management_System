/*------------Users------------*/
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(50) DEFAULT 'default_password' NOT NULL,
	admin boolean Default false NOT NULL,
	password_hash VARCHAR(100) NOT NULL
);

CREATE TABLE login (
    login_id serial PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
	user_id INT REFERENCES users(user_id) ON DELETE CASCADE

);

update users set admin = true where email = 'Jamalboujbari@gmail.com'

--------Stock---------------*/
create table categories(
	id serial primary key,
	name varchar(255) unique
)

create table brands(
	id serial primary key,
	name varchar(255) unique
)

create table products(
	id serial primary key,
	name varchar(255) not null,
	ref varchar(255) unique not null,
	stock int not null,
	price DECIMAL(10, 2), 
	category_id INT,
    brand_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
)

insert into categories (name) values( 'Phone'), ('Pc Portable'), ('Smart TV'), ('Watch');
insert into brands (name) values ( 'Samsung'), ('HP'), ('Lenovo'), ('Apple'), ('LG'),('Hwaui')																	

insert into products (name , ref, stock, price, category_id, brand_id)
values ('sumsung A20', 'SA0001', 10,1200.00, 1, 1), ('hp elite book', 'HP1005',7, 4500.00, 2, 2),
('iphone 11 pro ', 'I11007', 3, 9800.00, 1, 4),('apple s8', 'AS3015', 11, 600.00,4,4),
('lenovo think pad','LT0016', 8, 3500.00,2,3), ('Lg smart TV "', 'STV0001', 0,3500.00, 3, 5), ('GT3 watch' , 'GT8000',0, 1500.00, 4, 6)

select
      products.name as product_name, 
      products.ref as product_ref, 
      products.stock as product_stock,
      products.price as product_price,
      categories.name as category_name, 
      brands.name as brand_name
      from products 
      inner join categories on categories.id = products.category_id
      inner join brands on brands.id = products.brand_id


select * from products
select * from categories
select * from brands





