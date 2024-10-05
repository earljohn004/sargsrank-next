"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export const ProfileList = () => {
  const { dataGridProps } = useDataGrid({
    resource: "profile-overview",
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "profile-overview",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.categories?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "title",
        flex: 1,
        headerName: "Title",
        minWidth: 200,
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
      //   {
      //     field: "actions",
      //     headerName: "Actions",
      //     sortable: false,
      //     renderCell: function render({ row }) {
      //       return (
      //         <>
      //           <EditButton hideText recordItemId={row.id} />
      //           <ShowButton hideText recordItemId={row.id} />
      //           <DeleteButton hideText recordItemId={row.id} />
      //         </>
      //       );
      //     },
      //     align: "center",
      //     headerAlign: "center",
      //     minWidth: 80,
      //   },
    ],
    [categoryData],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
