import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { ReactNode, useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useStore } from "../../mobx/utils/useStore";

export const UserActivityProvider = observer(function UserActivityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const store = useStore();
  const navigation = useNavigation();
  const appState = useRef(AppState.currentState);

  const hasActiveWallet = store.walletStore.wallet !== undefined;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (!hasActiveWallet) return;

      if (nextAppState === "inactive") {
        navigation.navigate("PrivacyScreen");
      } else {
        navigation.navigate("LockScreen");
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [hasActiveWallet, navigation]);

  return children;
});
