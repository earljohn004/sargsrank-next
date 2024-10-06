"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DateField, List, useDataGrid } from "@refinedev/mui";
import React from "react";

const GamesProgress = () => {
  const { dataGridProps } = useDataGrid({
    resource: "ongoing_games",
    syncWithLocation: true,
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "ongoing_game_id",
        headerName: "Ongoing Game ID",
        type: "number",
      },
      {
        field: "game_id",
        headerName: "Game ID",
        type: "string",
      },
      {
        field: "team_1_score",
        headerName: "Team 1 Score",
        type: "number",
      },
      {
        field: "team_2_score",
        headerName: "Team 2 Score",
        type: "number",
      },
      {
        field: "best_of",
        headerName: "Best of",
        type: "number",
      },
      {
        field: "started_at",
        flex: 1,
        headerName: "Started at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <List>
      <DataGrid
        getRowId={(row) => row.ongoing_game_id}
        {...dataGridProps}
        columns={columns}
        autoHeight
      />
    </List>
  );
};

export default GamesProgress;
