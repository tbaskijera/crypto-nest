import { useNavigation } from "@react-navigation/native";
import { useField, useForm } from "mobx-easy-form";
import { useRef, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import * as yup from "yup";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Spacer } from "../../components/Spacer";
import { Text } from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import { View } from "../../components/View";
import { IconButton } from "../../components/IconButton";
import { styleConstants as C } from "../../styleConstants";
import { Observer, observer } from "mobx-react-lite";
import { useStore } from "../../mobx/utils/useStore";

export const CreatePasswordScreen = observer(function CreatePasswordScreen() {
  const store = useStore();
  const navigation = useNavigation();
  // const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const confirmPasswordRef = useRef<RNTextInput>(null);

  const form = useForm({
    onSubmit: ({ values }) => {
      store.walletStore.addWalletDraftPassword(values.password);
      navigation.navigate("GenerateSeedPhraseScreen");
    },
  });

  const password = useField({
    id: "password",
    form,
    initialValue: "",
    validationSchema: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const confirmPassword = useField({
    id: "confirmPassword",
    form,
    initialValue: "",
    validate: (value) => {
      if (!value) return { error: "Confirm password is required" };
      if (value.length < 6)
        return { error: "Password must be at least 6 characters" };
      if (value !== password.state.value)
        return { error: "Passwords do not match" };
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
          <Text>Create password</Text>

          <Spacer extraLarge />

          <Text alignCenter sizeSmall colorDarkAccentLight>
            This password will unlock your CryptoNest wallet only on this device
          </Text>
        </View>

        <Spacer extraLarge />
        <Spacer extraLarge />

        <Observer>
          {() => {
            return (
              <TextInput
                placeholder="Password"
                value={password.state.value}
                onChangeText={password.actions.onChange}
                onFocus={password.actions.onFocus}
                onBlur={password.actions.onBlur}
                error={!!password.computed.ifWasEverBlurredThenError}
                caption={password.computed.ifWasEverBlurredThenError}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isPasswordVisible}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                rightComponent={() => (
                  <IconButton
                    iconName={isPasswordVisible ? "eye-off" : "eye"}
                    iconColor={C.colorLight}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
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
                placeholder="Confirm password"
                value={confirmPassword.state.value}
                onChangeText={confirmPassword.actions.onChange}
                onFocus={confirmPassword.actions.onFocus}
                onBlur={confirmPassword.actions.onBlur}
                error={!!confirmPassword.computed.ifWasEverBlurredThenError}
                caption={confirmPassword.computed.ifWasEverBlurredThenError}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isConfirmPasswordVisible}
                rightComponent={() => (
                  <IconButton
                    iconName={isConfirmPasswordVisible ? "eye-off" : "eye"}
                    iconColor={C.colorLight}
                    onPress={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
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
