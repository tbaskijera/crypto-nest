import { observer } from "mobx-react-lite";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { styleConstants as C } from "../styleConstants";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useStore } from "../mobx/utils/useStore";
import { useQuery } from "@tanstack/react-query";
import { getEnv } from "../mobx/getEnv";
import { Spinner } from "../components/Spinner";
import RNRestart from "react-native-restart";

export const ChangeNetworkScreen = observer(function ChangeNetworkScreen() {
  const store = useStore();
  const [newCluster, setNewCluster] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["cluster"],
    queryFn: async () => {
      const env = getEnv(store.walletStore.wallet);
      const cluster = (await env.persistence.get("CLUSTER")) ?? "devnet";
      setNewCluster(cluster);
      return cluster;
    },
  });

  if (query.isError) {
    return (
      <Screen>
        <View centerContent>
          <Text>Error</Text>
        </View>
      </Screen>
    );
  }

  if (query.isPending) {
    return (
      <Screen>
        <View centerContent>
          <Spinner />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View flex paddingHorizontalExtraLarge paddingVerticalExtraLarge>
        <Text alignCenter>Change network</Text>

        <Spacer extraLarge />

        <NetworkItem
          title="Mainnet"
          isActive={newCluster === "mainnet"}
          onPress={() => setNewCluster("mainnet")}
        />

        <Spacer extraLarge />

        <NetworkItem
          title="Devnet"
          isActive={newCluster === "devnet"}
          onPress={() => setNewCluster("devnet")}
        />

        <Spacer extraLarge />

        <NetworkItem
          title="Testnet"
          isActive={newCluster === "testnet"}
          onPress={() => setNewCluster("testnet")}
        />

        <View flex />

        <Button
          withGradient
          title="Confirm"
          disabled={query.data === newCluster}
          onPress={() => {
            const env = getEnv(store.walletStore.wallet);
            env.persistence.set("CLUSTER", newCluster);
            RNRestart.restart();
          }}
        />
      </View>
    </Screen>
  );
});

const NetworkItem = observer(function NetworkItem({
  title,
  isActive,
  onPress,
}: {
  title: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      {isActive && (
        <LinearGradient
          style={[StyleSheet.absoluteFill, { borderRadius: 30, margin: -1 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.8, 1]}
          colors={[C.colorGradientA, C.colorGradientB, C.colorGradientC]}
        />
      )}
      <View
        centerContent
        paddingMedium
        colorDarkAccentLighter
        style={{ borderRadius: 30 }}
      >
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
});

{
  /* <Text>
          Mainnet: The main network where real transactions occur and have real
          value.
        </Text>

        <Spacer large />

        <Text>
          Devnet: A development network used by developers to test new features
          and applications.
        </Text>

        <Spacer large />

        <Text>
          Testnet: A testing network where developers can test their
          applications without using real cryptocurrency.
        </Text> */
}
