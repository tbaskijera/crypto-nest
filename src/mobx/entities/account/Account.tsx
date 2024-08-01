import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { types } from "mobx-state-tree";

export interface AccountInstance extends Instance<typeof Account> {}
export interface AccountSnapshotIn extends SnapshotIn<typeof Account> {}
export interface AccountSnapshotOut extends SnapshotOut<typeof Account> {}

export const Account = types.model("Account", {
  id: types.identifier,
  index: types.number,
  title: types.optional(types.string, "Default"),
  default: types.boolean,
  derivationPath: "bip44Change",
  tokens: types.model("Tokens", {
    master: types.model({
      publicKey: types.string,
      mintKey: types.string,
    }),
    // devnet: types.array(types.string),
    // testnet: types.array(types.string),
    // mainnet: types.array(types.string),
  }),
});
