import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { useStore } from "../mobx/utils/useStore";

export const ImportWalletSuccessScreen = function ImportWalletSuccessScreen() {
  const store = useStore();

  return (
    <Screen>
      <View
        flex
        justifyContentCenter
        alignItemsCenter
        paddingHorizontalExtraLarge
        paddingVerticalExtraLarge
      >
        <Text>Congratulations</Text>

        <Spacer extraLarge />

        <Text sizeSmall colorDarkAccentLight alignCenter>
          You've successfully imported and protected your wallet. Remember to
          keep your existing seed phrase safe, it's still your responsibility!
        </Text>

        <Spacer extraLarge />

        <Text sizeSmall colorDarkAccentLight alignCenter>
          CryptoNest cannot recover your wallet should you lose it.
        </Text>

        <View flex />

        <Button
          withGradient
          large
          alignSelfStretch
          title="Done"
          onPress={async () => {
            store.walletStore.createWallet();
            await store.walletStore.wallet?.generateMultipleAccounts(10);
            // At this point we should be automatically navigate to main screen, because initalizeWalletSync will be called, and therefore Router will be rendered
          }}
        />
      </View>
    </Screen>
  );
};
