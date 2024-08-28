import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FlatList } from "react-native";
import { Icon } from "../components/Icon";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Spinner } from "../components/Spinner";
import { Text } from "../components/Text";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { TranscationItem } from "../components/TransactionListItem";
import { View } from "../components/View";
import { getHistory } from "../crypto/createConnection";
import { AccountSelectionSheet } from "../features/account-selection-sheet/AccountSelectionSheet";
import { useStore } from "../mobx/utils/useStore";

export const TransactionListScreen = observer(function TransactionListScreen() {
  const store = useStore();

  const [isAccountSelectionSheetVisible, setIsAccountSelectionSheetVisible] =
    useState(false);

  const publicKey =
    store.walletStore.wallet?.selectedAccount.tokens.master.publicKey;

  const acc = store.walletStore.wallet?.selectedAccount.title;

  const transactions = useQuery({
    queryKey: ["transactions", { publicKey }],
    queryFn: async () => await getHistory(publicKey),
    gcTime: Infinity,
  });

  if (transactions.isPending) {
    return (
      <Screen>
        <View flex>
          <Spinner />
        </View>
      </Screen>
    );
  }

  if (transactions.isError) {
    return (
      <Screen>
        <View flex>
          <Text>Error</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen preventScroll>
      {isAccountSelectionSheetVisible && (
        <AccountSelectionSheet
          editMode
          setIsVisible={setIsAccountSelectionSheetVisible}
        />
      )}
      <View paddingHorizontalLarge flex>
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

        <Spacer />

        <FlatList
          data={transactions.data}
          renderItem={({ item }) => (
            <TranscationItem key={item.signature} signature={item.signature} />
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View flex centerContent>
              <Text>No transactions to display!</Text>
            </View>
          )}
          keyExtractor={(item) => item.signature}
        />
      </View>
    </Screen>
  );
});
