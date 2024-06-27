import type {
  // NavigatorScreenParams,
  RouteProp as RNRouteProp,
} from "@react-navigation/native";

// --------------------------------------------
// Start navigator params definitions

// TopLevelStack
export type TopLevelStackParams = {
  // MainTab: NavigatorScreenParams<MainTabParams>;
  WelcomeScreen: undefined;
  CreatePinScreen: undefined;
  GenerateSeedPhraseScreen: undefined;
  ConfirmSeedPhraseScreen: undefined;
  CreateNewWalletSuccessScreen: undefined;
};

export type LoginTopTabsParams = {
  LoginWithEmailScreen: undefined;
  LoginWithPhoneNumberScreen: undefined;
};

export type StoreTopTabsParams = {
  StoreListScreen: undefined;
  StoreMapScreen: undefined;
};

// End navigator params definitions
// --------------------------------------------

export type ScreenName = keyof TopLevelStackParams | keyof StoreTopTabsParams;

// Param prop getter
export type RouteProp<ScreenName_ extends ScreenName> =
  ScreenName_ extends keyof TopLevelStackParams
    ? RNRouteProp<TopLevelStackParams, ScreenName_>
    : ScreenName_ extends keyof StoreTopTabsParams
      ? RNRouteProp<StoreTopTabsParams, ScreenName_>
      : never;

// Type navigation globally
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends TopLevelStackParams {}
  }
}
