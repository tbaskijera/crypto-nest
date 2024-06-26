import React, { forwardRef, ReactNode } from "react";
import { TextStyle } from "react-native";
import { styleConstants as C } from "../styleConstants";

export interface WithTextProps {
  /** extraSmall=12, small=14, medium=16, large=20, extraLarge=24 */
  sizeExtraSmall?: boolean;
  /** extraSmall=12, small=14, medium=16, large=20, extraLarge=24 */
  sizeSmall?: boolean;
  /** extraSmall=12, small=14, medium=16, large=20, extraLarge=24 */
  sizeMedium?: boolean;
  /** extraSmall=12, small=14, medium=16, large=20, extraLarge=24 */
  sizeLarge?: boolean;
  /** extraSmall=12, small=14, medium=16, large=20, extraLarge=24 */
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

  /** regular=400, medium=500, semibold=600, bold=700 */
  weightRegular?: boolean;
  /** regular=400, medium=500, semibold=600, bold=700 */
  weightMedium?: boolean;
  /** regular=400, medium=500, semibold=600, bold=700 */
  weightSemiBold?: boolean;
  /** regular=400, medium=500, semibold=600, bold=700 */
  weightBold?: boolean;

  alignCenter?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignJustify?: boolean;

  underline?: boolean;
  lineThrough?: boolean;

  children?: ReactNode;
}

export function withTextProps<Props extends { style?: any }>(
  Component: React.ComponentType<Props>,
) {
  type NewProps = Omit<Props, keyof WithTextProps> & WithTextProps;
  return forwardRef<typeof Component, NewProps>(
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

        alignCenter,
        alignLeft,
        alignRight,
        alignJustify,

        underline,
        lineThrough,
        style: passThroughStyle,
        ...passThroughProps
      },
      ref,
    ) => {
      const style: TextStyle = {};
      style.fontSize = C.fontSizeMedium;
      style.lineHeight = 24;

      if (sizeExtraSmall) {
        style.fontSize = C.fontSizeExtraSmall;
        style.lineHeight = 16;
      } else if (sizeSmall) {
        style.fontSize = C.fontSizeSmall;
        style.lineHeight = 20;
      } else if (sizeMedium) {
        style.fontSize = C.fontSizeMedium;
        style.lineHeight = 24;
      } else if (sizeLarge) {
        style.fontSize = C.fontSizeLarge;
        style.lineHeight = 26;
      } else if (sizeExtraLarge) {
        style.fontSize = C.fontSizeExtraLarge;
        style.lineHeight = 36;
      }

      style.color = C.colorLight;

      if (colorTheme) style.color = C.colorTheme;
      else if (colorLight) style.color = C.colorLight;
      else if (colorDark) style.color = C.colorDark;
      else if (colorDarkAccent) style.color = C.colorDarkAccent;
      else if (colorDarkAccentLighter) style.color = C.colorDarkAccentLighter;
      else if (colorDarkAccentLight) style.color = C.colorDarkAccentLight;
      else if (colorSuccess) style.color = C.colorSuccess;
      else if (colorWarning) style.color = C.colorWarning;
      else if (colorDanger) style.color = C.colorDanger;

      style.fontWeight = C.fontWeightRegular;
      style.fontFamily = "Poppins-Regular";
      if (weightRegular) {
        style.fontWeight = C.fontWeightRegular;
        style.fontFamily = "Poppins-Regular";
      } else if (weightMedium) {
        style.fontWeight = C.fontWeightMedium;
        style.fontFamily = "Poppins-Medium";
      } else if (weightSemiBold) {
        style.fontWeight = C.fontWeightSemiBold;
        style.fontFamily = "Poppins-SemiBold";
      } else if (weightBold) {
        style.fontWeight = C.fontWeightBold;
        style.fontFamily = "Poppins-Bold";
      }

      style.textAlign = "auto";
      if (alignCenter) style.textAlign = "center";
      else if (alignLeft) style.textAlign = "left";
      else if (alignRight) style.textAlign = "right";
      else if (alignJustify) style.textAlign = "justify";

      style.textDecorationLine = "none";
      if (underline) style.textDecorationLine = "underline";
      else if (lineThrough) style.textDecorationLine = "line-through";

      return (
        <Component
          ref={ref}
          style={[style, passThroughStyle]}
          {...(passThroughProps as any)}
        />
      );
    },
  );
}
