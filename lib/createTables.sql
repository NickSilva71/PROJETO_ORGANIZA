CREATE TABLE IF NOT EXISTS users (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `name` ENUM('income', 'expense') NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS budget (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `category_id` CHAR(36) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `planned_value` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `date` DATE NOT NULL,
  `description` TEXT,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `user_id` CHAR(36) NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES category (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS investment_type (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT
);

CREATE TABLE IF NOT EXISTS investment (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `investment_type` CHAR(36) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `value` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `date` DATE NOT NULL,
  `date_final` DATE NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT 1,
  `description` TEXT,
  `user_id` CHAR(36) NOT NULL,
  FOREIGN KEY (`investment_type`) REFERENCES investment_type (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notification (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `date_time` TIMESTAMP NOT NULL,
  `date_time_final` TIMESTAMP,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `user_id` CHAR(36) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transaction (
  `id` CHAR(36) NOT NULL PRIMARY KEY,
  `category_id` CHAR(36) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `value` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `description` TEXT,
  `budget_id` CHAR(36),
  `user_id` CHAR(36) NOT NULL,
  FOREIGN KEY (`budget_id`) REFERENCES budget (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`category_id`) REFERENCES category (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`) ON DELETE CASCADE
);
