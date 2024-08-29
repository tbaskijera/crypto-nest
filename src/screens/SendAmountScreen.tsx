import { observer } from "mobx-react-lite";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { Spacer } from "../components/Spacer";
import { Icon } from "../components/Icon";
import { useState } from "react";
import { TextInput } from "react-native";
import { styleConstants as C } from "../styleConstants";
import { useQuery } from "@tanstack/react-query";
import { getBalance, getSolanaPrice } from "../crypto";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../mobx/utils/useStore";

export const SendAmountScreen = observer(function SendAmountScreen() {
  const store = useStore();
  const navigation = useNavigation();
  const [amount, setAmount] = useState("0");

  const priceQuery = useQuery({
    queryKey: ["solanaPrice"],
    queryFn: getSolanaPrice,
    gcTime: 1000 * 60 * 5,
  });

  const senderAddress = store.walletStore.transaction.senderAddress;

  const balanceQuery = useQuery({
    queryKey: ["balance", { senderAddress }],
    queryFn: async () => {
      const balance = await getBalance(senderAddress);
      return balance;
    },
    enabled: senderAddress.length > 0,
  });

  const currentBalance = balanceQuery.data;
  const remainingBalance = (currentBalance as any) - parseFloat(amount);
  const isBalanceSufficient = remainingBalance >= 0;

  return (
    <Screen withBottomInset>
      <View flex paddingVerticalExtraLarge paddingHorizontalExtraLarge>
        <Text sizeLarge alignCenter>
          Amount
        </Text>

        <Spacer extraLarge />
        <Spacer extraLarge />
        <Spacer extraLarge />
        <Spacer extraLarge />

        <View
          flexDirectionRow
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <TextInput
            value={amount}
            keyboardType="numeric"
            style={{
              padding: 0,
              margin: 0,
              textAlign: "center",
              textDecorationLine: "none",
              fontSize: 40,
              lineHeight: 60,
              fontWeight: "700",
              fontFamily: "Poppins-Bold",
              color: C.colorLight,
            }}
          />

          <Spacer small />

          <Text
            style={{
              paddingTop: 4,
              fontSize: 40,
              lineHeight: 60,
              fontWeight: "700",
              fontFamily: "Poppins-Bold",
            }}
          >
            SOL
          </Text>

          <Spacer small />
        </View>
        <Spacer small />

        <Text alignCenter>
          ${(parseFloat(amount) * priceQuery.data).toFixed(2)}
        </Text>

        <Spacer large />

        {balanceQuery.data && (
          <Text
            sizeSmall
            alignCenter
            colorDarkAccentLight={isBalanceSufficient}
            colorDanger={!isBalanceSufficient}
          >
            {isBalanceSufficient
              ? `Remaining balance: ${remainingBalance.toFixed(2)} SOL`
              : "Insufficient funds"}
          </Text>
        )}

        <View flex />
        <View flexDirectionRow justifyContentSpaceBetween>
          {[1, 2, 3].map((i) => (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                minWidth: 40,
              }}
              key={i}
              onPress={() => {
                if (amount === "0") {
                  setAmount(i.toString());
                  return;
                }
                setAmount((prev) => prev + i.toString());
              }}
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
              onPress={() => {
                if (amount === "0") {
                  setAmount(i.toString());
                  return;
                }
                setAmount((prev) => prev + i.toString());
              }}
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
              onPress={() => {
                if (amount === "0") {
                  setAmount(i.toString());
                  return;
                }
                setAmount((prev) => prev + i.toString());
              }}
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
            onPress={() => {
              if (amount.includes(".")) {
                return;
              } else if (amount.length === 0) {
                setAmount("0.");
                return;
              }
              setAmount((prev) => prev + ".");
            }}
          >
            <Text weightBold style={{ fontSize: 30, lineHeight: 40 }}>
              .
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              minWidth: 40,
            }}
            onPress={() => {
              if (amount === "0") {
                return;
              }
              setAmount((prev) => prev + "0");
            }}
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
            onPress={() => {
              if (amount === "0") {
                return;
              }

              if (amount.length === 1) {
                setAmount("0");
                return;
              }

              setAmount((prev) => prev.slice(0, -1));
            }}
          >
            <Icon name="backspace" size={20} />
          </TouchableOpacity>
        </View>

        <Spacer extraLarge />
        <Spacer extraLarge />

        <Button
          withGradient
          title="Next"
          onPress={async () => {
            store.walletStore.transaction.setAmount(parseFloat(amount));
            navigation.navigate("SendingTransactionScreen");
          }}
          disabled={!isBalanceSufficient || parseFloat(amount) <= 0}
        />
      </View>
    </Screen>
  );
});
