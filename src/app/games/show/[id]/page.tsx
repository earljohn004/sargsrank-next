"use client";

import { Button, Grid, Stack, Typography } from "@mui/material";
import { useParsed, useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { useEffect, useState } from "react";
import { ShowGame, GameScores } from "./types";

const ShowGameId = () => {
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

  const [gameScoreMap, setGameScoreMap] = useState<
    Map<number, GameScores> | undefined
  >(undefined);

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
                  onClick={() => {
                    setGameScoreMap((prevMap) => {
                      const currentGameScores = prevMap?.get(
                        gameDetails.player_id,
                      );

                      if (!currentGameScores) return prevMap;

                      const updatedGamesScore = {
                        ...currentGameScores,
                        score:
                          currentGameScores.score > 0
                            ? (currentGameScores.score -= 1)
                            : 0,
                      };

                      const newMap = new Map(prevMap);
                      newMap.set(gameDetails.player_id, updatedGamesScore);
                      return newMap;
                    });
                  }}
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
                  onClick={() => {
                    setGameScoreMap((prevMap) => {
                      const currentGameScores = prevMap?.get(
                        gameDetails.player_id,
                      );

                      if (!currentGameScores) return prevMap;

                      const updatedGamesScore = {
                        ...currentGameScores,
                        score:
                          currentGameScores.score >= 0
                            ? (currentGameScores.score += 1)
                            : 0,
                      };

                      const newMap = new Map(prevMap);
                      newMap.set(gameDetails.player_id, updatedGamesScore);
                      return newMap;
                    });
                  }}
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
