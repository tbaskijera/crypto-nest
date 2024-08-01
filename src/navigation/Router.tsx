import type { NavigationContainerProps } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React, { Fragment } from "react";
import { Header } from "../components/Header";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { ConfirmSeedPhraseScreen } from "../screens/create-new-wallet/ConfirmSeedPhraseScreen";
import { CreateNewWalletSuccessScreen } from "../screens/create-new-wallet/CreateNewWalletSuccessScreen";
import { CreatePasswordScreen } from "../screens/create-new-wallet/CreatePasswordScreen";
import { GenerateSeedPhraseScreen } from "../screens/create-new-wallet/GenerateSeedPhraseScreen";
import { BottomTabs } from "./BottomTabs";
import { TopLevelStackParams } from "./RouterTypes";

export interface RouterProps {
  navigationContainerProps: Partial<NavigationContainerProps>;
  shouldShowUpdateScreen: boolean;
}

const Stack = createNativeStackNavigator<TopLevelStackParams>();
const isPastOnboarding = false;

const screenOptions: NativeStackNavigationOptions = {
  animation: "slide_from_right",
  animationDuration: 100,
  header: (props) => <Header {...props} />,
};

export const Router = function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {!isPastOnboarding ? (
          <Fragment>
            <Stack.Screen
              name={"WelcomeScreen"}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CreatePasswordScreen"
              component={CreatePasswordScreen}
            />
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
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="MainTab" options={{ headerShown: false }}>
              {() => <BottomTabs />}
            </Stack.Screen>

            {/* <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            /> */}
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
