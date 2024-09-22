import PocketBase from "pocketbase";
import { authProvider, dataProvider } from "refine-pocketbase";
export const pb = new PocketBase("http://127.0.0.1:8090");
export const pbDataProvider = dataProvider(pb);
export const pbAuthProvider = authProvider(pb);
