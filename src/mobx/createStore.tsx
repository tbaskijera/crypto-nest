import { QueryClient } from "@tanstack/react-query";
import { PersistenceStatic } from "../createPersistence";
import { RootStore } from "./RootStore";

export interface Environment {
  persistence: PersistenceStatic;
  queryClient: QueryClient;
}

export async function createStore(environment: Environment) {
  const rootStore = RootStore.create({}, environment);

  return rootStore;
}
