import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Spacer } from "../../components/Spacer";
import { Text } from "../../components/Text";
import { View } from "../../components/View";

export const CreateNewWalletSuccessScreen =
  function CreateNewWalletSuccessScreen() {
    const navigation = useNavigation();

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
            You've successfully protected your wallet. Remember to keep your
            seed phrase safe, it's your responsibility!
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
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  { name: "MainTab", params: { screen: "WalletScreen" } },
                ],
              });
            }}
          />
        </View>
      </Screen>
    );
  };
