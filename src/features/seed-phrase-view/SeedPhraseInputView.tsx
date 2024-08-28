import React from "react";
import { FlatList, TextInput as RNTextInput, StyleSheet } from "react-native";
import { Spacer } from "../../components/Spacer";
import { useStore } from "../../mobx/utils/useStore";
import { styleConstants as C } from "../../styleConstants";
import { SeedPhraseInputItem } from "./SeedPhraseInputItem";

export const useSeedPhraseInputView = function useSeedPhraseInputView({
  confirmSeedPhrase,
}: {
  confirmSeedPhrase: string[];
}) {
  const store = useStore();
  const updateConfirmedSeedPhrase =
    store.seedPhraseStore.setConfirmedSeedPhrase;

  const formNavigationRefs = Array.from({ length: 12 }, () =>
    React.createRef<RNTextInput>(),
  );

  console.warn(confirmSeedPhrase);

  const seedPhraseInputView = (
    <FlatList
      data={confirmSeedPhrase}
      renderItem={({ item, index }) => (
        <SeedPhraseInputItem
          index={index}
          item={item}
          formNavigationRefs={formNavigationRefs}
          updateConfirmedSeedPhrase={updateConfirmedSeedPhrase}
        />
      )}
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={S.columnGapLarge}
      ItemSeparatorComponent={() => <Spacer large />}
      style={S.overflowVisible}
    />
  );

  return { seedPhraseInputView };
};

const S = StyleSheet.create({
  overflowVisible: {
    overflow: "visible",
  },
  columnGapLarge: {
    columnGap: C.spacingLarge,
  },
});
