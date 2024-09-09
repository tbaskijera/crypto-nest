import { StackActions, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "../components/Icon";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { View } from "../components/View";
import { useStore } from "../mobx/utils/useStore";
import { styleConstants as C } from "../styleConstants";
import * as LocalAuthentication from "expo-local-authentication";
import { Modal } from "../components/Modal";

export const LockScreen = observer(function LockScreen() {
  const store = useStore();
  const navigation = useNavigation();

  const [pin, setPin] = useState("");
  const [isBiometricsModalVisible, setIsBiometricsModalVisible] =
    useState(false);

  const userPin = store.walletStore.wallet?.pin;
  const shakeAnimation = useSharedValue(0);

  useEffect(() => {
    if (pin.length !== 6) return;

    if (pin === userPin) {
      navigation.dispatch(StackActions.pop(2));
    } else {
      shakeAnimation.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 }),
      );
      setPin("");
    }
  }, [navigation, pin, shakeAnimation, userPin]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeAnimation.value }],
    };
  });

  return (
    <Screen withTopInset withBottomInset>
      {isBiometricsModalVisible && <BiometricModal />}
      <View flex paddingVerticalExtraLarge paddingHorizontalExtraLarge>
        <Spacer extraLarge />

        <Text alignCenter sizeExtraLarge>
          Welcome back!
        </Text>

        <View flex />

        <Animated.View
          style={[
            {
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 20,
            },
            animatedStyle,
          ]}
        >
          {[...Array(6)].map((_, i) => {
            const isFilled = i < pin.length;
            return (
              <View
                key={i}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: isFilled ? C.colorTheme : C.colorLight,
                  borderWidth: 1,
                  borderColor: "black",
                  margin: 5,
                }}
              />
            );
          })}
        </Animated.View>

        <View flex />

        <View flexDirectionRow justifyContentSpaceBetween>
          {[1, 2, 3].map((i) => (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                minWidth: 40,
              }}
              onPress={() => setPin((prev) => prev + i.toString())}
              key={i}
            >
              <Text weightBold style={{ fontSize: 30, lineHeight: 40 }}>
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Spacer extraLarge />

        <View flexDirectionRow justifyContentSpaceBetween>
          {[4, 5, 6].map((i) => (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                minWidth: 40,
              }}
              onPress={() => setPin((prev) => prev + i.toString())}
              key={i}
            >
              <Text weightBold style={{ fontSize: 30, lineHeight: 40 }}>
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Spacer extraLarge />

        <View flexDirectionRow justifyContentSpaceBetween>
          {[7, 8, 9].map((i) => (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                minWidth: 40,
              }}
              onPress={() => setPin((prev) => prev + i.toString())}
              key={i}
            >
              <Text weightBold style={{ fontSize: 30, lineHeight: 40 }}>
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Spacer extraLarge />

        <View flexDirectionRow justifyContentSpaceBetween>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              minWidth: 40,
            }}
            onPress={() => setIsBiometricsModalVisible(true)}
          >
            <Icon name="face-recognition" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              minWidth: 40,
            }}
            onPress={() => setPin((prev) => prev + "0")}
          >
            <Text weightBold style={{ fontSize: 30, lineHeight: 40 }}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              minWidth: 40,
            }}
            onPress={() => setPin((prev) => prev.slice(0, -1))}
          >
            <Icon name="backspace" size={20} />
          </TouchableOpacity>
        </View>
        <Spacer />
        <Spacer />
        <Spacer />
      </View>
    </Screen>
  );
});

export const BiometricModal = observer(function BiometricModal() {
  const navigation = useNavigation();
  useEffect(() => {
    const authenticate = async () => {
      LocalAuthentication.hasHardwareAsync().then((hasHardware) => {
        console.log("hasHardware", hasHardware);
      });
      LocalAuthentication.supportedAuthenticationTypesAsync().then((types) => {
        console.log("types", types);
      });
      LocalAuthentication.isEnrolledAsync().then((isEnrolled) => {
        console.log("isEnrolled", isEnrolled);
      });

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
        fallbackLabel: "Use Backup",
      });

      console.warn("result", result);

      if (result.success) {
        navigation.dispatch(StackActions.pop(2));
      }
    };
    authenticate();
  }, [navigation]);

  return (
    <Modal>
      <View
        flex
        paddingExtraLarge
        style={{ backgroundColor: C.colorBackdrop }}
      />
    </Modal>
  );
});
