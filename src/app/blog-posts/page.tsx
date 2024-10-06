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

export default function BlogPostList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    meta: {
      select: "*, categories(id,title)",
    },
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
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
        field: "content",
        flex: 1,
        headerName: "Content",
        minWidth: 250,
        renderCell: function render({ value }) {
          if (!value) return "-";
          return <MarkdownField value={value?.slice(0, 80) + "..." || ""} />;
        },
      },
      {
        field: "categories",
        flex: 1,
        headerName: "Category",
        minWidth: 300,
        valueGetter: ({ row }) => {
          const value = row?.categories;
          return value;
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value?.id)?.title
          );
        },
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 200,
      },
      {
        field: "createdAt",
        flex: 1,
        headerName: "Created at",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [categoryData?.data, categoryIsLoading],
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
