import { getRoot as MSTgetRoot } from "mobx-state-tree";
import type { RootStoreInstance } from "../RootStore";
import type { IAnyStateTreeNode } from "mobx-state-tree";

export function getRoot(target: IAnyStateTreeNode): RootStoreInstance {
  return MSTgetRoot(target);
}
