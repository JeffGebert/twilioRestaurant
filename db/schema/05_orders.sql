-- Creating orders table

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers (id) ON DELETE CASCADE,
  restaurant_owner_id INTEGER REFERENCES restaurant_owners (id) ON DELETE CASCADE,
  orders_items_id INTEGER REFERENCES orders_items (id) ON DELETE CASCADE
  time_to_make SMALLINT DEFAULT NULL
);
