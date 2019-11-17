-- Creating the restaurant owners table

DROP TABLE IF EXISTS restaurant_owners CASCADE;
CREATE TABLE restaurant_owners (
id SERIAL PRIMARY KEY NOT NULL,
restaurant_name VARCHAR(100)
);
