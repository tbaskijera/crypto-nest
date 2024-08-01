import { StyleSheet } from "react-native";
import { View } from "../../components/View";
import { styleConstants as C } from "../../styleConstants";
import { Text } from "../../components/Text";

export const SeedPhraseItem = function SeedPhraseItem({
  index,
  word,
}: {
  index: number;
  word: string;
}) {
  return (
    <View
      flex
      colorDarkAccentLighter
      // alignItemsCenter
      paddingMedium
      style={S.seedPhraseItem}
    >
      <View flexDirectionRow>
        <Text colorDarkAccentLight style={{ fontSize: 0.04 * C.windowWidth }}>
          {index}.{" "}
        </Text>
        <View flex alignItemsCenter>
          <Text numberOfLines={1} style={{ fontSize: 0.04 * C.windowWidth }}>
            {word}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const S = StyleSheet.create({
  seedPhraseItem: {
    borderRadius: 12,
  },
});
