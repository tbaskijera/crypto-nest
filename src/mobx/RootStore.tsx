import { types } from "mobx-state-tree";
// import { NotificationStore } from "./entities/notification/NotificationStore";
import type { Instance } from "mobx-state-tree";
import { SeedPhraseStore } from "./entities/seed-phrase/SeedPhraseStore";
import { WalletStore } from "./entities/wallet/WalletStore";
import { UIStore } from "./entities/UIStore";

export const RootStore = types.model("RootStore", {
  seedPhraseStore: types.optional(SeedPhraseStore, {}),
  walletStore: types.optional(WalletStore, {}),
  uiStore: types.optional(UIStore, {}),
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}
