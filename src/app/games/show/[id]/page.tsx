"use client";

import { Stack, Typography } from "@mui/material";
import { useOne, useParsed, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { useEffect } from "react";

interface ShowGame {
  game_id: string;
}

export const ShowGameId = () => {
  const { query } = useShow<ShowGame>({
    resource: "game_information",
    meta: {
      idColumnName: "game_id",
    },
  });
  const { data, isLoading, isError, isSuccess } = query;
  const players = query.data?.data;

  useEffect(() => {
    if (isSuccess) console.log("EARL_DEBUG record ", players);
  }, [players, isSuccess]);

  return (
    <Show>
      <Typography variant="h2">Test</Typography>
      <Typography variant="h4">{players?.game_id}</Typography>
    </Show>
  );
};

export default ShowGameId;
