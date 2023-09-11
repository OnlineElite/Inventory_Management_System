/*------------Users------------*/
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(50) DEFAULT 'default_password' NOT NULL,
	admin boolean Default false NOT NULL,
	password_hash VARCHAR(100) NOT NULL,
	created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP,
    deleted_date TIMESTAMP
	
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
	name varchar(255) unique,
	created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP,
    deleted_date TIMESTAMP
)

create table brands(
	id serial primary key,
	name varchar(255) unique,
	created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP,
    deleted_date TIMESTAMP
)

create table products(
	id serial primary key,
	name varchar(255) not null,
	ref varchar(255) unique not null,
	stock int not null,
	price DECIMAL(10, 2),
	created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP,
    deleted_date TIMESTAMP,
	Description varchar(500) not null,
	category_id INT,
    brand_id INT,
	image varchar(255),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
)

insert into categories (name) values( 'Phone'), ('Pc Portable'), ('Smart TV'), ('Watch');
insert into brands (name) values ( 'Samsung'), ('HP'), ('Lenovo'), ('Apple'), ('LG'),('Hwaui')																	

insert into products (name , ref, stock, price, Description, category_id, brand_id)
values ('Smart TV 32"', 'STV32LED', 4,2200.00,'32 inch Intelligent Network TV Ultraclear 1920x1080, LED Screen Computer Monitor WiFi Wireless.', 3, 1),
('Sumsung S21', 'SM2100',7, 8700.00,'Samsung Galaxy S21 5G capability, 8GB RAM coupled with 128/256GB storage, and a 4000mAh battery', 1, 1),
('HP PROBOOK 450 ', 'i51335U', 14, 7300.00,'HP ProBook 450 G10, 15,6" FHD, Windows 11 Professionnel, i5,16 Go,512 Go SSD', 2, 2),
('Lenovo Ninkear ', 'i71165G7', 11, 4600.00,'Ninkear N14 Pro Laptop 14-inch IPS Full HD Intel Core i7-1165G7 16GB RAM+1TB SSD', 2,3),
('Hwaui GT3','HGT32023', 21, 400.00,'GT3 Pro Smart Watch Men AMOLED 390*390 HD Screen Heart Rate Bluetooth Call ', 4,6), 
('Huawei Y9 ', 'HWY919', 0,3200.00,'Huawei Y9 Features 6.5″ display, Kirin 710 chipset, 4000 mAh battery, 128 GB storage, 6 GB RAM. ', 1, 6), 
('Smart TV LG 32"' , 'OLED65C36LA',0, 4500.00,'Smart TV 2023 LG OLED evo C3 4K 65 pouces', 3, 5),
('Iphone 14' , 'iPH14pro',5, 10500.00,'Super Retina XDR display 6.1‑inch (diagonal) all‑screen OLED display 2532‑by‑1170-pixel', 1, 4)

select * from users
select * from products
select * from categories
select * from brands

--Update categories trigger
select * from categories

CREATE OR REPLACE FUNCTION update_categories_update_date()
RETURNS TRIGGER AS $$
BEGIN
  NEW.update_date = NOW(); 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER categories_update_trigger
BEFORE INSERT OR UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_categories_update_date();






