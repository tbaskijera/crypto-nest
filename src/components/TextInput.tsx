import React, { forwardRef, ReactNode, useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { styleConstants as C } from "../styleConstants";
import { Collapsible } from "./Collapsible";
import { Spacer } from "./Spacer";
import { Text } from "./Text";
import { View } from "./View";
import { LinearGradient } from "expo-linear-gradient";

const S = StyleSheet.create({
  textInput: {
    flex: 1,
    maxHeight: 100,
    height: 46,
    paddingVertical: 0,
  },
  spacer: { height: 8 },
  container: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: C.spacingLarge,
  },
});

export interface TextInputProps extends RNTextInputProps {
  sizeExtraSmall?: boolean;
  sizeSmall?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  sizeExtraLarge?: boolean;

  colorTheme?: boolean;
  colorLight?: boolean;
  colorDark?: boolean;
  colorDarkAccent?: boolean;
  colorDarkAccentLighter?: boolean;
  colorDarkAccentLight?: boolean;
  colorSuccess?: boolean;
  colorWarning?: boolean;
  colorDanger?: boolean;

  weightRegular?: boolean;
  weightMedium?: boolean;
  weightSemiBold?: boolean;
  weightBold?: boolean;
  forwardedRef?: React.Ref<RNTextInput>;

  label?: string;
  error?: boolean;
  caption?: string;

  leftComponent?: () => ReactNode;
  rightComponent?: () => ReactNode;

  containerStyle?: StyleProp<ViewStyle>;

  hasDropdown?: boolean;

  children?: ReactNode;

  screenRef?: React.RefObject<ScrollView>;

  shouldTruncate?: boolean;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      sizeExtraSmall,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      sizeExtraLarge,

      colorTheme,
      colorLight,
      colorDark,
      colorDarkAccent,
      colorDarkAccentLighter,
      colorDarkAccentLight,
      colorSuccess,
      colorWarning,
      colorDanger,

      weightRegular,
      weightMedium,
      weightSemiBold,
      weightBold,

      style,
      containerStyle,

      label,
      error = false,
      caption,

      leftComponent,
      rightComponent,

      hasDropdown,

      screenRef,

      shouldTruncate = false,

      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const { onFocus, ...otherProps } = props;

    const editable = otherProps.editable ?? true;

    let fontSize: TextStyle["fontSize"] = C.fontSizeMedium;
    if (sizeExtraSmall) fontSize = C.fontSizeExtraSmall;
    else if (sizeSmall) fontSize = C.fontSizeSmall;
    else if (sizeMedium) fontSize = C.fontSizeMedium;
    else if (sizeLarge) fontSize = C.fontSizeLarge;
    else if (sizeExtraLarge) fontSize = C.fontSizeExtraLarge;

    let color: TextStyle["color"] = C.colorLight;
    if (!editable) color = C.colorDarkAccentLighter;
    else if (colorTheme) color = C.colorTheme;
    else if (colorLight) color = C.colorLight;
    else if (colorDark) color = C.colorDark;
    else if (colorDarkAccent) color = C.colorDarkAccent;
    else if (colorDarkAccentLighter) color = C.colorDarkAccentLighter;
    else if (colorDarkAccentLight) color = C.colorDarkAccentLight;
    else if (colorSuccess) color = C.colorSuccess;
    else if (colorWarning) color = C.colorWarning;
    else if (colorDanger) color = C.colorDanger;

    let fontWeight: TextStyle["fontWeight"] = C.fontWeightRegular;
    let fontFamily: TextStyle["fontFamily"] = "Poppins-Regular"; // "OpenSans-Regular";
    if (weightRegular) {
      fontWeight = C.fontWeightRegular;
      fontFamily = "Poppins-Regular";
    } else if (weightMedium) {
      fontWeight = C.fontWeightMedium;
      fontFamily = "Poppins-Medium";
    } else if (weightSemiBold) {
      fontWeight = C.fontWeightSemiBold;
      fontFamily = "Poppins-SemiBold";
    } else if (weightBold) {
      fontWeight = C.fontWeightBold;
      fontFamily = "Poppins-Bold";
    }

    let borderColor = "transparent";
    if (error) {
      borderColor = C.colorDanger;
    }

    const backgroundColor = editable
      ? C.colorDarkAccentLighter
      : C.colorDarkAccent;

    const borderRadius = (style as any)?.borderRadius ?? 30;

    return (
      <View>
        {!!label && (
          <>
            <Text sizeSmall>{label}</Text>
            <View style={S.spacer} />
          </>
        )}
        <View>
          {isFocused && !error && (
            <LinearGradient
              style={[StyleSheet.absoluteFill, { borderRadius, margin: -1 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.8, 1]}
              colors={[C.colorGradientA, C.colorGradientB, C.colorGradientC]}
            />
          )}
          <View
            centerContent
            style={[
              S.container,
              { backgroundColor, borderColor },
              hasDropdown
                ? {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomWidth: 0,
                  }
                : { borderRadius },
              otherProps.multiline ? { paddingVertical: C.spacingSmall } : {},
              containerStyle,
            ]}
          >
            {leftComponent ? (
              <View flexDirectionRow>
                {leftComponent()}
                <Spacer small />
              </View>
            ) : null}
            <RNTextInput
              ref={ref}
              placeholderTextColor={C.colorDarkAccentLight}
              selectionColor={C.colorLight}
              onFocus={async (e) => {
                onFocus?.(e);
                setIsFocused(true);
              }}
              onEndEditing={() => setIsFocused(false)}
              style={[
                S.textInput,
                {
                  fontSize,
                  color,
                  fontWeight,
                  fontFamily,
                },
                otherProps.multiline ? { height: 54 } : {},
                style,
              ]}
              {...otherProps}
            />
            {rightComponent ? rightComponent() : null}
          </View>
        </View>
        <Collapsible collapsed={!caption}>
          <Spacer small />
          <Text sizeSmall colorDanger={error} weightRegular>
            {caption}
          </Text>
          <Spacer extraSmall />
        </Collapsible>
      </View>
    );
  },
);
