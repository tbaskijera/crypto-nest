import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ModalProvider } from "./src/components/ModalProvider";
import { View } from "./src/components/View";
import { Router } from "./src/navigation/Router";
import { styleConstants as C } from "./src/styleConstants";
import { AlertProvider } from "./src/components/alert-provider/AlertProvider";
import { MSTProvider } from "./src/mobx/MSTProvider";
import { RootStoreInstance } from "./src/mobx/RootStore";
import { useMSTFastRefresh } from "./src/mobx/useMSTFastRefresh";
import { reloadIfStoreInitializedTwice } from "./src/mobx/reloadIfStoreInitializedTwice";
import { initialize } from "./src/initialize";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./src/components/toast/ToastProvider";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const store = useRef<RootStoreInstance | undefined>(undefined);
  const queryClient = useRef<QueryClient | undefined>(undefined);

  useMSTFastRefresh(store);

  useEffect(() => {
    reloadIfStoreInitializedTwice(store.current);

    const init = async () => {
      const context = await initialize();
      store.current = context.store;
      queryClient.current = context.queryClient;
      await SystemUI.setBackgroundColorAsync(C.colorDark);
      store.current.walletStore.initializeWalletSync();
      setIsAppReady(true);
    };
    init();
  }, []);

  if (!isAppReady) {
    return <View flex colorDark />;
  }
  return (
    <MSTProvider store={store.current}>
      <QueryClientProvider client={queryClient.current as QueryClient}>
        <SafeAreaProvider>
          <ModalProvider>
            <AlertProvider>
              <ToastProvider>
                <StatusBar style="light" />
                <Router />
              </ToastProvider>
            </AlertProvider>
          </ModalProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </MSTProvider>
  );
}
