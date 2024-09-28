import { Header } from "@components/header";
import { HistoryList } from "@components/histories";
import { ProfileList } from "@components/profiles";
import { authProviderServer } from "@providers/auth-provider";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileListPage from "./page";
import { Stack } from "@mui/material";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();
  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }

  return (
    <ThemedLayoutV2 Header={Header}>
      This is the layout
      <Stack>{children}</Stack>
    </ThemedLayoutV2>
  );
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
