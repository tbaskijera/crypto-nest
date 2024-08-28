import { observer } from "mobx-react-lite";
import { Screen } from "../components/Screen";
import { View } from "../components/View";
import { SeedPhraseView } from "../features/seed-phrase-view/SeedPhraseView";
import { Text } from "../components/Text";
import { Spacer } from "../components/Spacer";
import { useStore } from "../mobx/utils/useStore";

export const ShowSeedPhraseScreen = observer(function ShowSeedPhraseScreen() {
  const store = useStore();

  const mnemonic: any = store.walletStore.wallet?.mnemonic;
  const splitMnemonic = mnemonic.phrase.split(" ");

  return (
    <Screen withBottomInset>
      <View flex paddingExtraLarge>
        <Text alignCenter colorDarkAccentLight>
          Keep your seed phrase safe. You need it to recover your wallet.
        </Text>

        <Spacer extraLarge />

        <SeedPhraseView seedPhrase={splitMnemonic} />
      </View>
    </Screen>
  );
});
