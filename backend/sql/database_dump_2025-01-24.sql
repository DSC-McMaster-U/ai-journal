/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: activities
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `activities` (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: daily_records
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `daily_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_date_user` (`date`, `user_id`),
  KEY `fk_daily_records_user_id` (`user_id`),
  CONSTRAINT `fk_daily_records_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 28 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: journals
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `journals` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: moods
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `moods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tabs
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tabs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(50) NOT NULL DEFAULT '#FFFFFF',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tabs_user_id` (`user_id`),
  CONSTRAINT `fk_tabs_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_moods
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_moods` (
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
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(50) NOT NULL,
  `profile_picture` varchar(200) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: warehouses
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `warehouses` (
  `id` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  KEY `index` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: activities
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: daily_records
# ------------------------------------------------------------

INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (4, '2024-11-24', '102072085857574424342');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (21, '2024-11-24', '108188107816093538321');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (8, '2024-11-24', '114524189455514154381');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (22, '2024-11-25', '108188107816093538321');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (23, '2025-01-16', '108188107816093538321');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (24, '2025-01-19', '108188107816093538321');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (25, '2025-01-20', '108188107816093538321');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (26, '2025-01-22', '108188107816093538321');
INSERT INTO
  `daily_records` (`id`, `date`, `user_id`)
VALUES
  (27, '2025-01-23', '108188107816093538321');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: journals
# ------------------------------------------------------------

INSERT INTO
  `journals` (
    `id`,
    `created_at`,
    `updated_at`,
    `title`,
    `tab_id`,
    `content`,
    `user_id`,
    `daily_record_id`
  )
VALUES
  (
    1,
    '2025-01-20 11:26:43',
    '2025-01-20 11:26:43',
    'my first journal',
    NULL,
    '{\"header\": \"Hellow everyone!!!\"}',
    '108188107816093538321',
    25
  );
INSERT INTO
  `journals` (
    `id`,
    `created_at`,
    `updated_at`,
    `title`,
    `tab_id`,
    `content`,
    `user_id`,
    `daily_record_id`
  )
VALUES
  (
    3,
    '2025-01-20 11:31:46',
    '2025-01-20 11:33:36',
    'renamed',
    6,
    '{\"test\": \"first test in tab\"}',
    '108188107816093538321',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: moods
# ------------------------------------------------------------

INSERT INTO
  `moods` (`id`, `name`)
VALUES
  (1, 'calm');
INSERT INTO
  `moods` (`id`, `name`)
VALUES
  (2, 'tired');
INSERT INTO
  `moods` (`id`, `name`)
VALUES
  (3, 'excited');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tabs
# ------------------------------------------------------------

INSERT INTO
  `tabs` (`id`, `name`, `color`, `created_at`, `user_id`)
VALUES
  (1, 'New Tab', '#FFFFFF', '2024-11-22 02:37:42', NULL);
INSERT INTO
  `tabs` (`id`, `name`, `color`, `created_at`, `user_id`)
VALUES
  (
    5,
    'New Tab',
    '#FFFFFF',
    '2024-11-23 17:56:07',
    '114524189455514154381'
  );
INSERT INTO
  `tabs` (`id`, `name`, `color`, `created_at`, `user_id`)
VALUES
  (
    6,
    'New Tab',
    '#FFFFFF',
    '2024-11-23 18:03:19',
    '114524189455514154381'
  );
INSERT INTO
  `tabs` (`id`, `name`, `color`, `created_at`, `user_id`)
VALUES
  (
    7,
    'New Tab',
    '#FFFFFF',
    '2024-11-23 18:21:37',
    '114524189455514154381'
  );
INSERT INTO
  `tabs` (`id`, `name`, `color`, `created_at`, `user_id`)
VALUES
  (
    24,
    '? Dreams',
    '#1400ff',
    '2025-01-22 23:22:45',
    '102072085857574424342'
  );
INSERT INTO
  `tabs` (`id`, `name`, `color`, `created_at`, `user_id`)
VALUES
  (
    25,
    '☕️ Coffee',
    '#733700',
    '2025-01-22 23:24:11',
    '102072085857574424342'
  );
INSERT INTO
  `tabs` (`id`, `name`, `color`, `created_at`, `user_id`)
VALUES
  (
    26,
    '? Stars',
    '#000d1a',
    '2025-01-22 23:24:29',
    '102072085857574424342'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user_moods
# ------------------------------------------------------------

INSERT INTO
  `user_moods` (
    `id`,
    `daily_record_id`,
    `mood_id`,
    `created_at`,
    `user_id`
  )
VALUES
  (
    7,
    4,
    1,
    '2024-11-24 19:39:38',
    '102072085857574424342'
  );
INSERT INTO
  `user_moods` (
    `id`,
    `daily_record_id`,
    `mood_id`,
    `created_at`,
    `user_id`
  )
VALUES
  (
    8,
    4,
    1,
    '2024-11-24 19:39:40',
    '102072085857574424342'
  );
INSERT INTO
  `user_moods` (
    `id`,
    `daily_record_id`,
    `mood_id`,
    `created_at`,
    `user_id`
  )
VALUES
  (
    9,
    4,
    1,
    '2024-11-24 19:39:41',
    '102072085857574424342'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `name`,
    `profile_picture`,
    `email`,
    `created_at`
  )
VALUES
  (
    '102072085857574424342',
    'Mohammed Abed',
    NULL,
    'abedmohammed353@gmail.com',
    '2024-11-23 12:42:09'
  );
INSERT INTO
  `users` (
    `id`,
    `name`,
    `profile_picture`,
    `email`,
    `created_at`
  )
VALUES
  (
    '102207372484453250573',
    'Andy Pak',
    NULL,
    'andy.pak.school@gmail.com',
    '2025-01-22 16:56:22'
  );
INSERT INTO
  `users` (
    `id`,
    `name`,
    `profile_picture`,
    `email`,
    `created_at`
  )
VALUES
  (
    '108188107816093538321',
    'Austin Bray',
    NULL,
    'austin.bray77@gmail.com',
    '2024-11-20 20:52:49'
  );
INSERT INTO
  `users` (
    `id`,
    `name`,
    `profile_picture`,
    `email`,
    `created_at`
  )
VALUES
  (
    '114102376696192338311',
    'Lucas Machado',
    NULL,
    'lucas.machado.professional@gmail.com',
    '2025-01-18 15:34:05'
  );
INSERT INTO
  `users` (
    `id`,
    `name`,
    `profile_picture`,
    `email`,
    `created_at`
  )
VALUES
  (
    '114524189455514154381',
    'Zayn Abed',
    NULL,
    'zaynabed3@gmail.com',
    '2024-11-23 12:43:29'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: warehouses
# ------------------------------------------------------------

INSERT INTO
  `warehouses` (`id`, `name`, `zip`)
VALUES
  (1, 'Warehouse #1', '33614');
INSERT INTO
  `warehouses` (`id`, `name`, `zip`)
VALUES
  (2, 'Warehouse #23', '90210');
INSERT INTO
  `warehouses` (`id`, `name`, `zip`)
VALUES
  (3, 'Warehouse #103', '03103');
INSERT INTO
  `warehouses` (`id`, `name`, `zip`)
VALUES
  (4, 'Warehouse #4', '12345');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
