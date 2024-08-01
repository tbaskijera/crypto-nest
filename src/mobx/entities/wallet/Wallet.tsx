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
    password: types.string,
    mnemonic: types.frozen<Mnemonic>(),
    seed: types.string,
    accounts: types.array(Account),
  })
  .views((self) => ({
    get accountCount() {
      return self.accounts.length;
    },
  }))
  .actions((self) => ({
    generateNewAccount() {
      const account = {
        id: _.uniqueId(),
        index: self.accounts.length,
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
      console.warn(keyPair);

      if (keyPair) {
        account.tokens.master.publicKey = keyPair.publicKey.toString();
        self.accounts.push(account);
        return true;
      } else {
        console.log("Error generating key pair");
        return false;
      }
    },
  }));
