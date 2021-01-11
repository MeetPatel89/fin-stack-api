CREATE TYPE category_type AS ENUM ('expense', 'balance');

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL,
    type category_type
);