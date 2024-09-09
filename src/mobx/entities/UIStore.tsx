import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { types } from "mobx-state-tree";

export interface UIStoreInstance extends Instance<typeof UIStore> {}
export interface UIStoreSnapshotIn extends SnapshotIn<typeof UIStore> {}
export interface UIStoreSnapshotOut extends SnapshotOut<typeof UIStore> {}

export const UIStore = types
  .model("UIStore", {
    isRequestingPermissions: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setIsRequestingPermissions(isRequestingPermissions: boolean) {
      self.isRequestingPermissions = isRequestingPermissions;
    },
  }));
