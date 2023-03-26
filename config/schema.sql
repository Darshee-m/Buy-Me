DROP DATABASE IF EXISTS bm_auction_system;
CREATE DATABASE bm_auction_system;

CREATE TABLE `user` (
  `email_id` varchar(45) NOT NULL,
  `password` varchar(15) DEFAULT NULL,
  `name` varchar(15) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `phone_number` tinytext,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email_id`)
);






