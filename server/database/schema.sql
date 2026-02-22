CREATE DATABASE IF NOT EXISTS emishops
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE emishops;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  role ENUM('seller','admin') NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  whatsapp_number VARCHAR(20),
  address_text TEXT,
  status ENUM('pending','approved','rejected','suspended') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shop_id INT NOT NULL,
  category_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  status ENUM('draft','active','inactive') DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (shop_id) REFERENCES shops(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO users (name, phone, role) VALUES
('Admin EMIShops', '20000000', 'admin'),
('Alpha Seller', '22221111', 'seller'),
('Beta Seller', '22222222', 'seller');

INSERT INTO shops (seller_id, name, whatsapp_number, address_text, status) VALUES
(2, 'Alpha Fashion', '22221111', 'Nouakchott - Tevragh Zeina', 'approved'),
(3, 'Beta Style', '22222222', 'Nouakchott - Arafat', 'approved');

INSERT INTO categories (name, slug) VALUES
('T-Shirts', 't-shirts'),
('Pantalons', 'pantalons'),
('Vestes', 'vestes');

INSERT INTO products (shop_id, category_id, title, description, status) VALUES
(1, 1, 'T-shirt noir basique', 'Coton 100%', 'active'),
(1, 1, 'T-shirt blanc oversize', 'Coupe large', 'active'),
(1, 2, 'Pantalon chino beige', 'Style décontracté', 'draft'),
(2, 1, 'T-shirt sport respirant', 'Idéal pour le sport', 'active'),
(2, 3, 'Veste légère homme', 'Mi-saison', 'inactive');
