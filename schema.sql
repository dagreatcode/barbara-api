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

-- Insert a set of records.
INSERT INTO poohmadeit (name, bin_location, description) VALUES ("First Jacket", 1, "relaxed");
INSERT INTO poohmadeit (name, bin_location, description) VALUES ("First Pants", 1, "righteously nice");

-- Insert a set of records.
INSERT INTO retroluxe (name, bin_location, description) VALUES ("Project Coming Soon", 0, "relaxed");
