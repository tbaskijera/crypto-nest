import { createContext } from "react";
import type { RootStoreInstance } from "./RootStore";

export const MSTContext = createContext<RootStoreInstance | undefined>(
  undefined,
);
