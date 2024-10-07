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
  const { params } = useParsed();
  const { query } = useShow<ShowGame>({
    resource: "game_information",
    id: params?.id,
    meta: {
      idColumnName: "game_id",
      select:
        "*, game_players!inner(player_id), player_information!inner(first_name, last_name)",
    },
  });
  const { data, isLoading, isError, isSuccess } = query;
  const players = query.data?.data;

  useEffect(() => {
    console.log("parsed", params);
    if (isSuccess) console.log("EARL_DEBUG record ", players);
  }, [players, isSuccess, params]);

  if (isLoading) return <>Loading</>;

  return (
    <Show>
      <Typography variant="h2">Test</Typography>
      <Typography variant="h4">{players?.game_id}</Typography>
    </Show>
  );
};

export default ShowGameId;
