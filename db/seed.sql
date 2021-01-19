CREATE TABLE helo_users (id SERIAL PRIMARY KEY, username VARCHAR IS NOT NULL, password VARCHAR IS NOT NULL, profile_pic TEXT);

CREATE TABLE helo_posts (id SERIAL PRIMARY KEY, title VARCHAR(45) IS NOT NULL, content TEXT, img TEXT, author_id INTEGER REFERENCES helo_users(id), date_created TIMESTAMP);