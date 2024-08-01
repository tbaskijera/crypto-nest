import _ from "lodash";
import type { Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { cast, types } from "mobx-state-tree";

export interface SeedPhraseStoreInstance
  extends Instance<typeof SeedPhraseStore> {}
export interface SeedPhraseStoreSnapshotIn
  extends SnapshotIn<typeof SeedPhraseStore> {}
export interface SeedPhraseStoreSnapshotOut
  extends SnapshotOut<typeof SeedPhraseStore> {}

export const SeedPhraseStore = types
  .model("SeedPhraseStore", {
    seedPhrase: types.optional(types.array(types.string), [
      ...Array(12).fill(""),
    ]),
    confirmedSeedPhrase: types.optional(types.array(types.string), [
      ...Array(12).fill(""),
    ]),
  })
  .views((self) => ({
    get areSeedPhrasesEqual() {
      return _.isEqual(self.seedPhrase, self.confirmedSeedPhrase);
    },
    get isConfirmedSeedPhraseFull() {
      return self.confirmedSeedPhrase.every((word) => word !== "");
    },
  }))
  .actions((self) => ({
    setSeedPhrase(seedPhrase: string[]) {
      self.seedPhrase = cast(seedPhrase);
    },

    setConfirmedSeedPhrase(index: number, word: string) {
      self.confirmedSeedPhrase[index] = word;
    },
  }));
