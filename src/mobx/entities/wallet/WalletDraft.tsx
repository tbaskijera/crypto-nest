import { Mnemonic } from "ethers";
import { types } from "mobx-state-tree";
import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface WalletInstance extends Instance<typeof WalletDraft> {}
export interface WalletSnapshotIn extends SnapshotIn<typeof WalletDraft> {}
export interface WalletSnapshotOut extends SnapshotOut<typeof WalletDraft> {}

export const walletDraftInitialState = {
  pin: "",
  mnemonic: {} as Mnemonic,
  seed: "",
};

export const WalletDraft = types.model("WalletDraft", {
  pin: types.string,
  mnemonic: types.frozen<Mnemonic>(),
  seed: types.string,
});
