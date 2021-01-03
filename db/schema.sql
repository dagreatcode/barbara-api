DROP DATABASE retroluxe_db;
CREATE DATABASE retroluxe_db;
USE retroluxe_db;

-- Create the table actors.
CREATE TABLE poohmadeit (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  bin_location int NOT NULL,
  description varchar(60) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE retroluxe (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  bin_location int NOT NULL,
  description varchar(60) NOT NULL,
  PRIMARY KEY(id)
);