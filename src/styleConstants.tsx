import { Dimensions } from "react-native";

const window = Dimensions.get("window");

export const styleConstants = {
  windowWidth: window.width,
  windowHeight: window.height,

  colorTheme: "rgba(133, 255, 196, 1)",
  colorLight: "rgba(255, 255, 255, 1)",
  colorDark: "rgba(9, 8, 12, 1)",
  colorDarkAccent: "rgba(28, 25, 36, 1)",
  colorDarkAccentLighter: "rgba(47, 42, 60, 1)",
  colorDarkAccentLight: "rgba(166, 160, 187, 1)",
  colorSuccess: "rgba(108, 218, 156, 1)",
  colorWarning: "rgba(255, 204, 0, 1)",
  colorDanger: "rgba(255, 99, 71, 1)",

  colorGradientA: "rgba(0, 255, 163, 1)",
  colorGradientB: "rgba(3, 255, 255, 1)",
  colorGradientC: "rgba(220, 31, 255, 1)",

  spacingExtraSmall: 4,
  spacingSmall: 8,
  spacingMedium: 12,
  spacingLarge: 16,
  spacingExtraLarge: 24,

  fontSizeExtraSmall: 12,
  fontSizeSmall: 14,
  fontSizeMedium: 16,
  fontSizeLarge: 20,
  fontSizeExtraLarge: 24,

  fontWeightRegular: "400" as const,
  fontWeightMedium: "500" as const,
  fontWeightSemiBold: "600" as const,
  fontWeightBold: "700" as const,
};
