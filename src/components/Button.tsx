import React, { ReactNode, forwardRef, useEffect, useState } from "react";
import { StyleSheet, TextStyle, TouchableWithoutFeedback } from "react-native";
import { Spacer } from "./Spacer";
import { Spinner } from "./Spinner";
import { Text } from "./Text";
import { TouchableOpacity, TouchableOpacityProps } from "./TouchableOpacity";
import { View } from "./View";
import { LinearGradient } from "expo-linear-gradient";
import { styleConstants as C } from "../styleConstants";
import { Modal } from "./Modal";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  outline?: boolean;
  transparent?: boolean;
  colorTheme?: boolean;
  colorLight?: boolean;
  colorDark?: boolean;
  colorDarkAccent?: boolean;
  colorDarkAccentLighter?: boolean;
  colorDarkAccentLight?: boolean;
  colorSuccess?: boolean;
  colorWarning?: boolean;
  colorDanger?: boolean;

  withGradient?: boolean;

  hasShadow?: boolean;

  children?: ReactNode;
  onPress?:
    | TouchableOpacityProps["onPress"]
    | ((...args: any[]) => Promise<any>);
  blockUi?: boolean;
}
export type Button = typeof Button;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      title,

      small = false,
      medium = false,
      large = false,

      outline = false,
      transparent = false,

      colorTheme,
      colorLight,
      colorDark,
      colorDarkAccent,
      colorDarkAccentLighter,
      colorDarkAccentLight,
      colorSuccess,
      colorWarning,
      colorDanger,
      withGradient = false,

      hasShadow = false,

      style: inheritedStyle,
      disabled,
      children,
      onPress,
      blockUi = true,
      ...props
    },
    ref,
  ) => {
    const isMounted = React.useRef<boolean>(true);
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    const shouldRenderTitle = typeof title === "string";

    const resolveBackgroundColor = () => {
      if (withGradient) return "transparent";
      if (outline) return "transparent";
      if (transparent) return "transparent";

      if (disabled) return C.colorDarkAccentLighter;
      else if (colorTheme) return C.colorTheme;
      else if (colorLight) return C.colorLight;
      else if (colorDark) return C.colorDark;
      else if (colorDarkAccent) return C.colorDarkAccent;
      else if (colorDarkAccentLighter) return C.colorDarkAccentLighter;
      else if (colorDarkAccentLight) return C.colorDarkAccentLight;
      else if (colorSuccess) return C.colorSuccess;
      else if (colorWarning) return C.colorWarning;
      else if (colorDanger) return C.colorDanger;

      return C.colorTheme;
    };

    const resolveHeight = () => {
      if (small) return 32;
      if (medium) return 40;
      if (large) return 48;
      return 48;
    };

    const resolveTextStyle = () => {
      const style: TextStyle = {};
      if (small) style.fontSize = C.fontSizeExtraSmall;
      if (large) style.fontSize = C.fontSizeMedium;
      else style.fontSize = C.fontSizeMedium;

      if (disabled) style.color = C.colorDarkAccentLighter;
      else if (outline || transparent) {
        if (colorTheme) style.color = C.colorTheme;
        else if (colorLight) style.color = C.colorLight;
        else if (colorDark) style.color = C.colorDark;
        else if (colorDarkAccent) style.color = C.colorDarkAccent;
        else if (colorDarkAccentLighter) style.color = C.colorDarkAccentLighter;
        else if (colorDarkAccentLight) style.color = C.colorDarkAccentLight;
        else if (colorSuccess) style.color = C.colorSuccess;
        else if (colorWarning) style.color = C.colorWarning;
        else if (colorDanger) style.color = C.colorDanger;
      } else {
        style.color = C.colorDark;
      }
      style.color = C.colorDark;

      return style;
    };

    const resolveBorderColor = () => {
      if (withGradient) return "transparent";
      if (outline) return resolveTextStyle().color;
      if (transparent) return "transparent";
      if (disabled) return C.colorDarkAccentLighter;
      if (colorTheme) return C.colorTheme;
      if (colorLight) return C.colorLight;
      if (colorDark) return C.colorDark;
      if (colorDarkAccent) return C.colorDarkAccent;
      if (colorDarkAccentLighter) return C.colorDarkAccentLighter;
      if (colorDarkAccentLight) return C.colorDarkAccentLight;
      if (colorSuccess) return C.colorSuccess;
      if (colorWarning) return C.colorWarning;
      if (colorDanger) return C.colorDanger;
      return C.colorTheme;
    };

    const [isLoading, setIsLoading] = useState(false);

    const borderRadius = 24; // shared between the button and the spinner overlay
    const style: TouchableOpacityProps["style"] = {
      flexDirection: "row",
      justifyContent: "center", // ideja kod dodavanja ikona -> children != null ? "flex-start" : "center"
      alignItems: "center",
      backgroundColor: resolveBackgroundColor(),
      borderColor: resolveBorderColor(),
      borderWidth: 1,
      height: resolveHeight(),
      paddingHorizontal: C.spacingMedium,
      borderRadius,
      opacity: isLoading ? 0.5 : 1,
    };

    const textStyle = resolveTextStyle();

    return (
      <>
        <TouchableOpacity
          ref={ref}
          style={[style, inheritedStyle]}
          onPress={(event) => {
            if (typeof onPress === "function") {
              const maybePromise = onPress(event);

              if (maybePromise && typeof maybePromise.then === "function") {
                setIsLoading(true);
                maybePromise.finally(
                  () => isMounted.current && setIsLoading(false),
                );
              }
            }
          }}
          disabled={isLoading || disabled}
          {...props}
        >
          <>
            {withGradient && (
              <LinearGradient
                style={[
                  StyleSheet.absoluteFill,
                  { borderRadius: borderRadius },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[C.colorGradientA, C.colorGradientB, C.colorGradientC]}
              />
            )}
            {children}
            {Boolean(children && shouldRenderTitle) && <Spacer small />}
            {shouldRenderTitle && (
              <Text numberOfLines={1} weightMedium style={textStyle}>
                {title}
              </Text>
            )}
          </>

          {isLoading && (
            <View
              centerContent
              style={{ ...StyleSheet.absoluteFillObject, borderRadius }}
            >
              <Spinner size="small" color={C.colorDark} />
            </View>
          )}
        </TouchableOpacity>

        {Boolean(blockUi && isLoading) && (
          <Modal blockHardwareBackButton>
            <TouchableWithoutFeedback>
              <View flex />
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </>
    );
  },
);
