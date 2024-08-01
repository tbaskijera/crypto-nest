import React from "react";
import { MSTContext } from "../MSTContext";
import type { RootStoreInstance } from "../RootStore";

export function useStore(): RootStoreInstance {
  const store = React.useContext(MSTContext);
  if (!store) {
    throw new Error("useStore called without Provider");
  }
  return store;
}
