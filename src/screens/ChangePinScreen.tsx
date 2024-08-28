import { useNavigation } from "@react-navigation/native";
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
import { useAlert } from "../hooks/useAlert";

export const ChangePinScreen = observer(function ChangePinScreen() {
  const store = useStore();
  const navigation = useNavigation();
  const alert = useAlert();

  const [isOldPinVisible, setIsOldPinVisible] = useState(false);
  const [isNewPinVisible, setIsNewPinVisible] = useState(false);
  const [isConfirmNewPinVisible, setIsConfirmNewPinVisible] = useState(false);

  const newPinRef = useRef<RNTextInput>(null);
  const confirmNewPinRef = useRef<RNTextInput>(null);

  const wallet = store.walletStore.wallet;

  const form = useForm({
    onSubmit: ({ values }) => {
      if (values.oldPin !== wallet?.pin) {
        alert({
          title: "Incorrect old pin",
          message: "Please enter the correct old pin",
        });
        return;
      }

      wallet?.changePin(values.newPin);
      navigation.goBack();
    },
  });

  const oldPin = useField({
    id: "oldPin",
    form,
    initialValue: "",
    validationSchema: yup
      .string()
      .required("Old pin is required")
      .length(6, "Old pin must be exactly 6 characters"),
  });

  const newPin = useField({
    id: "newPin",
    form,
    initialValue: "",
    validationSchema: yup
      .string()
      .required("New pin is required")
      .length(6, "New pin must be exactly 6 characters"),
  });

  const confirmNewPin = useField({
    id: "confirmNewPin",
    form,
    initialValue: "",
    validate: (value) => {
      if (!value) return { error: "Confirm pin is required" };
      if (value.length !== 6)
        return { error: "Pin must be exactly 6 characters" };
      if (value !== newPin.state.value) return { error: "Pins do not match" };
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
          <Text>Change pin</Text>

          <Spacer extraLarge />

          <Text alignCenter sizeSmall colorDarkAccentLight>
            This pin unlocks your CryptoNest wallet only on this device
          </Text>
        </View>

        <Spacer extraLarge />
        <Spacer extraLarge />

        <Observer>
          {() => {
            return (
              <TextInput
                placeholder="Old pin"
                value={oldPin.state.value}
                onChangeText={(value) => {
                  oldPin.actions.onChange(value);
                  if (value.length === 6) {
                    newPinRef.current?.focus();
                  }
                }}
                onFocus={oldPin.actions.onFocus}
                onBlur={oldPin.actions.onBlur}
                error={!!oldPin.computed.ifWasEverBlurredThenError}
                caption={oldPin.computed.ifWasEverBlurredThenError}
                keyboardType="number-pad"
                keyboardAppearance="dark"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isOldPinVisible}
                onSubmitEditing={() => newPinRef.current?.focus()}
                rightComponent={() => (
                  <IconButton
                    iconName={isOldPinVisible ? "eye-off" : "eye"}
                    iconColor={C.colorLight}
                    onPress={() => setIsOldPinVisible(!isOldPinVisible)}
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
                ref={newPinRef}
                placeholder="New pin"
                value={newPin.state.value}
                onChangeText={(value) => {
                  newPin.actions.onChange(value);
                  if (value.length === 6) {
                    confirmNewPinRef.current?.focus();
                  }
                }}
                onFocus={newPin.actions.onFocus}
                onBlur={newPin.actions.onBlur}
                error={!!newPin.computed.ifWasEverBlurredThenError}
                caption={newPin.computed.ifWasEverBlurredThenError}
                keyboardType="number-pad"
                keyboardAppearance="dark"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isNewPinVisible}
                onSubmitEditing={() => confirmNewPinRef.current?.focus()}
                rightComponent={() => (
                  <IconButton
                    iconName={isNewPinVisible ? "eye-off" : "eye"}
                    iconColor={C.colorLight}
                    onPress={() => setIsNewPinVisible(!isNewPinVisible)}
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
                ref={confirmNewPinRef}
                placeholder="Confirm new pin"
                value={confirmNewPin.state.value}
                onChangeText={confirmNewPin.actions.onChange}
                onFocus={confirmNewPin.actions.onFocus}
                onBlur={confirmNewPin.actions.onBlur}
                error={!!confirmNewPin.computed.ifWasEverBlurredThenError}
                caption={confirmNewPin.computed.ifWasEverBlurredThenError}
                keyboardType="number-pad"
                keyboardAppearance="dark"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isConfirmNewPinVisible}
                rightComponent={() => (
                  <IconButton
                    iconName={isConfirmNewPinVisible ? "eye-off" : "eye"}
                    iconColor={C.colorLight}
                    onPress={() =>
                      setIsConfirmNewPinVisible(!isConfirmNewPinVisible)
                    }
                  />
                )}
              />
            );
          }}
        </Observer>

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
