import { observer } from "mobx-react-lite";
import { Screen } from "../components/Screen";
import { View } from "../components/View";
import { Text } from "../components/Text";
import QRCode from "react-native-qrcode-svg";
import "text-encoding-polyfill";
import { Spacer } from "../components/Spacer";
import { Button } from "../components/Button";
import * as Clipboard from "expo-clipboard";
import { useStore } from "../mobx/utils/useStore";
import { assert } from "../utils/assert";

export const ReceiveScreen = observer(function ReceiveScreen() {
  const store = useStore();

  assert(store.walletStore.wallet, "Wallet not found");
  assert(store.walletStore.wallet.selectedAccount, "Account not found");

  const publicKey =
    store.walletStore.wallet.selectedAccount.tokens.master.publicKey;

  assert(publicKey);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(publicKey);
  };

  return (
    <Screen>
      <View flex paddingHorizontalExtraLarge paddingVerticalExtraLarge>
        <Text alignCenter sizeLarge>
          Receive
        </Text>

        <View flex />

        <View
          centerContent
          colorLight
          alignSelfCenter
          style={{ borderWidth: 10, borderColor: "white", borderRadius: 12 }}
        >
          <QRCode size={200} value={publicKey} />
        </View>

        <Spacer extraLarge />

        <Text alignCenter>{publicKey}</Text>

        <View flex />

        <Button
          withGradient
          title="Copy to clipboard"
          onPress={copyToClipboard}
        />
      </View>
    </Screen>
  );
});
