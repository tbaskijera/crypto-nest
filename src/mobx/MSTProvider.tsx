import React from "react";
import { MSTContext } from "./MSTContext";
import type { RootStoreInstance } from "./RootStore";
import type { ReactNode } from "react";

export function MSTProvider({
  children,
  store,
}: {
  children: ReactNode;
  store?: RootStoreInstance;
}) {
  return <MSTContext.Provider value={store}>{children}</MSTContext.Provider>;
}
