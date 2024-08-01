import { observer } from "mobx-react-lite";
import { Screen } from "../components/Screen";
import { View } from "../components/View";
import { Text } from "../components/Text";
import { useStore } from "../mobx/utils/useStore";

export const WalletScreen = observer(function WalletScreen() {
  const store = useStore();
  const acc = store.walletStore.wallet?.accounts[0].title;

  return (
    <Screen>
      <View flex>
        <Text>{acc}</Text>
      </View>
    </Screen>
  );
});
