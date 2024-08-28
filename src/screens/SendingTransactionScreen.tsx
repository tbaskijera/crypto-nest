import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import { observer } from "mobx-react-lite";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { accountFromSeed } from "../crypto/accountFromSeed";
import { makeTransaction } from "../crypto/createConnection";
import { useStore } from "../mobx/utils/useStore";
import { styleConstants as C } from "../styleConstants";
import { assert } from "../utils/assert";

export const SendingTransactionScreen = observer(
  function SendingTransactionScreen() {
    const navigation = useNavigation();
    const store = useStore();
    const queryClient = useQueryClient();

    const transaction = store.walletStore.transaction;

    const query = useQuery({
      queryKey: [""],
      queryFn: async () => {
        const senderIndex = store.walletStore.wallet?.getIndexByPublicKey(
          transaction?.senderAddress,
        );
        const parsedAccount = accountFromSeed(
          store.walletStore.wallet?.seed as any,
          senderIndex as any,
        );

        assert(parsedAccount);

        await makeTransaction({
          from: parsedAccount,
          to: transaction?.receiverAddress,
          amount: transaction?.amount,
        });
        queryClient.invalidateQueries({
          queryKey: ["balance"],
        });
      },
    });

    if (query.isPending) {
      return (
        <Screen withBottomInset withTopInset>
          <Animated.View
            exiting={FadeOut.duration(500)}
            style={{
              paddingHorizontal: C.spacingExtraLarge,
              paddingVertical: C.spacingExtraLarge,
              flex: 1,
              alignItems: "center",
            }}
          >
            <View style={{ height: 70 }} />

            <Text weightBold sizeExtraLarge alignCenter>
              Transaction is being sent!
            </Text>

            <LottieView
              autoPlay
              loop
              useNativeLooping
              duration={10000}
              source={require("../assets/animations/loading.json")}
              style={{ width: "90%", height: "90%" }}
            />
          </Animated.View>
        </Screen>
      );
    }

    return (
      <Screen withBottomInset withTopInset>
        <Animated.View
          entering={FadeIn.duration(500)}
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: C.spacingExtraLarge,
            paddingHorizontal: C.spacingExtraLarge,
          }}
        >
          <View style={{ height: 70 }} />

          <Text weightBold sizeExtraLarge alignCenter>
            Transaction sent!
          </Text>

          <LottieView
            autoPlay
            loop={false}
            source={require("../assets/animations/checkmark.json")}
            style={{ width: "75%", height: "75%" }}
          />

          <View flex />

          <Button
            alignSelfStretch
            withGradient
            title="Done"
            onPress={() =>
              navigation.navigate("MainTab", { screen: "WalletScreen" })
            }
          />
        </Animated.View>
      </Screen>
    );
  },
);
