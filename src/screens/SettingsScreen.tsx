import { observer } from "mobx-react-lite";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { View } from "../components/View";

export const SettingsScreen = observer(function SettingsScreen() {
  return (
    <Screen>
      <View flex>
        <Text>SettingsScreen</Text>
      </View>
    </Screen>
  );
});
