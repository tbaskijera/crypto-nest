import React, { ReactNode, forwardRef } from "react";
import { ViewStyle } from "react-native";
import { styleConstants as C } from "../styleConstants";

export interface WithLayoutProps {
  aspectRatioOne?: boolean;

  /** paddingExtraSmall=4 paddingSmall=8 paddingMedium=12 paddingLarge=16 paddingExtraLarge=24  */
  paddingExtraSmall?: boolean;
  /** paddingExtraSmall=4 paddingSmall=8 paddingMedium=12 paddingLarge=16 paddingExtraLarge=24  */
  paddingSmall?: boolean;
  /** paddingExtraSmall=4 paddingSmall=8 paddingMedium=12 paddingLarge=16 paddingExtraLarge=24  */
  paddingMedium?: boolean;
  /** paddingExtraSmall=4 paddingSmall=8 paddingMedium=12 paddingLarge=16 paddingExtraLarge=24  */
  paddingLarge?: boolean;
  /** paddingExtraSmall=4 paddingSmall=8 paddingMedium=12 paddingLarge=16 paddingExtraLarge=24  */
  paddingExtraLarge?: boolean;
  /** paddingHorizontalExtraSmall=4 paddingHorizontalSmall=8 paddingHorizontalMedium=12 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=24  */
  paddingHorizontalExtraSmall?: boolean;
  /** paddingHorizontalExtraSmall=4 paddingHorizontalSmall=8 paddingHorizontalMedium=12 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=24  */
  paddingHorizontalSmall?: boolean;
  /** paddingHorizontalExtraSmall=4 paddingHorizontalSmall=8 paddingHorizontalMedium=12 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=24  */
  paddingHorizontalMedium?: boolean;
  /** paddingHorizontalExtraSmall=4 paddingHorizontalSmall=8 paddingHorizontalMedium=12 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=24  */
  paddingHorizontalLarge?: boolean;
  /** paddingHorizontalExtraSmall=4 paddingHorizontalSmall=8 paddingHorizontalMedium=12 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=24  */
  paddingHorizontalExtraLarge?: boolean;
  /** paddingVerticalExtraSmall=4 paddingVerticalSmall=8 paddingVerticalMedium=12 paddingVerticalLarge=16 paddingVerticalExtraLarge=24  */
  paddingVerticalExtraSmall?: boolean;
  /** paddingVerticalExtraSmall=4 paddingVerticalSmall=8 paddingVerticalMedium=12 paddingVerticalLarge=16 paddingVerticalExtraLarge=24  */
  paddingVerticalSmall?: boolean;
  /** paddingVerticalExtraSmall=4 paddingVerticalSmall=8 paddingVerticalMedium=12 paddingVerticalLarge=16 paddingVerticalExtraLarge=24  */
  paddingVerticalMedium?: boolean;
  /** paddingVerticalExtraSmall=4 paddingVerticalSmall=8 paddingVerticalMedium=12 paddingVerticalLarge=16 paddingVerticalExtraLarge=24  */
  paddingVerticalLarge?: boolean;
  /** paddingVerticalExtraSmall=4 paddingVerticalSmall=8 paddingVerticalMedium=12 paddingVerticalLarge=16 paddingVerticalExtraLarge=24  */
  paddingVerticalExtraLarge?: boolean;
  centerContent?: boolean;

  justifyContentCenter?: boolean;
  justifyContentFlexStart?: boolean;
  justifyContentFlexEnd?: boolean;
  justifyContentSpaceBetween?: boolean;
  justifyContentSpaceAround?: boolean;
  justifyContentSpaceEvenly?: boolean;

  alignItemsFlexStart?: boolean;
  alignItemsFlexEnd?: boolean;
  alignItemsCenter?: boolean;
  alignItemsStretch?: boolean;
  alignItemsBaseline?: boolean;

  alignSelfFlexStart?: boolean;
  alignSelfFlexEnd?: boolean;
  alignSelfCenter?: boolean;
  alignSelfStretch?: boolean;
  alignSelfBaseline?: boolean;

  flex?: boolean;
  flexDirectionRow?: boolean;
  flexDirectionColumn?: boolean;
  flexDirectionRowReverse?: boolean;
  flexDirectionColumnReverse?: boolean;

  absoluteTopLeft?: boolean;
  absoluteTopLeftSmall?: boolean;
  absoluteTopLeftMedium?: boolean;
  absoluteTopLeftLarge?: boolean;
  absoluteTopLeftExtraLarge?: boolean;

  absoluteTopRight?: boolean;
  absoluteTopRightSmall?: boolean;
  absoluteTopRightMedium?: boolean;
  absoluteTopRightLarge?: boolean;
  absoluteTopRightExtraLarge?: boolean;

  absoluteBottomLeft?: boolean;
  absoluteBottomLeftSmall?: boolean;
  absoluteBottomLeftMedium?: boolean;
  absoluteBottomLeftLarge?: boolean;
  absoluteBottomLeftExtraLarge?: boolean;

  absoluteBottomRight?: boolean;
  absoluteBottomRightSmall?: boolean;
  absoluteBottomRightMedium?: boolean;
  absoluteBottomRightLarge?: boolean;
  absoluteBottomRightExtraLarge?: boolean;

  colorTheme?: boolean;
  colorLight?: boolean;
  colorDark?: boolean;
  colorDarkAccent?: boolean;
  colorDarkAccentLighter?: boolean;
  colorDarkAccentLight?: boolean;
  colorSuccess?: boolean;
  colorWarning?: boolean;
  colorDanger?: boolean;

  children?: ReactNode;
}

export function withLayoutProps<Props extends { style?: any }>(
  Component: React.ComponentType<Props>,
) {
  type NewProps = Omit<Props, keyof WithLayoutProps> & WithLayoutProps;
  return forwardRef<typeof Component, NewProps>(
    (
      {
        paddingExtraSmall,
        paddingSmall,
        paddingMedium,
        paddingLarge,
        paddingExtraLarge,

        paddingHorizontalExtraSmall,
        paddingHorizontalSmall,
        paddingHorizontalMedium,
        paddingHorizontalLarge,
        paddingHorizontalExtraLarge,

        paddingVerticalExtraSmall,
        paddingVerticalSmall,
        paddingVerticalMedium,
        paddingVerticalLarge,
        paddingVerticalExtraLarge,

        centerContent,

        justifyContentCenter,
        justifyContentFlexStart,
        justifyContentFlexEnd,
        justifyContentSpaceBetween,
        justifyContentSpaceAround,
        justifyContentSpaceEvenly,

        alignItemsFlexStart,
        alignItemsFlexEnd,
        alignItemsCenter,
        alignItemsStretch,
        alignItemsBaseline,

        alignSelfFlexStart,
        alignSelfFlexEnd,
        alignSelfCenter,
        alignSelfStretch,
        alignSelfBaseline,

        flexDirectionRow,
        flexDirectionColumn,
        flexDirectionRowReverse,
        flexDirectionColumnReverse,

        absoluteTopLeft,
        absoluteTopLeftSmall,
        absoluteTopLeftMedium,
        absoluteTopLeftLarge,
        absoluteTopLeftExtraLarge,
        absoluteTopRight,
        absoluteTopRightSmall,
        absoluteTopRightMedium,
        absoluteTopRightLarge,
        absoluteTopRightExtraLarge,
        absoluteBottomLeft,
        absoluteBottomLeftSmall,
        absoluteBottomLeftMedium,
        absoluteBottomLeftLarge,
        absoluteBottomLeftExtraLarge,
        absoluteBottomRight,
        absoluteBottomRightSmall,
        absoluteBottomRightMedium,
        absoluteBottomRightLarge,
        absoluteBottomRightExtraLarge,

        colorTheme,
        colorLight,
        colorDark,
        colorDarkAccent,
        colorDarkAccentLighter,
        colorDarkAccentLight,
        colorSuccess,
        colorWarning,
        colorDanger,

        flex,
        aspectRatioOne,
        style: passThroughStyle,
        ...passThroughProps
      },
      ref,
    ) => {
      const style: ViewStyle = {};
      if (paddingExtraSmall) style.padding = C.spacingExtraSmall;
      if (paddingSmall) style.padding = C.spacingSmall;
      if (paddingMedium) style.padding = C.spacingMedium;
      if (paddingLarge) style.padding = C.spacingLarge;
      if (paddingExtraLarge) style.padding = C.spacingExtraLarge;

      if (paddingHorizontalExtraSmall)
        style.paddingHorizontal = C.spacingExtraSmall;
      if (paddingHorizontalSmall) style.paddingHorizontal = C.spacingSmall;
      if (paddingHorizontalMedium) style.paddingHorizontal = C.spacingMedium;
      if (paddingHorizontalLarge) style.paddingHorizontal = C.spacingLarge;
      if (paddingHorizontalExtraLarge)
        style.paddingHorizontal = C.spacingExtraLarge;

      if (paddingVerticalExtraSmall)
        style.paddingVertical = C.spacingExtraSmall;
      if (paddingVerticalSmall) style.paddingVertical = C.spacingSmall;
      if (paddingVerticalMedium) style.paddingVertical = C.spacingMedium;
      if (paddingVerticalLarge) style.paddingVertical = C.spacingLarge;
      if (paddingVerticalExtraLarge)
        style.paddingVertical = C.spacingExtraLarge;

      if (centerContent) {
        style.justifyContent = "center";
        style.alignItems = "center";
      }
      if (justifyContentCenter) style.justifyContent = "center";
      if (justifyContentFlexStart) style.justifyContent = "flex-start";
      if (justifyContentFlexEnd) style.justifyContent = "flex-end";
      if (justifyContentSpaceBetween) style.justifyContent = "space-between";
      if (justifyContentSpaceAround) style.justifyContent = "space-around";
      if (justifyContentSpaceEvenly) style.justifyContent = "space-evenly";

      if (alignItemsFlexStart) style.alignItems = "flex-start";
      if (alignItemsFlexEnd) style.alignItems = "flex-end";
      if (alignItemsCenter) style.alignItems = "center";
      if (alignItemsStretch) style.alignItems = "stretch";
      if (alignItemsBaseline) style.alignItems = "baseline";

      if (alignSelfFlexStart) style.alignSelf = "flex-start";
      if (alignSelfFlexEnd) style.alignSelf = "flex-end";
      if (alignSelfCenter) style.alignSelf = "center";
      if (alignSelfStretch) style.alignSelf = "stretch";
      if (alignSelfBaseline) style.alignSelf = "baseline";

      if (flexDirectionRow) style.flexDirection = "row";
      if (flexDirectionColumn) style.flexDirection = "column";
      if (flexDirectionRowReverse) style.flexDirection = "row-reverse";
      if (flexDirectionColumnReverse) style.flexDirection = "column-reverse";

      if (absoluteTopLeft) {
        style.position = "absolute";
        style.top = 0;
        style.left = 0;
      }
      if (absoluteTopLeftSmall) {
        style.position = "absolute";
        style.top = C.spacingSmall;
        style.left = C.spacingSmall;
      }
      if (absoluteTopLeftMedium) {
        style.position = "absolute";
        style.top = C.spacingMedium;
        style.left = C.spacingMedium;
      }
      if (absoluteTopLeftLarge) {
        style.position = "absolute";
        style.top = C.spacingLarge;
        style.left = C.spacingLarge;
      }
      if (absoluteTopLeftExtraLarge) {
        style.position = "absolute";
        style.top = C.spacingExtraLarge;
        style.left = C.spacingExtraLarge;
      }
      if (absoluteTopRight) {
        style.position = "absolute";
        style.top = 0;
        style.right = 0;
      }
      if (absoluteTopRightSmall) {
        style.position = "absolute";
        style.top = C.spacingSmall;
        style.right = C.spacingSmall;
      }
      if (absoluteTopRightMedium) {
        style.position = "absolute";
        style.top = C.spacingMedium;
        style.right = C.spacingMedium;
      }
      if (absoluteTopRightLarge) {
        style.position = "absolute";
        style.top = C.spacingLarge;
        style.right = C.spacingLarge;
      }
      if (absoluteTopRightExtraLarge) {
        style.position = "absolute";
        style.top = C.spacingExtraLarge;
        style.right = C.spacingExtraLarge;
      }
      if (absoluteBottomLeft) {
        style.position = "absolute";
        style.bottom = 0;
        style.left = 0;
      }
      if (absoluteBottomLeftSmall) {
        style.position = "absolute";
        style.bottom = C.spacingSmall;
        style.left = C.spacingSmall;
      }
      if (absoluteBottomLeftMedium) {
        style.position = "absolute";
        style.bottom = C.spacingMedium;
        style.left = C.spacingMedium;
      }
      if (absoluteBottomLeftLarge) {
        style.position = "absolute";
        style.bottom = C.spacingLarge;
        style.left = C.spacingLarge;
      }
      if (absoluteBottomLeftExtraLarge) {
        style.position = "absolute";
        style.bottom = C.spacingExtraLarge;
        style.left = C.spacingExtraLarge;
      }
      if (absoluteBottomRight) {
        style.position = "absolute";
        style.bottom = 0;
        style.right = 0;
      }
      if (absoluteBottomRightSmall) {
        style.position = "absolute";
        style.bottom = C.spacingSmall;
        style.right = C.spacingSmall;
      }
      if (absoluteBottomRightMedium) {
        style.position = "absolute";
        style.bottom = C.spacingMedium;
        style.right = C.spacingMedium;
      }
      if (absoluteBottomRightLarge) {
        style.position = "absolute";
        style.bottom = C.spacingLarge;
        style.right = C.spacingLarge;
      }
      if (absoluteBottomRightExtraLarge) {
        style.position = "absolute";
        style.bottom = C.spacingExtraLarge;
        style.right = C.spacingExtraLarge;
      }

      if (colorTheme) style.backgroundColor = C.colorTheme;
      if (colorLight) style.backgroundColor = C.colorLight;
      if (colorDark) style.backgroundColor = C.colorDark;
      if (colorDarkAccent) style.backgroundColor = C.colorDarkAccent;
      if (colorDarkAccentLighter)
        style.backgroundColor = C.colorDarkAccentLighter;
      if (colorDarkAccentLight) style.backgroundColor = C.colorDarkAccentLight;
      if (colorSuccess) style.backgroundColor = C.colorSuccess;
      if (colorWarning) style.backgroundColor = C.colorWarning;
      if (colorDanger) style.backgroundColor = C.colorDanger;

      if (flex) style.flex = 1;

      if (aspectRatioOne) {
        style.aspectRatio = 1;
      }

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
