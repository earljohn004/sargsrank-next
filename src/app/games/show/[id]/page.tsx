"use client";

import { Typography } from "@mui/material";
import { useParsed, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { useEffect } from "react";

interface PlayersInfo {
  player_id: number;
}

interface ShowGame {
  game_id: string;
  game_mode: string;
  game_race: number;
  game_players: PlayersInfo[];
}

const ShowGameId = () => {
  const { params } = useParsed();
  const { query } = useShow<ShowGame>({
    resource: "game_information",
    id: params?.id,
    meta: {
      idColumnName: "game_id",
      select: `*, 
        game_players!inner(player_id, player_information(first_name, last_name)),
        game_scores(player_id, score, status)
        `,
    },
  });
  const { data, isLoading, isError, isSuccess } = query;
  const players = query.data?.data;

  useEffect(() => {
    if (isSuccess) console.log("EARL_DEBUG record ", players);
  }, [players, isSuccess, params]);

  if (isLoading) return <>Loading</>;

  return (
    <Show>
      <Typography variant="h2">Test</Typography>
      <Typography variant="body1">{players?.game_id}</Typography>
      <Typography variant="body1">{players?.game_mode}</Typography>
      <Typography variant="body1">Race to {players?.game_race}</Typography>

      {players?.game_players.map((gameDetails) => (
        <>
          <Typography variant="h5">{gameDetails.player_id}</Typography>
        </>
      ))}
    </Show>
  );
};

export default ShowGameId;
