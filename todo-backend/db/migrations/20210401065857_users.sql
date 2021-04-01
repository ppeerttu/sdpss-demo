-- migrate:up

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(55) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- migrate:down

DROP TABLE users;

DROP EXTENSION IF EXISTS "uuid-ossp";
