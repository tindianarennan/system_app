CREATE DATABASE IF NOT EXISTS fleet_management;
USE fleet_management;

CREATE TABLE vehicles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plate VARCHAR(10) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE maintenance_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_id INT,
    description TEXT NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    scheduled_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
