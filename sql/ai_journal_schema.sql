
CREATE DATABASE `ai-journal`;

-- `ai-journal`.activities definition

CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `daily_record_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `exercise` binary(1) NOT NULL,
  `reading` binary(1) NOT NULL,
  `meditation` binary(1) NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dailyRecordId` (`daily_record_id`),
  KEY `fk_activities_user_id` (`user_id`),
  CONSTRAINT `fk_activities_daily_record_id` FOREIGN KEY (`daily_record_id`) REFERENCES `daily_records` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_activities_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `ai-journal`.daily_records definition

CREATE TABLE `daily_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_date_user` (`date`,`user_id`),
  KEY `fk_daily_records_user_id` (`user_id`),
  CONSTRAINT `fk_daily_records_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `ai-journal`.journals definition

CREATE TABLE `journals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` text NOT NULL,
  `tab_id` int DEFAULT NULL,
  `content` json DEFAULT NULL,
  `user_id` char(36) NOT NULL,
  `daily_record_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tab_id` (`tab_id`),
  KEY `user_id` (`user_id`),
  KEY `daily_record_id` (`daily_record_id`),
  CONSTRAINT `journals_ibfk_1` FOREIGN KEY (`tab_id`) REFERENCES `tabs` (`id`),
  CONSTRAINT `journals_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `journals_ibfk_3` FOREIGN KEY (`daily_record_id`) REFERENCES `daily_records` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `ai-journal`.moods definition

CREATE TABLE `moods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `ai-journal`.tabs definition

CREATE TABLE `tabs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(50) NOT NULL DEFAULT '#FFFFFF',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tabs_user_id` (`user_id`),
  CONSTRAINT `fk_tabs_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `ai-journal`.user_moods definition

CREATE TABLE `user_moods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `daily_record_id` int NOT NULL,
  `mood_id` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `daily_record_id` (`daily_record_id`),
  KEY `mood_id` (`mood_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_moods_ibfk_1` FOREIGN KEY (`daily_record_id`) REFERENCES `daily_records` (`id`),
  CONSTRAINT `user_moods_ibfk_2` FOREIGN KEY (`mood_id`) REFERENCES `moods` (`id`),
  CONSTRAINT `user_moods_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- `ai-journal`.users definition

CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(50) NOT NULL,
  `profile_picture` varchar(200) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


