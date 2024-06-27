import type { NavigationContainerProps } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { TopLevelStackParams } from "./RouterTypes";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { CreatePinScreen } from "../screens/create-new-wallet/CreatePinScreen";
import { GenerateSeedPhraseScreen } from "../screens/create-new-wallet/GenerateSeedPhraseScreen";
import { ConfirmSeedPhraseScreen } from "../screens/create-new-wallet/ConfirmSeedPhraseScreen";
import { CreateNewWalletSuccessScreen } from "../screens/create-new-wallet/CreateNewWalletSuccessScreen";
import { Header } from "../components/Header";

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

export const Router = function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name={"WelcomeScreen"}
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="CreatePinScreen" component={CreatePinScreen} />
        <Stack.Screen
          name="GenerateSeedPhraseScreen"
          component={GenerateSeedPhraseScreen}
        />
        <Stack.Screen
          name="ConfirmSeedPhraseScreen"
          component={ConfirmSeedPhraseScreen}
        />

        <Stack.Screen
          name="CreateNewWalletSuccessScreen"
          component={CreateNewWalletSuccessScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
