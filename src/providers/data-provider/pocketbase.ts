"use client";

import PocketBase from "pocketbase";
import { AuthOptions, authProvider, dataProvider } from "refine-pocketbase";
export const pb = new PocketBase("http://127.0.0.1:8090");
export const pbDataProvider = dataProvider(pb);

const authOptions: AuthOptions = {
  loginRedirectTo: "/login",
};

export const pbAuthProvider = authProvider(pb, authOptions);
