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

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const store = useRef<RootStoreInstance | undefined>(undefined);

  useMSTFastRefresh(store);

  useEffect(() => {
    reloadIfStoreInitializedTwice(store.current);

    const init = async () => {
      const context = await initialize();
      store.current = context.store;
      await SystemUI.setBackgroundColorAsync(C.colorDark);
      setIsAppReady(true);
    };
    init();
  }, []);

  if (!isAppReady) {
    return <View flex colorDark />;
  }
  return (
    <MSTProvider store={store.current}>
      <SafeAreaProvider>
        <ModalProvider>
          <AlertProvider>
            <StatusBar style="light" />
            <Router />
          </AlertProvider>
        </ModalProvider>
      </SafeAreaProvider>
    </MSTProvider>
  );
}
