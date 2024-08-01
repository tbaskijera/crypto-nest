import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Button } from "../../components/Button";
import GradientIcon from "../../components/GradientIcon";
import GradientText from "../../components/GradientText";
import { Spacer } from "../../components/Spacer";
import { styleConstants as C } from "../../styleConstants";

export const BlurView = function BlurView() {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    opacity.value = withTiming(0, { duration: 500 });
  };

  return (
    <Animated.View style={[S.container, animatedStyle]}>
      <Button colorDarkAccentLighter onPress={handlePress}>
        <GradientIcon name="eye" />
        <Spacer />
        <GradientText>Reveal seed phrase</GradientText>
      </Button>
    </Animated.View>
  );
};

const S = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: C.spacingExtraLarge,
    backgroundColor: C.colorDarkAccent,
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
});
