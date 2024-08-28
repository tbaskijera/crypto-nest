import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { observer } from "mobx-react";
import { Button } from "../../components/Button";
import { Screen } from "../../components/Screen";
import { Spacer } from "../../components/Spacer";
import { Text } from "../../components/Text";
import { View } from "../../components/View";
import { useSeedPhraseInputView } from "../../features/seed-phrase-view/SeedPhraseInputView";
import { useAlert } from "../../hooks/useAlert";
import { useStore } from "../../mobx/utils/useStore";

export const ConfirmSeedPhraseScreen = observer(
  function ConfirmSeedPhraseScreen() {
    const store = useStore();
    const navigation = useNavigation();
    const alert = useAlert();
    const seedPhrase = store.seedPhraseStore.seedPhrase;
    const confirmSeedPhrase = store.seedPhraseStore.confirmedSeedPhrase;
    const isConfirmedSeedPhraseFull =
      store.seedPhraseStore.isConfirmedSeedPhraseFull;

    const { seedPhraseInputView } = useSeedPhraseInputView({
      confirmSeedPhrase,
    });

    return (
      <Screen>
        <View flex justifyContentCenter paddingVerticalExtraLarge>
          <View paddingHorizontalExtraLarge>
            <View alignSelfCenter>
              <Text alignCenter>Confirm Seed Phrase </Text>

              <Spacer large />

              <Text alignCenter colorDarkAccentLight sizeSmall>
                Re-enter your seed phrase in the correct order to confirm it.
              </Text>
            </View>

            <Spacer extraLarge />

            {seedPhraseInputView}
          </View>

          <View flex />

          <View paddingHorizontalExtraLarge>
            <Button
              disabled={!isConfirmedSeedPhraseFull}
              large
              withGradient
              alignSelfStretch
              title="Confirm"
              onPress={() => {
                if (_.isEqual(seedPhrase, confirmSeedPhrase)) {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "CreateNewWalletSuccessScreen" }],
                  });
                } else {
                  alert({
                    title: "Seed Phrase Mismatch",
                    message:
                      "The seed phrase you entered does not match the seed phrase you generated. Please try again.",
                  });
                }
              }}
            />
          </View>
        </View>
      </Screen>
    );
  },
);
