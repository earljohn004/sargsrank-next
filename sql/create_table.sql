DROP TABLE IF EXISTS public.group_members CASCADE;

DROP TABLE IF EXISTS public.game_players CASCADE;

DROP TABLE IF EXISTS public.game_history CASCADE;

DROP TABLE IF EXISTS public.game_information CASCADE;

DROP TABLE IF EXISTS public.ongoing_games CASCADE;

DROP TABLE IF EXISTS public.group_information CASCADE;

DROP TABLE IF EXISTS public.player_information CASCADE;

DROP TABLE IF EXISTS public.profile_overview CASCADE;

DROP TYPE IF EXISTS public.game_mode_enum CASCADE;

DROP TYPE IF EXISTS public.game_status_enum CASCADE;

CREATE TYPE public.game_mode_enum AS ENUM ('8_BALL', '9_BALL', '10_BALL', '15_BALL');

CREATE TYPE public.game_status_enum AS ENUM ('NEW', 'ONGOING', 'FINISHED');

CREATE TABLE public.player_information (
    player_id INTEGER GENERATED BY DEFAULT AS IDENTITY (START WITH 500) NOT NULL,
    last_name TEXT NULL DEFAULT '' :: TEXT,
    first_name TEXT NULL DEFAULT '' :: TEXT,
    activated_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT player_information_pkey PRIMARY KEY (player_id)
) TABLESPACE pg_default;

create table public.group_information (
    group_id bigint generated always as identity (start with 40000) not null,
    group_name text null default '' :: text,
    description text null default '' :: text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint group_information_pkey primary key (group_id)
) tablespace pg_default;

CREATE TABLE public.game_information (
    game_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    game_mode public.game_mode_enum,
    game_race integer null,
    status public.game_status_enum,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
) TABLESPACE pg_default;

CREATE TABLE public.game_players (
    game_id UUID NOT NULL,
    player_id BIGINT NOT NULL,
    team_id INTEGER NULL,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    approval_status TEXT NULL DEFAULT '' :: TEXT,
    declined_reason TEXT NULL DEFAULT '' :: TEXT,
    CONSTRAINT fk_game_id FOREIGN KEY (game_id) REFERENCES public.game_information (game_id) ON DELETE CASCADE,
    CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES public.player_information (player_id) ON DELETE CASCADE,
    CONSTRAINT game_players_pkey PRIMARY KEY (game_id, player_id)
) TABLESPACE pg_default;

create table public.ongoing_games (
    ongoing_game_id uuid primary key default gen_random_uuid (),
    game_id uuid not null,
    team_1_score integer null,
    team_2_score integer null,
    best_of integer null,
    started_at timestamp with time zone not null default now(),
    completed_at timestamp with time zone null,
    status text null default '' :: text,
    constraint fk_game_id foreign key (game_id) references public.game_information (game_id) on delete cascade
) tablespace pg_default;

create table public.game_history (
    history_id uuid primary key default gen_random_uuid (),
    game_id uuid not null,
    group_id bigint not null,
    team_1_score integer null,
    team_2_score integer null,
    game_type text null default '' :: text,
    status text null default '' :: text,
    best_of integer null,
    completed_at timestamp with time zone null,
    winner_player_id bigint null,
    constraint fk_game_id foreign key (game_id) references public.game_information (game_id) on delete cascade,
    constraint fk_group_id foreign key (group_id) references public.group_information (group_id) on delete cascade,
    constraint fk_winner_player_id foreign key (winner_player_id) references public.player_information (player_id) on delete
    set
        null
) tablespace pg_default;

CREATE TABLE public.group_members (
    player_id BIGINT NOT NULL,
    group_id BIGINT NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    requested_at TIMESTAMP WITH TIME ZONE NULL,
    response_at TIMESTAMP WITH TIME ZONE NULL,
    declined_reason TEXT NULL DEFAULT '' :: TEXT,
    matchmaking_rank INTEGER NULL,
    CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES public.player_information (player_id) ON DELETE CASCADE,
    CONSTRAINT fk_group_id FOREIGN KEY (group_id) REFERENCES public.group_information (group_id) ON DELETE CASCADE,
    CONSTRAINT group_members_pkey PRIMARY KEY (player_id, group_id)
) TABLESPACE pg_default;