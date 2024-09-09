import { Mnemonic } from "ethers";
import _ from "lodash";
import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { cast, flow, types } from "mobx-state-tree";
import { accountFromSeed, getBalance } from "../../../crypto";
import { assert } from "../../../utils/assert";
import { Account } from "../account/Account";
import { getEnv } from "../../getEnv";

export interface WalletInstance extends Instance<typeof Wallet> {}
export interface WalletSnapshotIn extends SnapshotIn<typeof Wallet> {}
export interface WalletSnapshotOut extends SnapshotOut<typeof Wallet> {}

export const Wallet = types
  .model("Wallet", {
    id: types.identifier,
    pin: types.string,
    mnemonic: types.frozen<Mnemonic>(),
    seed: types.string,
    accounts: types.array(Account),
    selectedAccountIndex: types.optional(types.number, 0),
    lastUsedIndex: types.optional(types.number, 0),
  })
  .views((self) => ({
    get accountCount() {
      return self.accounts.length;
    },

    accountByIndex(index: number) {
      return self.accounts.find((account) => account.index === index);
    },

    get selectedAccount() {
      return self.accounts.find(
        (account) => account.index === self.selectedAccountIndex,
      );
    },

    getIndexByPublicKey(publicKey: string) {
      return self.accounts.findIndex(
        (account) => account.tokens.master.publicKey === publicKey,
      );
    },
    get activeCluster() {
      const env = getEnv(self);
      return env.persistence.get("CLUSTER");
    },
  }))
  .actions((self) => ({
    selectAccount(index: number) {
      self.selectedAccountIndex = index;
    },
  }))
  .actions((self) => ({
    generateNewAccount() {
      const account = {
        id: _.uniqueId(),
        index: self.lastUsedIndex,
        title: `Account ${self.accounts.length + 1}`,
        derivationPath: "bip44Change",
        default: self.accounts.length === 0,
        tokens: {
          master: {
            publicKey: "",
            mintKey: "So11111111111111111111111111111111111111112",
          },
        },
      };

      const keyPair = accountFromSeed(self.seed, account.index);

      if (keyPair) {
        account.tokens.master.publicKey = keyPair.publicKey.toString();
        self.accounts.push(account);
        self.lastUsedIndex += 1;
        if (self.accountCount === 0) self.selectAccount(self.accountCount);
      } else {
        console.log("Error generating key pair");
        return;
      }

      return account;
    },

    renameAccount(index: number, title: string) {
      self.accounts[index].title = title;
    },

    deleteAccount(index: number) {
      self.accounts = cast(
        self.accounts.filter((account) => account.index !== index),
      );
      if (self.selectedAccountIndex === index) {
        const lowestIndexAccount = self.accounts.reduce((acc, curr) =>
          acc.index < curr.index ? acc : curr,
        );
        self.selectedAccountIndex = lowestIndexAccount.index;
      }
    },
  }))
  .actions((self) => ({
    changePin: (pin: string) => {
      self.pin = pin;
    },

    generateMultipleAccounts: flow(function* generateMultipleAccounts(
      count: number,
    ) {
      for (let i = 0; i < count; i++) {
        const generatedAccount = self.generateNewAccount();
        assert(generatedAccount, "Account not generated");

        const generatedAccountBalance = yield getBalance(
          generatedAccount.tokens.master.publicKey,
        );
        console.log(
          generatedAccount.tokens.master.publicKey,
          " ",
          generatedAccountBalance,
        );

        if (generatedAccountBalance === 0) {
          self.deleteAccount(generatedAccount.index);
        }
      }
    }),
  }));
