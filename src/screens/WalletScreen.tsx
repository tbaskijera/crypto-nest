import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import GradientText from "../components/GradientText";
import { Icon } from "../components/Icon";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Spinner } from "../components/Spinner";
import { Text } from "../components/Text";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { View } from "../components/View";
import { getBalance, getSolanaPrice } from "../crypto/createConnection";
import { AccountSelectionSheet } from "../features/account-selection-sheet/AccountSelectionSheet";
import { useStore } from "../mobx/utils/useStore";

export const WalletScreen = observer(function WalletScreen() {
  const [isAccountSelectionSheetVisible, setIsAccountSelectionSheetVisible] =
    useState(false);
  const store = useStore();

  const navigation = useNavigation();
  const acc = store.walletStore.wallet?.selectedAccount.title;

  const priceQuery = useQuery({
    queryKey: ["solanaPrice"],
    queryFn: getSolanaPrice,
    gcTime: 1000 * 60 * 5,
  });

  const balanceQuery = useQuery({
    queryKey: ["balance", { acc }],
    queryFn: async () => {
      const balance = await getBalance(
        store.walletStore.wallet?.selectedAccount.tokens.master
          .publicKey as string,
      );
      console.warn(balance);
      return balance;
    },
  });

  return (
    <Screen withBottomInset>
      {isAccountSelectionSheetVisible && (
        <AccountSelectionSheet
          editMode={true}
          setIsVisible={setIsAccountSelectionSheetVisible}
        />
      )}
      <View flex paddingHorizontalExtraLarge>
        <TouchableOpacity
          alignSelfCenter
          flexDirectionRow
          alignItemsCenter
          onPress={() => setIsAccountSelectionSheetVisible(true)}
        >
          <Text sizeLarge>{acc}</Text>

          <Spacer />

          <Icon name="wallet" size={20} />
        </TouchableOpacity>

        <View style={{ height: 40 }} />

        <View alignItemsCenter paddingLarge>
          {balanceQuery.data !== undefined ? (
            <Text weightSemiBold style={{ fontSize: 48, lineHeight: 56 }}>
              {balanceQuery.data.toFixed(2)} SOL
            </Text>
          ) : (
            <Spinner />
          )}

          {balanceQuery.data !== undefined ? (
            <Text>${(balanceQuery.data * priceQuery.data).toFixed(2)}</Text>
          ) : (
            <Spinner />
          )}

          <Spacer large />
          <Spacer large />

          <View flexDirectionRow>
            <TouchableOpacity
              alignItemsCenter
              activeOpacity={0.5}
              onPress={() => navigation.navigate("SendScreen")}
            >
              <View
                colorDarkAccentLighter
                paddingLarge
                style={{ borderRadius: 100 }}
              >
                <Icon name="send" />
              </View>
              <Spacer />
              <GradientText>Send</GradientText>
            </TouchableOpacity>

            <Spacer extraLarge />
            <Spacer extraLarge />
            <Spacer extraLarge />

            <TouchableOpacity
              alignItemsCenter
              activeOpacity={0.5}
              onPress={() => navigation.navigate("ReceiveScreen")}
            >
              <View
                colorDarkAccentLighter
                paddingLarge
                style={{ borderRadius: 100 }}
              >
                <Icon name="application-import" />
              </View>
              <Spacer />
              <GradientText>Receive</GradientText>
            </TouchableOpacity>
          </View>
        </View>
        <View />
      </View>
    </Screen>
  );
});
