import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ModalContext } from "./ModalContext";
import type { Content } from "./ModalContext";
import type { ReactNode } from "react";

const S = StyleSheet.create({
  kav: { position: "absolute", width: "100%", height: "100%" },
  childrenWrap: { position: "absolute", width: "100%", height: "100%" },
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [contentList, setContentList] = React.useState<Content[]>([]);

  // Create a value to pass to modal
  const actions = React.useRef({
    addContent({ uniqueId, children }: Content) {
      setContentList((list) => [...list, { uniqueId, children }]);
    },
    removeContent(uniqueId: Content["uniqueId"]) {
      setContentList((list) =>
        list.filter((item) => item.uniqueId !== uniqueId),
      );
    },
    updateContent({ uniqueId, children }: Content) {
      setContentList((list) =>
        list.map((el) => {
          if (el.uniqueId === uniqueId) {
            return { uniqueId, children };
          }
          return el;
        }),
      );
    },
  });

  return (
    <ModalContext.Provider value={actions.current}>
      {children}
      <KeyboardAvoidingView
        enabled={Platform.select({ android: false, default: true })}
        behavior="padding"
        style={S.kav}
        pointerEvents={contentList.length > 0 ? "auto" : "none"}
      >
        {contentList.map(({ children: contentChildren }, index) => {
          return (
            <View style={S.childrenWrap} key={index.toString()}>
              {contentChildren}
            </View>
          );
        })}
      </KeyboardAvoidingView>
    </ModalContext.Provider>
  );
};
