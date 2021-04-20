-- migrate:up

ALTER TABLE todos
  ADD COLUMN deadline TIMESTAMP WITH TIME ZONE;

-- migrate:down

ALTER TABLE todos
  DROP COLUMN deadline;
