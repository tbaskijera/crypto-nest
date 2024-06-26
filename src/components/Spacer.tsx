import React from "react";
import { StyleSheet } from "react-native";
import { View } from "./View";
import { styleConstants as C } from "../styleConstants";

const S = StyleSheet.create({
  spacingExtraSmall: {
    width: C.spacingExtraSmall,
    height: C.spacingExtraSmall,
  },
  spacingSmall: { width: C.spacingSmall, height: C.spacingSmall },
  spacingMedium: { width: C.spacingMedium, height: C.spacingMedium },
  spacingLarge: { width: C.spacingLarge, height: C.spacingLarge },
  spacingExtraLarge: {
    width: C.spacingExtraLarge,
    height: C.spacingExtraLarge,
  },
});

export interface SpacerProps {
  extraSmall?: boolean;
  /** extraSmall=4 small=8 medium=12 large=16 extraLarge=24  */
  small?: boolean;
  /** extraSmall=4 small=8 medium=12 large=16 extraLarge=24  */
  medium?: boolean;
  /** extraSmall=4 small=8 medium=12 large=16 extraLarge=24  */
  large?: boolean;
  /** extraSmall=4 small=8 medium=12 large=16 extraLarge=24  */
  extraLarge?: boolean;
}

export const Spacer = ({
  extraSmall,
  small,
  medium,
  large,
  extraLarge,
}: SpacerProps) => {
  let style = S.spacingMedium;
  if (extraSmall) style = S.spacingExtraSmall;
  else if (small) style = S.spacingSmall;
  else if (medium) style = S.spacingMedium;
  else if (large) style = S.spacingLarge;
  else if (extraLarge) style = S.spacingExtraLarge;

  return <View style={style} />;
};
