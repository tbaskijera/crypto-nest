import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StyleSheet,
} from "react-native";

export const KeyboardAvoidingView = ({
  keyboardVerticalOffset,
  children,
}: {
  keyboardVerticalOffset: number;
  children: React.ReactNode;
}) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setEnabled(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setEnabled(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <RNKeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior="padding"
      // this component will be used only for platforms !== android, so we don't need to handle enabled prop here
      enabled={enabled}
      style={S.flex}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
};

const S = StyleSheet.create({
  flex: { flex: 1 },
});
