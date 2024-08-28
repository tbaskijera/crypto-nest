import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { types } from "mobx-state-tree";

export interface TransactionInstance extends Instance<typeof Transaction> {}
export interface TransactionSnapshotIn extends SnapshotIn<typeof Transaction> {}
export interface TransactionSnapshotOut
  extends SnapshotOut<typeof Transaction> {}

export const transactionInitialState = {
  senderAddress: "",
  receiverAddress: "",
  amount: 0,
};

export const Transaction = types
  .model("Transaction", {
    senderAddress: types.string,
    receiverAddress: types.string,
    amount: types.number,
  })
  .actions((self) => ({
    setSenderAddress(senderAddress: string) {
      self.senderAddress = senderAddress;
    },

    setReceiverAddress(receiverAddress: string) {
      self.receiverAddress = receiverAddress;
    },

    setAmount(amount: number) {
      self.amount = amount;
    },

    reset() {
      self.senderAddress = "";
      self.receiverAddress = "";
      self.amount = 0;
    },
  }));
