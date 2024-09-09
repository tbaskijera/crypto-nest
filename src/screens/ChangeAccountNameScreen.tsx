import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { RouteProp } from "../navigation/RouterTypes";
import { useStore } from "../mobx/utils/useStore";
import { assert } from "../utils/assert";
import { useState } from "react";
import { TextInput } from "../components/TextInput";

export const ChangeAccountNameScreen = observer(
  function ChangeAccountNameScreen() {
    const navigation = useNavigation();
    const store = useStore();
    const route = useRoute<RouteProp<"ChangeAccountNameScreen">>();
    const [accountName, setAccountName] = useState("");

    const { accountIndex } = route.params;

    const account = store.walletStore.wallet?.accountByIndex(accountIndex);

    assert(account);

    return (
      <Screen withBottomInset>
        <View flex paddingHorizontalExtraLarge paddingVerticalExtraLarge>
          <View>
            <Text alignCenter>Change account name</Text>

            <Spacer extraLarge />
            <Spacer extraLarge />
            <Spacer extraLarge />

            <View flexDirectionRow>
              <Text>Current name:</Text>
              <Spacer />
              <Text colorSuccess>{account.title}</Text>
            </View>

            <Spacer extraLarge />

            <Text>New name:</Text>

            <Spacer large />

            <TextInput
              value={accountName}
              onChangeText={setAccountName}
              placeholder="Enter new account name"
            />
          </View>

          <View flex />

          <Button
            disabled={!accountName}
            withGradient
            large
            alignSelfStretch
            title="Confirm"
            onPress={() => {
              account.changeAccountName(accountName);
              navigation.goBack();
            }}
          />
        </View>
      </Screen>
    );
  },
);
