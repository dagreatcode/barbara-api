DROP DATABASE retroluxe_db;
CREATE DATABASE retroluxe_db;
USE retroluxe_db;
USE `rl3zojbpssol3ahj`;
-- Create the table actors.
-- Create the table actors.
CREATE TABLE `poohmadeit` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR (30) NOT NULL,
  `bin_location` INT NOT NULL,
  `description` VARCHAR (60) NOT NULL,
  `img` LONGBLOB,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY(`id`)
);
CREATE TABLE retroluxe (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  bin_location int NOT NULL,
  description varchar(60) NOT NULL,
  img LONGBLOB,
  timestamp int,
  PRIMARY KEY(id)
);
CREATE TABLE poohmadeit (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  bin_location int NOT NULL,
  description varchar(60) NOT NULL,
  img LONGBLOB,
  PRIMARY KEY(id)
);
select
  *
from
  retroluxe;
select
  *
from
  poohmadeit;