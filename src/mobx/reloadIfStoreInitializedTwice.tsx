import { DevSettings, Platform, ToastAndroid } from "react-native";
import type { RootStoreInstance } from "./RootStore";

export function reloadIfStoreInitializedTwice(
  store: RootStoreInstance | undefined,
) {
  if (!store) return;

  if (Platform.OS === "android") {
    ToastAndroid?.show?.(
      "Store updated - Triggering app reload",
      ToastAndroid.SHORT,
    );
  }

  console.log(
    `





******************************************

  Store updated - Triggering app reload

******************************************`,
  );

  // if (Platform.OS === "web") {
  //   location.reload();
  // } else {
  //   DevSettings.reload();
  // }

  DevSettings.reload();
}
