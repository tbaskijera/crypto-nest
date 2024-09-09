import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { ReactNode, useEffect, useRef } from "react";
import { AppState, NativeEventEmitter, Platform } from "react-native";
import { useStore } from "../../mobx/utils/useStore";

const NativeEvent = Platform.OS === "android" ? new NativeEventEmitter() : null;

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
      if (store.uiStore.isRequestingPermissions) return;
      if (!hasActiveWallet) return;
      console.warn(AppState.currentState);

      if (nextAppState === "inactive") {
        if (Platform.OS === "android") return;
        navigation.navigate("PrivacyScreen");
      } else {
        navigation.navigate("LockScreen");
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [hasActiveWallet, navigation, store.uiStore.isRequestingPermissions]);

  useEffect(() => {
    if (store.uiStore.isRequestingPermissions) return;
    if (Platform.OS === "ios") return;
    if (NativeEvent === null) return;
    const handleActiveState = NativeEvent.addListener(
      "ActivityStateChange",
      (e) => {
        if (e.event === "inactive") navigation.navigate("PrivacyScreen");
      },
    );
    return () => {
      handleActiveState.remove();
    };
  }, [navigation, store.uiStore.isRequestingPermissions]);

  return children;
});
