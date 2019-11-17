-- Creating the items on the menu table

DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(75) NOT NULL,
  price INT,
  image_url VARCHAR(250) NOT NULL,
  description VARCHAR(500) NOT NULL
);
