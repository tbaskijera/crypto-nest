import { types } from "mobx-state-tree";
// import { NotificationStore } from "./entities/notification/NotificationStore";
import type { Instance } from "mobx-state-tree";
import { SeedPhraseStore } from "./entities/seed-phrase/SeedPhraseStore";
import { WalletStore } from "./entities/wallet/WalletStore";

export const RootStore = types.model("RootStore", {
  seedPhraseStore: types.optional(SeedPhraseStore, {}),
  walletStore: types.optional(WalletStore, {}),
  // configStore: types.optional(ConfigStore, {}),
  // authStore: types.optional(AuthStore, {}),
  // i18n: types.optional(I18n, {}),
  // userStore: types.optional(UserStore, {}),
  // personStore: types.optional(PersonStore, {}),
  // uiStore: types.optional(UIStore, {}),
  // navigationStore: types.optional(NavigationStore, {}),
  // phonePrefixStore: types.optional(PhoneCountryPrefixStore, {}),
  // notificationStore: types.optional(NotificationStore, {}),
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}
