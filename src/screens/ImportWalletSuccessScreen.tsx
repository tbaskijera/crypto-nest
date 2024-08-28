import { observer } from "mobx-react-lite";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { View } from "../components/View";
import { useStore } from "../mobx/utils/useStore";

export const ImportWalletSuccessScreen = observer(
  function ImportWalletSuccessScreen() {
    const store = useStore();
    return (
      <Screen>
        <View flex>
          <Button
            onPress={() => {
              store.walletStore.createWallet();
              // store.walletStore.wallet?
            }}
            title="Done"
          />
        </View>
      </Screen>
    );
  },
);
