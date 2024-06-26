import { useState, useEffect } from "react";
import { Keyboard, Platform, Animated } from "react-native";

export function useIsKeyboardVisible() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",

      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [animated] = useState(
    () => new Animated.Value(isKeyboardVisible ? 1 : 0.01),
  );
  useEffect(() => {
    //Will change animated value from 0 to 1 or otherwise during 300ms
    Animated.timing(animated, {
      toValue: isKeyboardVisible ? 1 : 0.01,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardVisible, animated]);

  return {
    isKeyboardVisible,
    isKeyboardVisibleAnimated: animated,
  };
}
