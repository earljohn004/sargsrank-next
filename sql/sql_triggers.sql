DROP TRIGGER game_players_status_change ON game_players;

create
or replace function update_game_scores () returns trigger as $$ 
BEGIN 
    IF OLD.approval_status = 'PENDING'
    AND NEW.approval_status = 'ACCEPTED' THEN
    INSERT INTO
        public.game_scores (game_id, player_id, score, status, updated_at)
    VALUES
        (NEW.game_id, NEW.player_id, 0, 'INIT', now());
    END IF;

    RETURN NEW;
END;
$$ language plpgsql;

create trigger game_players_status_change
after
update on public.game_players for each row 
execute function update_game_scores ();
