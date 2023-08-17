-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2023 at 06:46 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_sharing`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `photo` mediumtext NOT NULL,
  `category` varchar(255) NOT NULL,
  `userid` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `photo`, `category`, `userid`, `username`, `rating`, `date_time`) VALUES
(1, 'Example Recipe1', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 5, '2023-08-01 17:01:51'),
(2, 'Example recipe2', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Main Course', 3, 'aditya125', 4.5, '2023-08-03 00:00:00'),
(3, 'Example recipe3', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Side Dishes', 2, 'aditya124', 3, '2023-01-11 11:03:32'),
(4, 'Example recipe4', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Soups and Stews', 3, 'aditya125', 2, '2023-08-15 17:01:51'),
(5, 'Example recipe5', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Desserts', 2, 'aditya124', 3.1, '2023-01-14 00:00:00'),
(6, 'Example recipe6', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Beverages', 2, 'aditya124', 3.7, '2023-08-15 21:55:56'),
(7, 'Example recipe7', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 3, 'aditya125', 5, '2023-08-15 21:57:58'),
(8, 'Example recipe8', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 3.2, '2023-08-15 21:59:36'),
(9, 'Example recipe9', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 2.4, '2023-08-15 21:59:36'),
(10, 'Example recipe10', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 3, 'aditya125', 4.2, '2023-08-15 22:01:36'),
(11, 'Example recipe11', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 3.1, '2023-08-15 22:01:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `phone`, `email`, `name`) VALUES
(2, 'aditya124', '$2b$10$qQkJUX.Ih7rGSRVAFWu3veZ5u.NF2ZfHDTiXjRlmK.BN9vTCDVS.W', '7256891970', 'adibhardwaj444@gmail.com', 'Aditya Bhardwaj'),
(3, 'aditya125', '$2b$10$wOQEoOlQCSBA8FvJF/2ZVOXHgr3k1iWu0Anu4uQuLh0rm1AbNlIt.', '7256891970', 'letstravel010101@gmail.com', 'Bhardwaj Aditya');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;