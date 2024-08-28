import { useNavigation, useRoute } from "@react-navigation/native";
import { useField, useForm } from "mobx-easy-form";
import { Observer, observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import * as yup from "yup";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View } from "../components/View";
import { useStore } from "../mobx/utils/useStore";
import { styleConstants as C } from "../styleConstants";
import { RouteProp } from "../navigation/RouterTypes";

export const CreatePinScreen = observer(function CreatePinScreen() {
  const store = useStore();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<"CreatePinScreen">>();
  const { isImporting } = route.params;

  // const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [isConfirmPinVisible, setIsConfirmPinVisible] = useState(false);

  const confirmPinRef = useRef<RNTextInput>(null);

  const form = useForm({
    onSubmit: ({ values }) => {
      store.walletStore.addWalletDraftPin(values.pin);

      if (isImporting) {
        navigation.navigate("ImportWalletSuccessScreen");
        return;
      }
      navigation.navigate("GenerateSeedPhraseScreen");
    },
  });

  const pin = useField({
    id: "pin",
    form,
    initialValue: "",
    validationSchema: yup
      .string()
      .required("Pin is required")
      .length(6, "Pin must be exactly 6 characters"),
  });

  const confirmPin = useField({
    id: "confirmPin",
    form,
    initialValue: "",
    validate: (value) => {
      if (!value) return { error: "Confirm pin is required" };
      if (value.length !== 6)
        return { error: "Pin must be exactly 6 characters" };
      if (value !== pin.state.value) return { error: "Pins do not match" };
      return { parsed: value };
    },
  });

  return (
    <Screen>
      <View
        flex
        justifyContentCenter
        paddingHorizontalExtraLarge
        paddingVerticalExtraLarge
      >
        <View alignItemsCenter>
          <Text>Create pin</Text>

          <Spacer extraLarge />

          <Text alignCenter sizeSmall colorDarkAccentLight>
            This pin will unlock your CryptoNest wallet only on this device
          </Text>
        </View>

        <Spacer extraLarge />
        <Spacer extraLarge />

        <Observer>
          {() => {
            return (
              <TextInput
                placeholder="Pin"
                value={pin.state.value}
                onChangeText={(value) => {
                  pin.actions.onChange(value);
                  if (value.length === 6) {
                    confirmPinRef.current?.focus();
                  }
                }}
                onFocus={pin.actions.onFocus}
                onBlur={pin.actions.onBlur}
                error={!!pin.computed.ifWasEverBlurredThenError}
                caption={pin.computed.ifWasEverBlurredThenError}
                keyboardType="number-pad"
                keyboardAppearance="dark"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isPinVisible}
                onSubmitEditing={() => confirmPinRef.current?.focus()}
                rightComponent={() => (
                  <IconButton
                    iconName={isPinVisible ? "eye-off" : "eye"}
                    iconColor={C.colorLight}
                    onPress={() => setIsPinVisible(!isPinVisible)}
                  />
                )}
              />
            );
          }}
        </Observer>
        <Spacer extraLarge />
        <Observer>
          {() => {
            return (
              <TextInput
                ref={confirmPinRef}
                placeholder="Confirm pin"
                value={confirmPin.state.value}
                onChangeText={confirmPin.actions.onChange}
                onFocus={confirmPin.actions.onFocus}
                onBlur={confirmPin.actions.onBlur}
                error={!!confirmPin.computed.ifWasEverBlurredThenError}
                caption={confirmPin.computed.ifWasEverBlurredThenError}
                keyboardType="number-pad"
                keyboardAppearance="dark"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isConfirmPinVisible}
                rightComponent={() => (
                  <IconButton
                    iconName={isConfirmPinVisible ? "eye-off" : "eye"}
                    iconColor={C.colorLight}
                    onPress={() => setIsConfirmPinVisible(!isConfirmPinVisible)}
                  />
                )}
              />
            );
          }}
        </Observer>

        {/* <View flexDirectionRow justifyContentSpaceBetween alignItemsCenter>
          <Text>Sign in with Face ID?</Text>

          <Switch
            value={isFaceIdEnabled}
            onValueChange={setIsFaceIdEnabled}
            trackColor={{
              false: C.colorDarkAccentLighter,
              true: C.colorTheme,
            }}
            thumbColor={C.colorLight}
          />
        </View> */}

        <View flex />

        <Button
          withGradient
          disabled={form.computed.isError}
          large
          alignSelfStretch
          title="Next"
          onPress={() => form.actions.submit()}
        />
      </View>
    </Screen>
  );
});
