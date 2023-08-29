-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2023 at 09:44 AM
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
  `name` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `payment` int(10) DEFAULT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `cooking_method` varchar(255) DEFAULT NULL,
  `cuisines` varchar(255) DEFAULT NULL,
  `courses` varchar(255) DEFAULT NULL,
  `difficulty` varchar(255) DEFAULT NULL,
  `prep_time` int(10) DEFAULT NULL,
  `cook_time` int(10) DEFAULT NULL,
  `rest_time` int(10) DEFAULT NULL,
  `total_time` int(10) DEFAULT NULL,
  `calories` int(10) DEFAULT NULL,
  `best_season` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `photo`, `category`, `userid`, `username`, `name`, `rating`, `payment`, `date_time`, `cooking_method`, `cuisines`, `courses`, `difficulty`, `prep_time`, `cook_time`, `rest_time`, `total_time`, `calories`, `best_season`) VALUES
(1, 'Example Recipe1', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 'Aditya Bhardwaj', 4.7, 300, '2023-08-01 17:01:51', 'Frying, Grilling', 'Chinese, French, Indian', 'Breakfast', 'Easy', 10, 10, 5, 25, 1050, 'Summer'),
(2, 'Example recipe2', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Main Course', 3, 'aditya125', 'Bhardwaj Aditya', 4.5, NULL, '2023-08-03 00:00:00', 'Frying, Grilling', 'Chinese, French, Indian', 'Breakfast', 'Easy', 10, 10, 5, 25, 1050, 'Summer'),
(3, 'Example recipe3', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Side Dishes', 2, 'aditya124', 'Aditya Bhardwaj', 3, 50, '2023-01-11 11:03:32', 'Frying, Grilling', 'Chinese, French, Indian', 'Breakfast', 'Easy', 10, 10, 5, 25, 1050, 'Summer'),
(4, 'Example recipe4', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Soups and Stews', 3, 'aditya125', 'Bhardwaj Aditya', 2, NULL, '2023-08-15 17:01:51', 'Frying, Grilling', 'Chinese, French, Indian', 'Breakfast', 'Easy', 10, 10, 5, 25, 1050, 'Summer'),
(5, 'Example recipe5', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Desserts', 2, 'aditya124', 'Aditya Bhardwaj', 3.1, 500, '2023-01-14 00:00:00', 'Frying, Grilling', 'Chinese, French, Indian', 'Breakfast', 'Easy', 10, 10, 5, 25, 1050, 'Summer'),
(6, 'Example recipe6', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Beverages', 2, 'aditya124', 'Aditya Bhardwaj', 3.7, NULL, '2023-08-15 21:55:56', 'Frying, Grilling', 'Chinese, French, Indian', 'Lunch', 'Intermediate', 15, 8, 3, 26, 5000, 'Winter'),
(7, 'Example recipe7', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 3, 'aditya125', 'Bhardwaj Aditya', 5, NULL, '2023-08-15 21:57:58', 'Frying, Grilling', 'Chinese, French, Indian', 'Lunch', 'Intermediate', 15, 8, 3, 26, 5000, 'Winter'),
(8, 'Example recipe8', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 'Aditya Bhardwaj', 3.2, 1000, '2023-08-15 21:59:36', 'Frying, Grilling', 'Chinese, French, Indian', 'Lunch', 'Intermediate', 15, 8, 3, 26, 5000, 'Winter'),
(9, 'Example recipe9', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 'Aditya Bhardwaj', 2.4, 40, '2023-08-15 21:59:36', 'Frying, Grilling', 'Chinese, French, Indian', 'Lunch', 'Intermediate', 15, 8, 3, 26, 5000, 'Winter'),
(10, 'Example recipe10', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 3, 'aditya125', 'Bhardwaj Aditya', 4.2, NULL, '2023-08-15 22:01:36', 'Frying, Grilling', 'Chinese, French, Indian', 'Dinner', 'Hard', 15, 45, 10, 70, 2300, 'Spring'),
(11, 'Example recipe11', 'https://static.vecteezy.com/system/resources/previews/000/964/198/original/fast-food-meal-set-vector.jpg', 'Appetizers', 2, 'aditya124', 'Aditya Bhardwaj', 3.1, 127, '2023-08-15 22:01:36', 'Frying, Grilling', 'Chinese, French, Indian', 'Dinner', 'Hard', 15, 45, 10, 70, 2300, 'Spring');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `profile_pic` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`id`, `username`, `profile_pic`) VALUES
(1, 'aditya124', 'https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png'),
(2, 'aditya125', NULL);

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
(3, 'aditya125', '$2b$10$wOQEoOlQCSBA8FvJF/2ZVOXHgr3k1iWu0Anu4uQuLh0rm1AbNlIt.', '7256891970', 'letstravel010101@gmail.com', 'Bhardwaj Aditya'),
(4, 'aditya127', '$2b$10$U4.ns.uLooyIt6uo33hYJuYYsEkmbqQ3q2Q5ZwmvrKCeIqsq8iakS', '7256891970', 'aditya.bhardwaj2020@vitstudent.ac.in', 'Aditya');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
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
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
