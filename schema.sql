CREATE DATABASE retroluxe_db;
USE retroluxe_db

-- Create the table actors.
CREATE TABLE poohmadeit (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  coolness_points int NOT NULL,
  attitude varchar(60) NOT NULL,
  PRIMARY KEY(id)
);

-- Insert a set of records.
INSERT INTO poohmadeit (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
INSERT INTO poohmadeit (name, coolness_points, attitude) VALUES ("Elaine", 80, "righteous");
INSERT INTO poohmadeit (name, coolness_points, attitude) VALUES ("Kramer", 20, "doofus");
INSERT INTO poohmadeit (name, coolness_points, attitude) VALUES ("George", 70, "selfish");