import type { NavigationContainerProps } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Fragment } from "react";
import { Header } from "../components/Header";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { ConfirmSeedPhraseScreen } from "../screens/create-new-wallet/ConfirmSeedPhraseScreen";
import { CreateNewWalletSuccessScreen } from "../screens/create-new-wallet/CreateNewWalletSuccessScreen";
import { CreatePinScreen } from "../screens/CreatePinScreen";
import { GenerateSeedPhraseScreen } from "../screens/create-new-wallet/GenerateSeedPhraseScreen";
import { BottomTabs } from "./BottomTabs";
import { TopLevelStackParams } from "./RouterTypes";
import { useStore } from "../mobx/utils/useStore";
import { observer } from "mobx-react-lite";
import { ChangePinScreen } from "../screens/ChangePinScreen";
import { ChangeNetworkScreen } from "../screens/ChangeNetworkScreen";
import { ReceiveScreen } from "../screens/ReceiveScreen";
import { SendScreen } from "../screens/SendScreen";
import { PrivacyScreen } from "../screens/PrivacyScreen";
import { UserActivityProvider } from "../features/user-activity-provider/UserActivityProvider";
import { LockScreen } from "../screens/LockScreen";
import { SendAmountScreen } from "../screens/SendAmountScreen";
import { SendingTransactionScreen } from "../screens/SendingTransactionScreen";
import { ShowSeedPhraseScreen } from "../screens/ShowSeedPhraseScreen";
import { ImportWalletScreen } from "../screens/ImportWalletScreen";
import { ImportWalletSuccessScreen } from "../screens/ImportWalletSuccessScreen";
import { ChangeAccountNameScreen } from "../screens/ChangeAccountNameScreen";
import { QrCodeScanScreen } from "../screens/QrCodeScanScreen";

export interface RouterProps {
  navigationContainerProps: Partial<NavigationContainerProps>;
  shouldShowUpdateScreen: boolean;
}

const Stack = createNativeStackNavigator<TopLevelStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_right",
  animationDuration: 100,
  header: (props) => <Header {...props} />,
};

export const Router = observer(function Router() {
  const store = useStore();
  const hasActiveWallet = store.walletStore.wallet !== undefined;

  return (
    <NavigationContainer>
      <UserActivityProvider>
        <Stack.Navigator screenOptions={screenOptions}>
          {!hasActiveWallet ? (
            <Fragment>
              <Stack.Screen name={"WelcomeScreen"} component={WelcomeScreen} options={{ headerShown: false }} />

              <Stack.Screen name="CreatePinScreen" component={CreatePinScreen} />
              <Stack.Screen name="GenerateSeedPhraseScreen" component={GenerateSeedPhraseScreen} />
              <Stack.Screen name="ConfirmSeedPhraseScreen" component={ConfirmSeedPhraseScreen} />

              <Stack.Screen name="CreateNewWalletSuccessScreen" component={CreateNewWalletSuccessScreen} />

              <Stack.Screen name="ImportWalletScreen" component={ImportWalletScreen} />

              <Stack.Screen name="ImportWalletSuccessScreen" component={ImportWalletSuccessScreen} />
            </Fragment>
          ) : (
            <Fragment>
              <Stack.Screen name="MainTab" options={{ headerShown: false }}>
                {() => <BottomTabs />}
              </Stack.Screen>

              <Stack.Screen name="ChangeAccountNameScreen" component={ChangeAccountNameScreen} />

              <Stack.Screen name="ChangePinScreen" component={ChangePinScreen} />
              <Stack.Screen name="ChangeNetworkScreen" component={ChangeNetworkScreen} />
              <Stack.Screen name="ReceiveScreen" component={ReceiveScreen} />
              <Stack.Screen name="SendScreen" component={SendScreen} />
              <Stack.Screen name="SendAmountScreen" component={SendAmountScreen} />
              <Stack.Screen name="SendingTransactionScreen" component={SendingTransactionScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ShowSeedPhraseScreen" component={ShowSeedPhraseScreen} />
              <Stack.Screen name="QrCodeScanScreen" component={QrCodeScanScreen} />
              <Stack.Screen
                name="PrivacyScreen"
                component={PrivacyScreen}
                options={{
                  animation: "fade",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="LockScreen"
                component={LockScreen}
                options={{
                  animation: "fade",
                  headerShown: false,
                }}
              />
            </Fragment>
          )}
        </Stack.Navigator>
      </UserActivityProvider>
    </NavigationContainer>
  );
});
