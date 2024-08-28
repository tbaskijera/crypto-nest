import { Mnemonic } from "ethers";
import { types } from "mobx-state-tree";
import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { Account } from "../account/Account";
import _ from "lodash";
import { accountFromSeed } from "../../../crypto/accountFromSeed";

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
    activeCluter: types.optional(types.string, "devnet"),
  })
  .views((self) => ({
    get accountCount() {
      return self.accounts.length;
    },

    get selectedAccount() {
      return self.accounts[self.selectedAccountIndex];
    },

    getIndexByPublicKey(publicKey: string) {
      return self.accounts.findIndex(
        (account) => account.tokens.master.publicKey === publicKey,
      );
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
        index: self.accountCount,
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
        if (self.accountCount === 0) self.selectAccount(self.accountCount);
        return true;
      } else {
        console.log("Error generating key pair");
        return false;
      }
    },

    // generateNewAccountFromSeed() {
    //   const seed = self.seed;
    // },

    renameAccount(index: number, title: string) {
      self.accounts[index].title = title;
    },

    deleteAccount(index: number) {
      self.accounts.splice(index, 1);
      if (self.selectedAccountIndex === index) {
        self.selectedAccountIndex = 0;
      }
    },

    setActiveCluster(cluster: "devnet" | "testnet" | "mainnet") {
      self.activeCluter = cluster;
    },
  }))
  .actions((self) => ({
    changePin: (pin: string) => {
      self.pin = pin;
    },
  }));
