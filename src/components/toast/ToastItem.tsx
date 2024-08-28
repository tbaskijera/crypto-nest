import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { ToastType } from "./ToastProvider";
import { useStatic } from "../../hooks/useStatic";
import { styleConstants as C } from "../../styleConstants";
import { Icon } from "../Icon";
import { View } from "../View";
import { TouchableOpacity } from "../TouchableOpacity";
import { Spacer } from "../Spacer";
import { Text } from "../Text";
import { shadow } from "../../utils/shadow";

export const ToastItem = observer(function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastType;
  onRemove: (id: string) => void;
}) {
  const isRemoving = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (isRemoving.current) return;
      isRemoving.current = true;
      exitAnimation.start(() => {
        onRemove(toast.id);
      });
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opacity = useStatic(() => new Animated.Value(0));

  const enterAnimation = useStatic(() =>
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }),
  );

  useEffect(() => {
    enterAnimation.start();
    return () => {
      enterAnimation.stop();
    };
  }, [enterAnimation]);

  const exitAnimation = useStatic(() =>
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }),
  );

  const [measuredHeight, setMeasuredHeight] = useState<undefined | number>(
    undefined,
  );
  const resolveBackgroundColor = () => {
    switch (toast.options?.style) {
      case "warning":
        return C.colorWarning;
      case "destructive":
        return C.colorDanger;
      default:
        return C.colorSuccess;
    }
  };
  const resolveIcon = () => {
    if (toast.options?.withIcon) {
      switch (toast.options?.style) {
        case "warning":
          return <Icon name="exclamation" color={C.colorWarning} size={20} />;
        case "destructive":
          return <Icon name="exclamation" color={C.colorDanger} size={20} />;
        default:
          return (
            <Icon
              name="checkbox-marked-circle"
              color={C.colorSuccess}
              size={20}
            />
          );
      }
    }
    return undefined;
  };

  resolveIcon();

  return (
    <Animated.View
      pointerEvents="box-none"
      style={{
        opacity: measuredHeight === undefined ? 0 : opacity,
        overflow: "hidden",
        position: measuredHeight === undefined ? "absolute" : "relative",
        height:
          measuredHeight === undefined
            ? undefined
            : opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, measuredHeight],
                easing: Easing.inOut(Easing.ease),
              }),
      }}
      onLayout={
        measuredHeight === undefined
          ? (event) => setMeasuredHeight(event.nativeEvent.layout.height)
          : undefined
      }
    >
      <View paddingVerticalSmall>
        <TouchableOpacity
          style={[S.view, { backgroundColor: resolveBackgroundColor() }]}
          activeOpacity={1}
          onPress={() => {
            if (isRemoving.current) return;
            isRemoving.current = true;
            exitAnimation.start(() => {
              onRemove(toast.id);
            });
          }}
          centerContent
        >
          {resolveIcon && (
            <>
              {resolveIcon()}
              <Spacer />
            </>
          )}
          <Text style={S.flex} sizeSmall weightRegular>
            {toast.message}
          </Text>
          <Spacer small />

          <Icon name="close" color={C.colorDark} size={20} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

const S = StyleSheet.create({
  flex: { flex: 1 },
  view: {
    opacity: 1,
    padding: C.spacingMedium,
    // backgroundColor: styleConstants.colorBackgroundSuccessLight,
    borderRadius: 4,
    ...shadow(2),
    flexDirection: "row",
  },
});
