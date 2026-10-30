\set ON_ERROR_STOP on

BEGIN;

CREATE TABLE IF NOT EXISTS public.test (
    id SERIAL PRIMARY KEY,
    description TEXT
);

INSERT INTO
    public.test (description)
SELECT value
FROM (
        VALUES ('bar'), ('baz'), ('qux')
    ) AS seed (value)
WHERE
    NOT EXISTS (
        SELECT 1
        FROM public.test
    );

COMMIT;

\ir migrations/001_movie_core.sql