import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useField, useForm } from "mobx-easy-form";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "react-native-get-random-values";
import "text-encoding-polyfill";
import * as yup from "yup";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { TouchableInput } from "../components/TouchableInput";
import { View } from "../components/View";
import { getBalance } from "../crypto";
import { AccountSelectionSheet } from "../features/account-selection-sheet/AccountSelectionSheet";
import { useStore } from "../mobx/utils/useStore";
import { styleConstants as C } from "../styleConstants";

export const SendScreen = observer(function SendScreen() {
  const navigation = useNavigation();

  const [isAccountSelectionSheetVisible, setIsAccountSelectionSheetVisible] =
    useState(false);

  const store = useStore();

  const form = useForm({
    onSubmit: async ({ values }) => {
      store.walletStore.transaction?.setSenderAddress(values.senderAddress);
      store.walletStore.transaction?.setReceiverAddress(values.receiverAddress);
    },
  });

  const senderAddress = useField({
    id: "senderAddress",
    form,
    initialValue: "",
    validationSchema: yup.string().required(),
  });

  const receiverAddress = useField({
    id: "receiverAddress",
    form,
    initialValue: "",
    validationSchema: yup.string().required("Receiver address is required"),
  });

  const balanceQuery = useQuery({
    queryKey: ["balance", { senderAddress }],
    queryFn: async () => {
      const balance = await getBalance(senderAddress.state.value);
      console.warn(balance);
      return balance;
    },
    enabled: senderAddress.state.value.length > 0,
  });

  return (
    <Screen withBottomInset>
      {isAccountSelectionSheetVisible && (
        <AccountSelectionSheet
          setPickerOption={senderAddress.actions.onChange}
          setIsVisible={setIsAccountSelectionSheetVisible}
        />
      )}
      <View flex paddingHorizontalExtraLarge paddingVerticalExtraLarge>
        <TouchableInput
          value={senderAddress.state.value}
          placeholder="Sender address"
          leftComponent={<Icon name="chevron-down" />}
          onPress={() => setIsAccountSelectionSheetVisible(true)}
        />

        {balanceQuery.data && (
          <View paddingHorizontalMedium paddingVerticalSmall>
            <Text sizeSmall colorDarkAccentLight>
              Current balance: {balanceQuery.data.toFixed(2)} SOL
            </Text>
          </View>
        )}

        <Spacer extraLarge />

        <TextInput
          placeholder="Receiver address"
          value={receiverAddress.state.value}
          onChangeText={receiverAddress.actions.onChange}
          onFocus={receiverAddress.actions.onFocus}
          onBlur={receiverAddress.actions.onBlur}
          error={!!receiverAddress.computed.ifWasEverBlurredThenError}
          caption={receiverAddress.computed.ifWasEverBlurredThenError}
          keyboardAppearance="dark"
          autoCapitalize="none"
          autoCorrect={false}
          rightComponent={() => (
            <IconButton
              iconName="qrcode-scan"
              iconColor={C.colorLight}
              onPress={() => {
                store.uiStore.setIsRequestingPermissions(true);
                navigation.navigate("QrCodeScanScreen", {
                  onScan: (data: string) => {
                    receiverAddress.actions.onChange(data);
                  },
                });
              }}
            />
          )}
        />

        <View flex />
        <Button
          withGradient
          title="Next"
          disabled={form.computed.isError}
          onPress={async () => {
            await form.actions.submit();
            navigation.navigate("SendAmountScreen");
          }}
        />
      </View>
    </Screen>
  );
});
