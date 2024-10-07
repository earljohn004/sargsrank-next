"use client";

import { Button, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useUpdate } from "@refinedev/core";
import { DateField, List, ShowButton, useDataGrid } from "@refinedev/mui";
import React from "react";

const GamesProgress = () => {
  const { mutate } = useUpdate();
  const { dataGridProps } = useDataGrid({
    resource: "game_information",
    syncWithLocation: true,
    meta: {
      select:
        "*, game_players!inner(player_id, approval_status), player_information!game_players(first_name, last_name)",
    },
  });

  const updateStatus = (game_id: string, player_id: number) => {
    mutate({
      resource: "game_players",
      id: game_id,
      values: {
        approval_status: "ACCEPTED",
      },
      meta: {
        idColumnName: "game_id",
      },
    });
  };

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "game_id",
        headerName: "Game ID",
        type: "string",
      },
      {
        field: "game_mode",
        headerName: "Billiard Game Mode",
        type: "text",
      },
      {
        field: "game_race",
        headerName: "Race",
        type: "number",
      },
      {
        field: "status",
        headerName: "Status",
        type: "text",
      },
      {
        field: "player_names",
        headerName: "Players",
        minWidth: 400,
        type: "text",
        valueGetter: (params) => {
          const players = params.row?.player_information;
          if (!players || players.length === 0) return "No Players";

          return players
            .map((player: any) =>
              `${player.first_name ?? ""} ${player.last_name ?? ""}`.trim(),
            )
            .join(" vs ");
        },
      },
      {
        field: "approval_status",
        headerName: "Approval Status",
        minWidth: 200,
        renderCell: (params) => {
          const gamePlayers = params?.row.game_players;
          return (
            <>
              {gamePlayers.map((player: any, index: number) => (
                <div key={index}>
                  {player.approval_status === "PENDING" ? (
                    <Button
                      variant="contained"
                      sx={{ marginRight: 1 }}
                      onClick={() => {
                        console.log(
                          "EARL_DEBUG clicked",
                          params?.row.game_id,
                          player.player_id,
                        );
                        updateStatus(params?.row.game_id, player.player_id);
                      }}
                    >
                      Accept
                    </Button>
                  ) : (
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      Joined
                    </Typography>
                  )}
                </div>
              ))}
            </>
          );
        },
      },
      {
        field: "created_at",
        flex: 1,
        headerName: "Created at",
        minWidth: 250,
        renderCell: ({ value }) => {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <>
              <ShowButton hideText recordItemId={row.game_id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <List>
      <DataGrid
        getRowId={(row) => row.game_id}
        {...dataGridProps}
        columns={columns}
        autoHeight
      />
    </List>
  );
};

export default GamesProgress;
