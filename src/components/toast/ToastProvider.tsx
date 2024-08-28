import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "../View";
import { styleConstants } from "../../styleConstants";
import { ToastContext } from "./ToastContext";
import { ToastItem } from "./ToastItem";

export type ToastType = {
  id: string;
  message: string | React.ReactNode | React.ReactNode[];
  options?: {
    style?: "warning" | "success" | "destructive";
    withIcon?: boolean;
  };
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastList, setToastList] = useState<ToastType[]>([]);

  const showToast = useCallback(function showToast(
    message: string,
    options?: {
      style?: "warning" | "destructive" | "success";
      withIcon?: boolean;
    },
  ) {
    const id = Math.random().toString(16).slice(-6);
    const style = options?.style ?? "success";
    const withIcon = options?.withIcon ?? false;
    return setToastList((toastList) => [
      ...toastList,
      {
        id,
        message,
        options: { style, withIcon },
      },
    ]);
  }, []);

  const onRemove = useCallback(function onRemove(id: string) {
    setToastList((toastList) => toastList.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(() => {
    return { showToast };
  }, [showToast]);

  const insets = useSafeAreaInsets();
  return (
    <ToastContext.Provider value={value}>
      {children}

      {toastList.length > 0 && (
        <View
          pointerEvents="box-none"
          paddingExtraLarge
          style={[
            S.toastWrapper,
            {
              paddingBottom: styleConstants.spacingExtraLarge + insets.bottom,
              // backgroundColor: "red",
            },
          ]}
        >
          {toastList.map((toast) => {
            return (
              <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
            );
          })}
        </View>
      )}
    </ToastContext.Provider>
  );
};

const S = StyleSheet.create({
  toastWrapper: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  },
});
