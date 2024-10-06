DELETE FROM
    public.group_members;

DELETE FROM
    public.group_information;

DELETE FROM
    public.player_information;

WITH inserted_players AS (
    INSERT INTO
        public.player_information (last_name, first_name, created_at, updated_at)
    VALUES
        ('Abaquita', 'Earl John', NOW(), NOW()),
        ('Abaquita', 'Keeve Eanne', NOW(), NOW()),
        ('Brown', 'Charlie', NOW(), NOW()),
        ('Johnson', 'Emily', NOW(), NOW()),
        ('Williams', 'Michael', NOW(), NOW()),
        ('Jones', 'Sarah', NOW(), NOW()),
        ('Garcia', 'David', NOW(), NOW()),
        ('Martinez', 'Laura', NOW(), NOW()),
        ('Davis', 'James', NOW(), NOW()),
        ('Rodriguez', 'Linda', NOW(), NOW()) RETURNING player_id
) -- Insert groups and retrieve their IDs
,
inserted_groups AS (
    INSERT INTO
        public.group_information (group_name, description, created_at, updated_at)
    VALUES
        ('Autodesk', '' :: TEXT, NOW(), NOW()),
        ('Group B', '' :: TEXT, NOW(), NOW()),
        ('Group C', '' :: TEXT, NOW(), NOW()),
        ('Group D', '' :: TEXT, NOW(), NOW()),
        ('Group E', '' :: TEXT, NOW(), NOW()) RETURNING group_id
) -- Insert player groups using the retrieved IDs
INSERT INTO
    public.group_members (player_id, group_id, joined_at)
SELECT
    player_id,
    group_id,
    NOW()
FROM
    inserted_players,
    inserted_groups
WHERE
    (player_id, group_id) IN (
        (500, 40000),
        (501, 40000),
        (502, 40000),
        (503, 40000),
        (504, 40000),
        (505, 40000),
        (506, 40000),
        (507, 40000),
        (508, 40000),
        (509, 40001)
    );
