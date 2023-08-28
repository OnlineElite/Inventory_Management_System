
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


