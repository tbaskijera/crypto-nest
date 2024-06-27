import React, { forwardRef } from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { styleConstants as C } from "../styleConstants";

const Spinner = forwardRef<ActivityIndicator, ActivityIndicatorProps>(
  function Spinner(
    {
      size = "large",

      color = C.colorTheme,

      ...props
    }: ActivityIndicatorProps,
    ref,
  ) {
    return <ActivityIndicator ref={ref} size={size} color={color} {...props} />;
  },
);

export { Spinner };
