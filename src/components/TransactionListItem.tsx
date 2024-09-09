import { observer } from "mobx-react-lite";
import { useStore } from "../mobx/utils/useStore";
import { useQuery } from "@tanstack/react-query";
import { getSolanaPrice, getTransaction } from "../crypto";
import { View } from "./View";
import { Text } from "./Text";
import { processTransaction } from "../processTransaction";
import dayjs from "dayjs";
import { Icon } from "./Icon";
import { Spacer } from "./Spacer";
import Animated, { FadeIn } from "react-native-reanimated";
import { styleConstants as C } from "../styleConstants";
import { assert } from "../utils/assert";

export const TranscationItem = observer(function TranscationItem({
  signature,
}: {
  signature: string;
}) {
  const store = useStore();
  const query = useQuery({
    queryKey: ["transaction", signature],
    queryFn: async () => await getTransaction(signature),
    gcTime: Infinity,
  });

  const priceQuery = useQuery({
    queryKey: ["solanaPrice"],
    queryFn: getSolanaPrice,
  });

  if (query.isPending) {
    return null;
  }

  if (query.isError) {
    return null;
  }

  assert(store.walletStore.wallet, "Wallet not found");
  assert(store.walletStore.wallet.selectedAccount, "Account not found");

  const transaction = processTransaction(
    query.data,
    store.walletStore.wallet.selectedAccount.tokens.master.publicKey,
  );

  const { amount, date_time: dateTime, type } = transaction;
  const isReceived = type === "Received";

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      style={{
        flexDirection: "row",
        paddingVertical: C.spacingLarge,
        justifyContent: "space-between",
      }}
    >
      <View flexDirectionRow alignItemsCenter>
        <Icon name={isReceived ? "wallet-plus-outline" : "send"} size={36} />
        <Spacer large />
        <View>
          <Text sizeSmall colorDarkAccentLight>
            {dayjs(dateTime).format("MMM DD, YYYY [at] HH:mm:ss")}
          </Text>
          <Text sizeLarge weightBold>
            {isReceived ? "Receive" : "Send"}
          </Text>
        </View>
      </View>

      <View>
        <Text sizeSmall>{amount.toFixed(2)} SOL</Text>
        <Text sizeSmall>${(amount * priceQuery.data).toFixed(2)}</Text>
      </View>
    </Animated.View>
  );
});
