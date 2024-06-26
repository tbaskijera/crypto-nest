import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "./IconButton";
import { Text } from "./Text";
import { View } from "./View";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { styleConstants as C } from "../styleConstants";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

export const headerHeight = 56;

const S = StyleSheet.create({
  container: {
    backgroundColor: C.colorDark,
    paddingHorizontal: C.spacingLarge,
  },
  headerContainer: {
    height: headerHeight,
  },
  backButton: {
    height: headerHeight,
    width: headerHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeft: { position: "absolute", top: 0, left: 0, bottom: 0 },
  headerRight: { position: "absolute", top: 0, right: 0, bottom: 0 },
  titleText: {
    color: C.colorDark,
    fontSize: C.fontSizeMedium,
    fontWeight: C.fontWeightSemiBold,
    maxWidth: "70%",
  },
  absoluteLeft: { position: "absolute", left: 0 },
  absoluteRight: { position: "absolute", right: 0 },
});

type HeaderProps = NativeStackHeaderProps | BottomTabHeaderProps;

export const Header = ({ options, navigation, ...props }: HeaderProps) => {
  const canGoBack = "back" in props && !!props.back;
  const insets = useSafeAreaInsets();
  const insetTop = insets.top;

  const HeaderRight = options?.headerRight?.({ canGoBack });
  const HeaderLeft = options?.headerLeft?.({ canGoBack });
  const hasLeftComponent = !!HeaderLeft || canGoBack;
  const shouldCenterTitle = options?.headerTitleAlign === "center";
  const isHeaderTransparent = options?.headerTransparent;

  const { title } = options;

  const statusBarBackground = (
    <View
      style={{
        height: insetTop,
      }}
    />
  );

  return (
    <View
      style={[
        S.container,
        isHeaderTransparent && { backgroundColor: "transparent" },
      ]}
    >
      {statusBarBackground}
      <View
        flexDirectionRow
        justifyContentFlexEnd
        alignItemsCenter
        style={S.headerContainer}
      >
        {!shouldCenterTitle && hasLeftComponent && (
          <View style={{ width: 28 }} />
        )}
        <View flex centerContent={shouldCenterTitle}>
          <Text
            alignCenter={shouldCenterTitle}
            style={S.titleText}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <View alignItemsCenter style={S.absoluteLeft}>
          {HeaderLeft ? (
            HeaderLeft
          ) : canGoBack ? (
            <IconButton
              iconName="chevron-left"
              iconSize={28}
              iconColor={C.colorLight}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ) : null}
        </View>

        <View
          alignItemsCenter
          flexDirectionRow
          style={S.absoluteRight}
          paddingHorizontalMedium
        >
          {HeaderRight}
        </View>
      </View>
    </View>
  );
};
