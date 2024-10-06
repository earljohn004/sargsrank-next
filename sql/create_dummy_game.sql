WITH new_game AS (
    INSERT INTO
        public.game_information (game_mode, game_race, status)
    VALUES
        ('9_BALL', 10, 'NEW') RETURNING game_id
)
INSERT INTO
    public.game_players (game_id, player_id, team_id)
SELECT
    game_id,
    501,
    1
FROM
    new_game
UNION
ALL
SELECT
    game_id,
    502,
    2
FROM
    new_game;
