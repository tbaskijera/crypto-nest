import { observer } from "mobx-react-lite";
import { View } from "../components/View";
import GradientText from "../components/GradientText";
import { StyleSheet } from "react-native";

export const PrivacyScreen = observer(function PrivacyScreen() {
  return (
    <View flex colorDark centerContent>
      <GradientText sizeLarge style={S.titleText}>
        CryptoNest
      </GradientText>
    </View>
  );
});

const S = StyleSheet.create({
  titleText: {
    fontSize: 35,
    lineHeight: 65,
  },
});
