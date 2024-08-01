import { getEnv as MSTgetEnv } from "mobx-state-tree";
import type { Environment } from "./createStore";
import type { IAnyStateTreeNode } from "mobx-state-tree";

export function getEnv(target: IAnyStateTreeNode): Environment {
  return MSTgetEnv(target);
}
