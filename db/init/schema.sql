CREATE TABLE users (
	user_id serial PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	UNIQUE (first_name, last_name)
);

