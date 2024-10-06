"use client";

import { Box, MenuItem, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

const GamesCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm({ refineCoreProps: { resource: "game_information" } });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Player 1"
        />
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Player 2"
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
