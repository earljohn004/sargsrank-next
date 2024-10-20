"use client";

import { Button, Grid, Stack, Typography } from "@mui/material";
import { useParsed, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { useEffect, useState } from "react";
import { ShowGame, GameScores, GamePlayers } from "./types";

type ScoreCondition = "increment" | "decrement";

const ShowGameId = () => {
  const [gameScoreMap, setGameScoreMap] = useState<
    Map<number, GameScores> | undefined
  >(undefined);

  const { params } = useParsed();
  const { query } = useShow<ShowGame>({
    resource: "game_information",
    id: params?.id,
    meta: {
      idColumnName: "game_id",
      select: `*, 
        game_players!inner(player_id, player_information(first_name, last_name)),
        game_scores!inner(*)
        `,
    },
  });
  const { isLoading, isSuccess } = query;
  const gameData = query.data?.data;

  const handleScore = (value: ScoreCondition, gameDetails: GamePlayers) => {
    setGameScoreMap((prevMap) => {
      const currentGameScores = prevMap?.get(gameDetails.player_id);
      if (!currentGameScores) return prevMap;

      let updatedGamesScore;
      let newScore;

      if (value === "decrement") {
        newScore =
          currentGameScores.score > 0 ? (currentGameScores.score -= 1) : 0;
      } else {
        newScore =
          currentGameScores.score >= 0 ? (currentGameScores.score += 1) : 0;
      }

      // Assign the new score here and copy all previous values
      updatedGamesScore = {
        ...currentGameScores,
        score: newScore,
      };

      const newMap = new Map(prevMap);
      newMap.set(gameDetails.player_id, updatedGamesScore);
      return newMap;
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("EARL_DEBUG record ", gameData);
      const scoresMap = gameData?.game_scores.reduce((map, item) => {
        map.set(item.player_id, item);
        return map;
      }, new Map<number, GameScores>());
      setGameScoreMap(scoresMap);
    }
  }, [gameData, isSuccess]);

  if (isLoading) return <>Loading</>;

  return (
    <Show>
      <Stack gap={2}>
        <Typography variant="body1">Match Id: {gameData?.game_id}</Typography>
        <Typography variant="h5">Game type: {gameData?.game_mode}</Typography>
        <Typography variant="h5">Race to {gameData?.game_race}</Typography>

        {gameData?.game_players.map((gameDetails) => (
          <>
            <Typography variant="h5">{gameDetails.player_id}</Typography>
            <Typography variant="h5">
              {gameDetails.player_information.first_name}{" "}
              {gameDetails.player_information.last_name}
            </Typography>
            <Grid container>
              <Grid xs={4}>
                <Button
                  variant="contained"
                  onClick={() => handleScore("decrement", gameDetails)}
                >
                  Decrement
                </Button>
              </Grid>
              <Grid xs={4}>
                <Typography variant="h3">
                  {gameScoreMap?.get(gameDetails.player_id)?.score}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Button
                  variant="contained"
                  onClick={() => handleScore("increment", gameDetails)}
                >
                  Increment
                </Button>
              </Grid>
            </Grid>
          </>
        ))}

        <Button variant="contained" color="success">
          Save Game
        </Button>
      </Stack>
    </Show>
  );
};

export default ShowGameId;
