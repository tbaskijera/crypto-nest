import React, { ReactNode } from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  ViewProps,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsKeyboardVisible } from "../hooks/useIsKeyboardVisible";
import { styleConstants as C } from "../styleConstants";
import { KeyboardAvoidingView } from "./KeyboardAvoidingView";
import { View } from "./View";

export const headerHeight = 52;

const S = StyleSheet.create({
  base: { backgroundColor: C.colorDark, flex: 1 },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: C.colorDark,
  },
  flex: { flex: 1 },
});

export type ScreenProps = (
  | ({ preventScroll?: true } & ViewProps)
  | ({ preventScroll?: false } & ScrollViewProps)
) & {
  children: ReactNode;
  colorTheme?: boolean;
  colorLight?: boolean;
  colorDark?: boolean;
  colorDarkAccent?: boolean;
  colorDarkAccentLighter?: boolean;
  colorDarkAccentLight?: boolean;
  colorSuccess?: boolean;
  colorWarning?: boolean;
  colorDanger?: boolean;
  withBottomInset?: boolean;
  withTopInset?: boolean;
};

export const Screen = React.forwardRef<ScrollView | View, ScreenProps>(
  ({ preventScroll = false, style, ...props }, ref) => {
    const insets = useSafeAreaInsets();
    const insetBottom = insets.bottom;
    const insetTop = insets.top;

    const resolveBackgroundColor = () => {
      if (props.colorTheme) return C.colorTheme;
      if (props.colorLight) return C.colorLight;
      if (props.colorDark) return C.colorDark;
      if (props.colorDarkAccent) return C.colorDarkAccent;
      if (props.colorDarkAccentLighter) return C.colorDarkAccentLighter;
      if (props.colorDarkAccentLight) return C.colorDarkAccentLight;
      if (props.colorSuccess) return C.colorSuccess;
      if (props.colorWarning) return C.colorWarning;
      if (props.colorDanger) return C.colorDanger;

      return C.colorDark;
    };

    const { isKeyboardVisible } = useIsKeyboardVisible();

    const resolvePaddingBottom = () => {
      if (isKeyboardVisible) return undefined;
      if (props.withBottomInset === false) return undefined;
      return insetBottom;
    };

    const resolvePaddingTop = () => {
      if (props.withTopInset) return insetTop;
      return undefined;
    };

    const backgroundColor = resolveBackgroundColor();
    const paddingBottom = resolvePaddingBottom();
    const paddingTop = resolvePaddingTop();

    let renderedContent;
    if (preventScroll) {
      const screenStyle = [
        S.base,
        { backgroundColor, paddingBottom, paddingTop },
        style,
      ];
      renderedContent = (
        <View ref={ref as React.Ref<View>} style={screenStyle} {...props} />
      );
    } else {
      const screenStyle = [S.base, { backgroundColor }, style];
      const contentContainerStyle = [
        S.contentContainer,
        { backgroundColor, paddingBottom, paddingTop },
      ];

      renderedContent = (
        <ScrollView
          ref={ref as React.Ref<ScrollView>}
          style={screenStyle}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="handled"
          {...props}
        />
      );
    }

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={
          props.withTopInset ? 0 : insets.top + headerHeight
        }
      >
        {renderedContent}
      </KeyboardAvoidingView>
    );
  },
);

export type Screen = typeof Screen;
