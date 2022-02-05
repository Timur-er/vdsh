create TABLE ropesCategory(
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255)
);

create TABLE ropesBrand (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (brand) REFERENCES ropesCategory (brand),
);

create TABLE ropes(
    color_id SERIAL PRIMARY KEY,
    color_rgb VARCHAR(255),
    quantity INTEGER,
);

create TABLE ropesInStock(
    id SERIAL PRIMARY KEY,
    color_id INTEGER,
    quantity INTEGER,
    brand VARCHAR(255)
);

create TABLE users(
    id  SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    user_name VARCHAR(255),
    role VARCHAR(255),
    shop_id INTEGER
)

create TABLE shops_address(
    id SERIAL PRIMARY KEY,
    address VARCHAR(255)
)

create TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    shop_id INTEGER,
    order_date INTEGER
)

create TABLE order_details(
    order_id INTEGER,
    rope_color_id INTEGER,
    quantity INTEGER
)