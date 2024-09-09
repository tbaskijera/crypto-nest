import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { Button } from "../components/Button";
import GradientText from "../components/GradientText";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { View } from "../components/View";
import { styleConstants as C } from "../styleConstants";

export const WelcomeScreen = function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <Screen withTopInset withBottomInset preventScroll>
      <View
        flex
        alignItemsCenter
        paddingHorizontalExtraLarge
        paddingVerticalExtraLarge
      >
        <View flex />

        <GradientText sizeLarge style={S.titleText}>
          CryptoNest
        </GradientText>

        <View flex />

        <View alignSelfStretch>
          <MaskedView
            maskElement={
              <Button
                title="Import using seed phrase"
                large
                colorDark
                outline
                withGradient={false}
              />
            }
          >
            <LinearGradient
              colors={[C.colorGradientA, C.colorGradientB, C.colorGradientC]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Button
                large
                style={{ opacity: 0 }}
                onPress={() => {
                  navigation.navigate("ImportWalletScreen");
                }}
              />
            </LinearGradient>
          </MaskedView>

          <Spacer large />

          <Button
            withGradient
            alignSelfStretch
            title="Create a new wallet"
            onPress={() =>
              navigation.navigate("CreatePinScreen", { isImporting: false })
            }
          />
        </View>
      </View>
    </Screen>
  );
};

const S = StyleSheet.create({
  titleText: {
    fontSize: 35,
    lineHeight: 65,
  },
});
