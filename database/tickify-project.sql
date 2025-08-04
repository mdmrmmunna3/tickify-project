-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2025 at 08:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickify-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `price` decimal(8,2) NOT NULL DEFAULT 0.00,
  `image_path` varchar(255) DEFAULT NULL,
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `location`, `start_time`, `end_time`, `category`, `price`, `image_path`, `status`, `created_at`, `updated_at`) VALUES
(1, 'GWEC Green Fest Season 2', 'Green Fest is the annual environmental fest of S.F.X. Greenherald International School, proudly organized by the Green World Earth Club. This two-day celebration is not just a festival—it\'s a movement. With thrilling competitions, creative challenges, and thought-provoking events, Green fest aims to inspire young minds to act, create, and think green.', 'Barishal', '2025-08-01 09:00:00', '2025-08-02 11:29:00', 'Festival', 200.00, 'events/weJBdC1nSSGdrSUqmuR4ucAjM9P3NlTJBv3LmyBM.png', 'published', '2025-07-31 06:30:12', '2025-08-03 05:38:42'),
(2, 'Music Festival', 'Explore immersive art installations, savor delicious food from local vendors, and enjoy a wide array of activities including workshops, yoga sessions, and late-night DJ sets.', 'Khulna', '2025-08-03 18:31:00', '2025-08-04 18:31:00', 'Festival', 160.00, 'events/BUCwvkk6NVLWOyGPrQVxRi5MXJjasQyZP0oGpVwZ.jpg', 'published', '2025-07-31 06:32:19', '2025-07-31 09:21:49'),
(4, 'Wedding Photography', 'Explore stunning photo exhibitions, join hands-on workshops, and engage in inspiring talks led by industry experts. Whether you\'re looking to sharpen your skills, connect with fellow creatives,', 'Dhaka,Mirpur', '2025-08-01 18:36:00', '2025-08-02 18:36:00', 'Photography', 120.00, 'events/Hgi38jahq5ZZmKgGlcJyfkjfiiak4Obw4emeaukf.jpg', 'published', '2025-07-31 06:37:06', '2025-07-31 06:37:06'),
(5, 'Concert, Festival', 'Get ready for adrenaline-pumping action at the Concert! Join us on [Date] at [Venue/Location] as top athletes come together to compete in a thrilling showcase of skill, speed, and determination.', 'Dhaka,Mirpur', '2025-08-01 10:00:00', '2025-08-02 09:00:00', 'Concert', 180.00, 'events/osHFMTzE6APeyf0qsWjnB0KI6fs1L4FNDfQ7g48C.jpg', 'published', '2025-07-31 08:07:30', '2025-07-31 08:07:30'),
(6, 'test', 'test description', 'Dubai', '2025-08-04 23:00:00', '2025-08-07 23:00:00', 'Concert', 130.00, 'events/ZbfqIoSSWnT6OhjfN9g87hdif06dl5IKOfcx7L8u.jpg', 'published', '2025-08-02 11:01:26', '2025-08-02 11:01:26');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(10, '0001_01_01_000000_create_users_table', 1),
(11, '0001_01_01_000001_create_cache_table', 1),
(12, '0001_01_01_000002_create_jobs_table', 1),
(13, '2025_07_29_122013_create_personal_access_tokens_table', 1),
(14, '2025_07_30_153653_create_events_table', 1),
(15, '2025_08_02_125921_create_payments_table', 2),
(16, '2025_08_02_155752_add_image_path_to_payments_table', 3),
(17, '2025_08_02_160031_add_image_path_to_payments_table', 4),
(18, '2025_08_04_040021_create_purchases_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `stripe_payment_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `stripe_payment_id`, `email`, `event_title`, `amount`, `image_path`, `created_at`, `updated_at`) VALUES
(4, 'pi_3RrhzfCjafuJVvyi1pKU6gyE', 'musi@gmail.com', 'Event Title: GWEC Green Fest Season 2', 200.00, 'events/weJBdC1nSSGdrSUqmuR4ucAjM9P3NlTJBv3LmyBM.png', '2025-08-02 10:09:15', '2025-08-02 10:09:15'),
(5, 'pi_3RrvphCjafuJVvyi1KZytEUn', 'masud01@gmail.com', 'test', 130.00, 'events/ZbfqIoSSWnT6OhjfN9g87hdif06dl5IKOfcx7L8u.jpg', '2025-08-03 00:55:53', '2025-08-03 00:55:53'),
(7, 'pi_3RsGE5CjafuJVvyi1neucBGo', 'sakib@gmail.com', 'Music Festival', 160.00, 'events/BUCwvkk6NVLWOyGPrQVxRi5MXJjasQyZP0oGpVwZ.jpg', '2025-08-03 22:42:26', '2025-08-03 22:42:26'),
(8, 'pi_3RsGLMCjafuJVvyi1ccw6C8E', 'sakib@gmail.com', 'test', 130.00, 'events/ZbfqIoSSWnT6OhjfN9g87hdif06dl5IKOfcx7L8u.jpg', '2025-08-03 22:49:57', '2025-08-03 22:49:57'),
(10, 'pi_3RsH1gCjafuJVvyi18IvzcWm', 'munna2@gmail.com', 'test', 130.00, 'events/ZbfqIoSSWnT6OhjfN9g87hdif06dl5IKOfcx7L8u.jpg', '2025-08-03 23:33:40', '2025-08-03 23:33:40');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(41, 'App\\Models\\User', 3, 'token', 'eb95c57c16fc05c9b4babdbc19e0aeb75df181e801170d7098b0184c5884ea7a', '[\"*\"]', '2025-08-03 23:36:22', NULL, '2025-08-03 23:36:11', '2025-08-03 23:36:22');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `event_id`, `user_id`, `title`, `price`, `image_path`, `is_paid`, `created_at`, `updated_at`) VALUES
(1, 2, 8, 'Music Festival', 160.00, 'events/BUCwvkk6NVLWOyGPrQVxRi5MXJjasQyZP0oGpVwZ.jpg', 1, '2025-08-03 22:19:25', '2025-08-03 22:42:26'),
(2, 6, 8, 'test', 130.00, 'events/ZbfqIoSSWnT6OhjfN9g87hdif06dl5IKOfcx7L8u.jpg', 1, '2025-08-03 22:49:06', '2025-08-03 22:49:57'),
(3, 4, 9, 'Wedding Photography', 120.00, 'events/Hgi38jahq5ZZmKgGlcJyfkjfiiak4Obw4emeaukf.jpg', 1, '2025-08-03 22:51:50', '2025-08-03 22:52:24'),
(4, 6, 10, 'test', 130.00, 'events/ZbfqIoSSWnT6OhjfN9g87hdif06dl5IKOfcx7L8u.jpg', 1, '2025-08-03 23:32:43', '2025-08-03 23:33:40');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('fmagoXtahKnZC5gHUtqAm9jyYtb6Ue90wnbtmh9u', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWmx0bENPOTg5MDdiaUJEaWJqZWE2ckVoU2x5TGVncG00UE9QVTl4dCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754119406),
('IxLGmSgCvPmqnitBSOmg5RnQKf5K8fLn4JBmhx0N', NULL, '127.0.0.1', 'PostmanRuntime/7.45.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieEZKMTRUVG9yaUhTTDJWcG1aVVJWRmM5SjBodnFBNDNxeW5YcDA0VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1754145641);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Munna Admin', 'admin@gmail.com', 'admin', NULL, '$2y$12$JAslRABHSg/MxxxO.As3t.Dm1z90T3jHbIHYKY4iSZ0upj.WwLBEe', NULL, '2025-07-31 06:27:15', '2025-07-31 06:27:15'),
(2, 'masud', 'masud01@gmail.com', 'customer', NULL, '$2y$12$XBjh6bcyurx0/82.ExIGAewdjmRtAsJ7awJgj/w2RNmsgLmBkG5nC', NULL, '2025-07-31 07:30:09', '2025-07-31 07:30:09'),
(3, 'musfiq', 'musi@gmail.com', 'customer', NULL, '$2y$12$iBJRh2wC2IJSAUUf.SbSEuldM63yY8zJz84ZIzYODGi/RbvswqYgy', NULL, '2025-07-31 07:31:47', '2025-07-31 07:31:47'),
(8, 'Md.Sakib Al Hasan', 'sakib@gmail.com', 'customer', NULL, '$2y$12$JjJrKDOFV/BdUqGPlDsCneGpr06sDdYhzQI6N4lCqHSohII5gBtZK', NULL, '2025-08-03 22:10:48', '2025-08-03 22:10:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_stripe_payment_id_unique` (`stripe_payment_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
