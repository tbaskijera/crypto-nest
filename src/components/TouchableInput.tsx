import { observer } from "mobx-react-lite";
import { StyleSheet } from "react-native";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";

export const TouchableInput = observer(function TouchableInput({
  value,
  placeholder,
  leftComponent,
  onPress,
}: {
  value: string;
  placeholder?: string;
  leftComponent?: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      justifyContentSpaceBetween
      paddingHorizontalLarge
      flexDirectionRow
      alignItemsCenter
      colorDarkAccentLighter
      onPress={onPress}
      style={S.container}
    >
      <Text colorDarkAccentLight>
        {value !== ""
          ? truncateText(value)
          : placeholder
            ? truncateText(placeholder)
            : ""}
      </Text>
      {leftComponent}
    </TouchableOpacity>
  );
});

const truncateText = (text: string) => {
  return text.length > 25 ? text.substring(0, 25) + "..." : text;
};

const S = StyleSheet.create({
  container: {
    borderRadius: 30,
    height: 46,
    maxHeight: 100,
  },
});
