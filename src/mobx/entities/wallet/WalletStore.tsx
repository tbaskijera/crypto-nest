import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { flow, types } from "mobx-state-tree";
import { Wallet } from "./Wallet";
import { WalletDraft, walletDraftInitialState } from "./WalletDraft";
import { Mnemonic } from "ethers";
import _ from "lodash";
import { getEnv } from "../../getEnv";
import { constants } from "../../../constants";
import { autorun } from "mobx";
import {
  Transaction,
  transactionInitialState,
} from "../transaction/Transaction";

export interface WalletStoreInstance extends Instance<typeof WalletStore> {}
export interface WalletStoreSnapshotIn extends SnapshotIn<typeof WalletStore> {}
export interface WalletStoreSnapshotOut
  extends SnapshotOut<typeof WalletStore> {}

export const WalletStore = types
  .model("WalletStore", {
    wallet: types.maybe(Wallet),
    walletDraft: types.optional(WalletDraft, walletDraftInitialState),
    transaction: types.optional(Transaction, transactionInitialState),
  })
  .actions((self) => ({
    addWalletDraftPin(pin: string) {
      self.walletDraft.pin = pin;
    },
    addWalletDraftMnemonic(mnemonic: Mnemonic) {
      self.walletDraft.mnemonic = mnemonic;
    },
    addWalletDraftSeed(seed: string) {
      self.walletDraft.seed = seed;
    },

    createWallet() {
      if (
        self.walletDraft.pin &&
        self.walletDraft.mnemonic &&
        self.walletDraft.seed
      ) {
        self.wallet = Wallet.create({
          id: _.uniqueId(),
          pin: self.walletDraft.pin,
          mnemonic: self.walletDraft.mnemonic,
          seed: self.walletDraft.seed,
          accounts: [],
        });
        self.walletDraft = walletDraftInitialState;

        return self.wallet;
      }
    },
  }))
  .actions((self) => ({
    wipeWallet() {
      self.wallet = undefined;
    },
  }))
  .actions((self) => ({
    initializeWalletSync: flow(function* initializeWalletSync() {
      const env = getEnv(self);

      const wallet = yield env.persistence.get(
        constants.ASYNC_STORAGE_KEYS.WALLET,
      );
      self.wallet = wallet;

      autorun(() => {
        env.persistence.set(constants.ASYNC_STORAGE_KEYS.WALLET, self.wallet);
      });
    }),
  }));
