-- Creating a orders items table

DROP TABLE IF EXISTS orders_items CASCADE;
CREATE TABLE orders_items (
id SERIAL PRIMARY KEY NOT NULL,
item_id INTEGER REFERENCES items (id) ON DELETE CASCADE,
quantity SMALLINT,
);
