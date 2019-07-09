/** CREAR BASE DE DATOS **/
CREATE DATABASE links_db;

USE links_db;

CREATE TABLE users(
     id INT(11) NOT NULL,
     username VARCHAR(16) NOT NULL,
     password VARCHAR(60) NOT NULL,
     fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users 
     ADD PRIMARY KEY (id);

ALTER TABLE users 
     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


DESCRIBE users;

CREATE TABLE links(
	id INT(11) NOT NULL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    descripcion TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)    
);

ALTER TABLE links
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;