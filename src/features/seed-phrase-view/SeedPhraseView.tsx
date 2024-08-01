import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { Spacer } from "../../components/Spacer";
import { View } from "../../components/View";
import { generateMnemonic } from "../../crypto/generateMnemonic";
import { useStore } from "../../mobx/utils/useStore";
import { styleConstants as C } from "../../styleConstants";
import { BlurView } from "./BlurView";
import { SeedPhraseItem } from "./SeedPhraseItem";
import { mnemonicToSeed } from "../../crypto/mnemonicToSeed";

export const SeedPhraseView = observer(function SeedPhraseView() {
  const store = useStore();

  const seedPhrase = store.seedPhraseStore.seedPhrase;
  const setSeedPhrase = store.seedPhraseStore.setSeedPhrase;

  const addWalletDraftMnemonic = store.walletStore.addWalletDraftMnemonic;
  const addWalletDraftSeed = store.walletStore.addWalletDraftSeed;

  useEffect(() => {
    const generateSeedPhrase = async () => {
      const mnemonic = await generateMnemonic();
      addWalletDraftMnemonic(mnemonic);

      const seed = await mnemonicToSeed(mnemonic);
      addWalletDraftSeed(seed);

      const splitMnemonic = mnemonic.phrase.split(" ");
      setSeedPhrase(splitMnemonic);
    };
    generateSeedPhrase();
  }, [addWalletDraftMnemonic, addWalletDraftSeed, setSeedPhrase]);

  console.warn(seedPhrase);

  return (
    <View alignSelfStretch>
      <View flex>
        <FlatList
          data={seedPhrase}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={({ item, index }) => (
            <SeedPhraseItem index={index + 1} word={item} />
          )}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ columnGap: C.spacingLarge }}
          ItemSeparatorComponent={() => <Spacer large />}
        />
      </View>

      <BlurView />
    </View>
  );
});
