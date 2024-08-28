import { observer } from "mobx-react-lite";
import { FlatList } from "react-native";
import { Spacer } from "../../components/Spacer";
import { View } from "../../components/View";
import { styleConstants as C } from "../../styleConstants";
import { BlurView } from "./BlurView";
import { SeedPhraseItem } from "./SeedPhraseItem";

export const SeedPhraseView = observer(function SeedPhraseView({
  seedPhrase,
}: {
  seedPhrase: string[];
}) {
  return (
    <View alignSelfStretch>
      <View flex>
        <FlatList
          data={seedPhrase}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={({ item, index }) => (
            <SeedPhraseItem index={index + 1} word={item} />
          )}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ columnGap: C.spacingLarge }}
          ItemSeparatorComponent={() => <Spacer large />}
        />
      </View>

      <BlurView />
    </View>
  );
});
