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