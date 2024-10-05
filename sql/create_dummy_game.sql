WITH new_game AS (
    INSERT INTO
        public.game_information (
            game_name,
            game_type,
            teammode,
            status,
            approval_status
        )
    VALUES
        (
            '9 ball',
            'raise to 10',
            'Duel',
            'ongoing',
            'approved'
        ) RETURNING game_id
) -- Step 2: Insert players into game_players
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