import { observer } from "mobx-react-lite";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { View } from "../components/View";

export const ChangeNetworkScreen = observer(function ChangeNetworkScreen() {
  // const [selectedNetwork, setSelectedNetwork] = useState("Mainnet");

  return (
    <Screen>
      <View flex paddingHorizontalExtraLarge paddingVerticalExtraLarge>
        <Text alignCenter>Change network</Text>

        <Spacer extraLarge />

        <NetworkItem title="Mainnet" isActive={false} onPress={() => {}} />

        <Spacer extraLarge />

        <NetworkItem title="Devnet" isActive={false} onPress={() => {}} />

        <Spacer extraLarge />

        <NetworkItem title="Testnet" isActive={false} onPress={() => {}} />

        <View flex />

        <Button withGradient />
      </View>
    </Screen>
  );
});

const NetworkItem = observer(function NetworkItem({
  title,
  isActive,
  onPress,
}: {
  title: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <View
      centerContent
      paddingMedium
      colorDarkAccentLighter
      style={{ borderRadius: 30 }}
    >
      <Text>{title}</Text>
    </View>
  );
});

{
  /* <Text>
          Mainnet: The main network where real transactions occur and have real
          value.
        </Text>

        <Spacer large />

        <Text>
          Devnet: A development network used by developers to test new features
          and applications.
        </Text>

        <Spacer large />

        <Text>
          Testnet: A testing network where developers can test their
          applications without using real cryptocurrency.
        </Text> */
}
