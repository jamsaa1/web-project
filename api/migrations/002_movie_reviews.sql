\set ON_ERROR_STOP on

BEGIN;

SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';

SELECT pg_advisory_xact_lock(18472001);

-- katsoo onko tämä migraatio tehty aiemmin
SELECT EXISTS (
    SELECT 1
    FROM public.movie_schema_migrations
    WHERE version = '002_movie_reviews'
) AS already_applied \gset

\if :already_applied

    \echo '002_movie_reviews already applied; no changes.'

\else

    -- stop jos jo olemassa olevat arvostelut ei sovi uuteen 0.5-5.0 haarukkaan
    DO $$
    BEGIN
        IF EXISTS (
            SELECT 1
            FROM public.ratings_db
            WHERE rating_starsnumber < 0.5
               OR rating_starsnumber > 5.0
               OR rating_starsnumber * 2
                  <> FLOOR(rating_starsnumber * 2)
        ) THEN
            RAISE EXCEPTION
                'Existing ratings contain values outside the new 0.5-5.0 scale. Review them before applying this migration.';
        END IF;
    END
    $$;

    -- vaihtoehtoinen arvosteluteksti ja timestampit
    ALTER TABLE public.ratings_db
        ADD COLUMN rating_text TEXT,
        ADD COLUMN rating_created_at TIMESTAMPTZ
            NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ADD COLUMN rating_updated_at TIMESTAMPTZ
            NOT NULL DEFAULT CURRENT_TIMESTAMP;

    -- korvaa vanhan 0-10 arvostelun
    ALTER TABLE public.ratings_db
        DROP CONSTRAINT ratings_db_rating_starsnumber_check;

    ALTER TABLE public.ratings_db
        ADD CONSTRAINT ratings_db_rating_starsnumber_range_check
        CHECK (
            rating_starsnumber >= 0.5
            AND rating_starsnumber <= 5.0
            AND rating_starsnumber * 2 =
                FLOOR(rating_starsnumber * 2)
        );


    INSERT INTO public.movie_schema_migrations (version)
    VALUES ('002_movie_reviews');

\endif

COMMIT;
