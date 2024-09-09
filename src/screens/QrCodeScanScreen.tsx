import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { StyleSheet } from "react-native";
import { Screen } from "../components/Screen";
import { Text } from "../components/Text";
import { View } from "../components/View";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { useStore } from "../mobx/utils/useStore";
import { RouteProp } from "../navigation/RouterTypes";
import { useToast } from "../components/toast/useToast";

export const QrCodeScanScreen = observer(function QrCodeScanScreen() {
  const navigation = useNavigation();
  const store = useStore();
  const route = useRoute<RouteProp<"QrCodeScanScreen">>();
  const toast = useToast();
  const { onScan } = route.params;

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      store.uiStore.setIsRequestingPermissions(false);
    };

    getBarCodeScannerPermissions();
  }, [store.uiStore]);

  const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    onScan(data);
    navigation.goBack();
    toast.showToast("QR scanned successfully!", { style: "success" });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Screen withBottomInset>
      <View centerContent flex>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </Screen>
  );
});
