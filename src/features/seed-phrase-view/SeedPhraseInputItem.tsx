import { TextInput } from "../../components/TextInput";
import { View } from "../../components/View";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import { styleConstants as C } from "../../styleConstants";
import { Text } from "../../components/Text";
import { observer } from "mobx-react-lite";

export const SeedPhraseInputItem = observer(function SeedPhraseInputItem({
  item,
  index,
  formNavigationRefs,
  updateConfirmedSeedPhrase,
}: {
  item: string;
  index: number;
  formNavigationRefs: React.RefObject<RNTextInput>[];
  updateConfirmedSeedPhrase: (index: number, value: string) => void;
}) {
  return (
    <View flex>
      <TextInput
        value={item}
        ref={formNavigationRefs[index]}
        autoCapitalize="none"
        onChangeText={(value) => updateConfirmedSeedPhrase(index, value)}
        numberOfLines={1}
        style={S.borderRadius12}
        leftComponent={() => <Text colorDarkAccentLight>{index + 1}.</Text>}
        onSubmitEditing={() => {
          if (index < formNavigationRefs.length - 1) {
            formNavigationRefs[index + 1].current?.focus();
          }
        }}
      />
    </View>
  );
});

const S = StyleSheet.create({
  overflowVisible: {
    overflow: "visible",
  },
  borderRadius12: {
    borderRadius: 12,
  },
  columnGapLarge: {
    columnGap: C.spacingLarge,
  },
});
