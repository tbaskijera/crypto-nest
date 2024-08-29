import * as bip39 from "bip39";
import { observer } from "mobx-react-lite";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { View } from "../components/View";
import { validateMnemonic } from "../crypto";
import { useSeedPhraseInputView } from "../features/seed-phrase-view/SeedPhraseInputView";
import { useStore } from "../mobx/utils/useStore";

export const ImportWalletScreen = observer(function ImportWalletScreen() {
  // const navigation = useNavigation();
  const store = useStore();
  const confirmSeedPhrase = store.seedPhraseStore.confirmedSeedPhrase;

  console.warn(confirmSeedPhrase);

  const { seedPhraseInputView } = useSeedPhraseInputView({ confirmSeedPhrase });

  return (
    <Screen withBottomInset>
      <View flex paddingExtraLarge>
        {seedPhraseInputView}
        <View flex />

        <Button
          title="Continue"
          disabled={confirmSeedPhrase.length !== 12}
          withGradient
          onPress={async () => {
            const mnemonic = confirmSeedPhrase.join(" ");
            const isMnemonicValid = validateMnemonic(mnemonic);
            console.warn(isMnemonicValid);

            if (isMnemonicValid) {
              const seed = await bip39.mnemonicToSeed(mnemonic);
              const parsedSeed = Buffer.from(seed).toString("hex");

              const entropy = bip39.mnemonicToEntropy(mnemonic);

              store.walletStore.addWalletDraftMnemonic({
                phrase: mnemonic,
                password: "",
                entropy: entropy,
                wordlist: {
                  locale: "en",
                },
              } as any);
              store.walletStore.addWalletDraftSeed(parsedSeed);
              // navigation.navigate("CreatePinScreen");
            } else {
              console.log("Inavlid mnemonic");
              console.warn(store.walletStore.walletDraft);
            }
          }}
        />
      </View>
    </Screen>
  );
});
