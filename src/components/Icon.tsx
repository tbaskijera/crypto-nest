import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { styleConstants as C } from "../styleConstants";

export interface IconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color?: string;
  size?: number;
  style?: any;
}

export function Icon({
  name,
  color = C.colorLight,
  size = 24,
  style,
  ...props
}: IconProps) {
  return (
    <MaterialCommunityIcons
      name={name}
      color={color}
      size={size}
      style={style}
      {...props}
    />
  );
}
