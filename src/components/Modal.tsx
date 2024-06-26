import React, { useRef } from "react";
import { BackHandler } from "react-native";
import { ModalContext } from "./ModalContext";
import type { ReactNode } from "react";

export interface ModalProps {
  blockHardwareBackButton?: boolean;
  children?: ReactNode;
}

export function Modal({
  children,
  blockHardwareBackButton = true,
}: ModalProps) {
  const uniqueId = useRef(Math.random().toString()).current;
  const actions = React.useContext(ModalContext);

  if (!actions) throw new Error("Trying to use Modal without ModalProvider");

  // onMount => add the content to be rendered by ModalProvider
  React.useEffect(() => {
    actions.addContent({ uniqueId, children });
    // We don't put children in deps array since it would add content on every update.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, uniqueId]);

  // onUpdate => update the content in the array
  const isFirstRender = useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    actions.updateContent({ uniqueId, children });
  }, [actions, children, uniqueId]);

  // onDestroy => clear data
  React.useEffect(() => {
    return function cleanup() {
      actions.removeContent(uniqueId);
    };
  }, [actions, uniqueId]);

  // Block back button from interfering with app
  React.useEffect(() => {
    if (!blockHardwareBackButton) return;
    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true,
    );
    return handler.remove;
  }, [blockHardwareBackButton]);

  // nothing to render - ModalProvider handles the rendering
  return null;
}
