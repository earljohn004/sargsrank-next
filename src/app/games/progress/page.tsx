"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { DateField, List, useDataGrid } from "@refinedev/mui";
import React from "react";

const GamesProgress = () => {
  const { dataGridProps } = useDataGrid({
    resource: "game_information",
    syncWithLocation: true,
  });

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
        field: "created_at",
        flex: 1,
        headerName: "Created at",
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
        getRowId={(row) => row.game_id}
        {...dataGridProps}
        columns={columns}
        autoHeight
      />
    </List>
  );
};

export default GamesProgress;
