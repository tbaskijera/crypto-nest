import { PersistenceStatic } from "../createPersistence";
import { RootStore } from "./RootStore";

export interface Environment {
  persistence: PersistenceStatic;
}

export async function createStore(environment: Environment) {
  const rootStore = RootStore.create({}, environment);

  return rootStore;
}
