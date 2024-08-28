import LottieView from "lottie-react-native";
import { observer } from "mobx-react-lite";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { styleConstants as C } from "../styleConstants";
import { Modal } from "./Modal";
import { View } from "./View";

export const LoadingModal = observer(function LoadingModal() {
  return (
    <Modal>
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
        style={{
          paddingHorizontal: C.spacingExtraLarge,
          paddingVertical: C.spacingExtraLarge,
          flex: 1,
          alignItems: "center",
          backgroundColor: C.colorBackdrop,
        }}
      >
        <View style={{ height: 70 }} />

        <LottieView
          autoPlay
          loop
          useNativeLooping
          duration={10000}
          source={require("../assets/animations/loading.json")}
          style={{ width: "90%", height: "90%" }}
        />
      </Animated.View>
    </Modal>
  );
});
