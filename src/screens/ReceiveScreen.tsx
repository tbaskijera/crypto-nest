import { observer } from "mobx-react-lite";
import { Screen } from "../components/Screen";
import { View } from "../components/View";
import { Text } from "../components/Text";
import QRCode from "react-native-qrcode-svg";
import "text-encoding-polyfill";
import { Spacer } from "../components/Spacer";
import { Button } from "../components/Button";
import * as Clipboard from "expo-clipboard";

export const ReceiveScreen = observer(function ReceiveScreen() {
  const keyValue = "8C816CzyG8KzEnbkyvacYP1DGceqXM8TMsbiUNsDaskV";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(keyValue);
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
          <QRCode size={200} value={keyValue} />
        </View>

        <Spacer large />

        <Text alignCenter>{keyValue}</Text>

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
