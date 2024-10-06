"use client";

import { Box, MenuItem, TextField } from "@mui/material";
import { CreateResponse, useCreate, useSelect } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

interface PlayerInformation {
  first_name: string;
  last_name: string;
  player_id: string;
}

interface CreateGameReturn {
  data: {
    game_id: string;
    game_mode: string;
    game_race: number;
    created_at: Date;
  };
}

const GamesCreate = () => {
  const {
    saveButtonProps: gamePlayer1Mutate,
    setValue: gamePlayer1SetValue,
    control: gamePlayer1Control,
  } = useForm({ refineCoreProps: { resource: "game_players" } });

  const {
    saveButtonProps: gamePlayer2Mutate,
    setValue: gamePlayer2SetValue,
    control: gamePlayer2Control,
  } = useForm({ refineCoreProps: { resource: "game_players" } });

  const {
    saveButtonProps,
    refineCore: { formLoading: gameInformationFormLoading },
    register,
  } = useForm({
    refineCoreProps: {
      resource: "game_information",
      onMutationSuccess: (data: unknown) => {
        const gameData = data as CreateGameReturn;

        // Store player id as player 1 on game_players table
        gamePlayer1SetValue("game_id", gameData.data.game_id);
        gamePlayer1Mutate.onClick("" as any);

        // Store player id as player 2 on game_players table
        gamePlayer2SetValue("game_id", gameData.data.game_id);
        gamePlayer2Mutate.onClick("" as any);
      },
    },
  });

  const { options } = useSelect<PlayerInformation>({
    resource: "player_information",
    optionLabel: (item) => `${item.first_name} ${item.last_name}`,
    optionValue: "player_id",
  });

  return (
    <Create
      isLoading={gameInformationFormLoading}
      saveButtonProps={saveButtonProps}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          name="player_id"
          control={gamePlayer1Control}
          render={({ field }) => (
            <TextField
              select
              label="Player 1"
              {...field}
              margin="normal"
              fullWidth
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="player_id"
          control={gamePlayer2Control}
          render={({ field }) => (
            <TextField
              select
              label="Player 2"
              {...field}
              margin="normal"
              fullWidth
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <TextField
          select
          label="Game Type"
          {...register("game_mode", { required: "This field is required" })}
          margin="normal"
          fullWidth
        >
          <MenuItem value="8_BALL">8 BALL</MenuItem>
          <MenuItem value="9_BALL">9 BALL</MenuItem>
          <MenuItem value="10_BALL">10 BALL</MenuItem>
          <MenuItem value="15_BALL">15 BALL</MenuItem>
        </TextField>

        <TextField
          {...register("game_race", {
            required: "This field is required",
          })}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Race"
          name="game_race"
        />
      </Box>
    </Create>
  );
};

export default GamesCreate;
