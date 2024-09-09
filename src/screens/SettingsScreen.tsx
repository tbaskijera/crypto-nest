import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Share } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { requestAirDrop } from "../crypto";
import { usePromptYesNo } from "../hooks/usePromptYesNo";
import { useStore } from "../mobx/utils/useStore";
import { SettingsMenuItem } from "./SettingsMenuItem";
import { AccountSelectionSheet } from "../features/account-selection-sheet/AccountSelectionSheet";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { Icon } from "../components/Icon";
import { assert } from "../utils/assert";
import { LoadingModal } from "../components/LoadingModal";
import { useToast } from "../components/toast/useToast";
import { useQueryClient } from "@tanstack/react-query";

export const SettingsScreen = observer(function SettingsScreen() {
  const store = useStore();
  const navigation = useNavigation();
  const promptYesNo = usePromptYesNo();
  const toast = useToast();
  const queryClient = useQueryClient();

  const wipeWallet = store.walletStore.wipeWallet;

  const [isAccountSelectionSheetVisible, setIsAccountSelectionSheetVisible] =
    useState(false);

  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);

  assert(store.walletStore.wallet, "Wallet not found");
  assert(store.walletStore.wallet.selectedAccount, "Account not found");

  const publicKey =
    store.walletStore.wallet.selectedAccount.tokens.master.publicKey;

  assert(publicKey);

  const acc = store.walletStore.wallet.selectedAccount.title;

  return (
    <Screen>
      {isAccountSelectionSheetVisible && (
        <AccountSelectionSheet
          editMode
          setIsVisible={setIsAccountSelectionSheetVisible}
        />
      )}
      {isLoadingModalVisible && <LoadingModal />}
      <View flex paddingHorizontalLarge>
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

        <Spacer extraLarge />
        <Spacer extraLarge />

        <SettingsMenuItem
          title="View account on solscan"
          iconName="account-eye"
          onPress={() =>
            InAppBrowser.open(
              `https://explorer.solana.com/address/${publicKey}?cluster=devnet`,
            )
          }
        />

        <Spacer extraLarge />

        <SettingsMenuItem
          title="Share public address"
          iconName="share"
          onPress={() => Share.share({ message: publicKey })}
        />

        <Spacer extraLarge />

        <SettingsMenuItem
          title="Change network"
          iconName="globe-model"
          onPress={() => navigation.navigate("ChangeNetworkScreen")}
        />

        <Spacer extraLarge />

        <SettingsMenuItem
          title="Change pin"
          iconName="lock"
          onPress={() => navigation.navigate("ChangePinScreen")}
        />

        <Spacer extraLarge />

        <SettingsMenuItem
          title="Show seed phrase"
          iconName="eye"
          onPress={() => navigation.navigate("ShowSeedPhraseScreen")}
        />

        <Spacer extraLarge />

        <SettingsMenuItem
          title="Request airdrop"
          iconName="download"
          onPress={async () => {
            setIsLoadingModalVisible(true);
            try {
              const result = await requestAirDrop(publicKey);
              if (result) {
                toast.showToast("Airdrop successful!", { style: "success" });
              }
              queryClient.invalidateQueries({ queryKey: ["balance"] });
            } catch (e) {
              console.error(e);
              toast.showToast("Airdrop failed", { style: "destructive" });
            }
            setIsLoadingModalVisible(false);
          }}
        />

        <View flex />

        <SettingsMenuItem
          title="Log out and delete all data"
          iconName="logout"
          danger
          onPress={async () => {
            const result = await promptYesNo({
              title: "Log out and delete all data",
              message:
                "This will log you out and delete all data. Are you sure?",
            });

            if (result) {
              wipeWallet();
            }
          }}
        />
      </View>
    </Screen>
  );
});
