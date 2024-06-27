import React, { forwardRef, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from "./Spinner";
import { TouchableOpacity } from "./TouchableOpacity";
import { View } from "./View";
import { Button, ButtonProps } from "./Button";
import { Icon, IconProps } from "./Icon";
import { styleConstants as C } from "../styleConstants";

export interface IconButtonProps extends ButtonProps {
  iconName: IconProps["name"];
  iconSize?: IconProps["size"];
  iconColor?: IconProps["color"];
}

const HIT_SLOP: ButtonProps["hitSlop"] = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8,
};

export const IconButton = forwardRef<Button, IconButtonProps>(
  ({ iconName, iconSize, iconColor, onPress, ...props }, ref: any) => {
    const isMounted = React.useRef<boolean>(true);
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);
    const [isLoading, setIsLoading] = useState(false);

    return (
      <TouchableOpacity
        disabled={isLoading}
        ref={ref}
        hitSlop={HIT_SLOP}
        blockUi={false}
        onPress={(event: any) => {
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
        {...props}
      >
        <Icon name={iconName} size={iconSize} color={iconColor} />

        {isLoading && (
          <View centerContent style={StyleSheet.absoluteFill}>
            <Spinner size="small" color={C.colorDark} />
          </View>
        )}
      </TouchableOpacity>
    );
  },
);
