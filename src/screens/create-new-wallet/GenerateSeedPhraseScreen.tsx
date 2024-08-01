import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Spacer } from "../../components/Spacer";
import { Text } from "../../components/Text";
import { View } from "../../components/View";
import { SeedPhraseView } from "../../features/seed-phrase-view/SeedPhraseView";

export const GenerateSeedPhraseScreen = observer(
  function GenerateSeedPhraseScreen() {
    const navigation = useNavigation();

    return (
      <Screen>
        <View
          flex
          justifyContentCenter
          alignItemsCenter
          paddingHorizontalExtraLarge
          paddingVerticalExtraLarge
        >
          <Text>Write Down Your Seed Phrase</Text>

          <Spacer extraLarge />

          <Text alignCenter colorDarkAccentLight sizeSmall>
            This is your seed phrase. Write it down on a paper and keep it in a
            safe place. You'll be asked to re-enter this phrase (in order) on
            the next step.
          </Text>

          <Spacer extraLarge />

          <SeedPhraseView />

          <View flex />

          <Button
            withGradient
            large
            alignSelfStretch
            title="Next"
            onPress={() => navigation.navigate("ConfirmSeedPhraseScreen")}
          />
        </View>
      </Screen>
    );
  },
);
