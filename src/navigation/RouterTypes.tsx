import type {
  NavigatorScreenParams,
  // NavigatorScreenParams,
  RouteProp as RNRouteProp,
} from "@react-navigation/native";

// --------------------------------------------
// Start navigator params definitions

export type MainTabParams = {
  WalletScreen: undefined;
  TransactionListScreen: undefined;
  SettingsScreen: undefined;
};

// TopLevelStack
export type TopLevelStackParams = {
  MainTab: NavigatorScreenParams<MainTabParams>;
  WelcomeScreen: undefined;
  CreatePinScreen: { isImporting: boolean };
  GenerateSeedPhraseScreen: undefined;
  ConfirmSeedPhraseScreen: undefined;
  CreateNewWalletSuccessScreen: undefined;
  ImportWalletSuccessScreen: undefined;
  ImportWalletScreen: undefined;

  ChangeAccountNameScreen: { accountIndex: number };
  ChangePinScreen: undefined;
  ChangeNetworkScreen: undefined;
  ReceiveScreen: undefined;
  SendScreen: undefined;
  SendAmountScreen: undefined;
  SendingTransactionScreen: undefined;
  ShowSeedPhraseScreen: undefined;
  PrivacyScreen: undefined;
  LockScreen: undefined;
  QrCodeScanScreen: { onScan: (data: string) => void };
};

// End navigator params definitions
// --------------------------------------------

export type ScreenName = keyof TopLevelStackParams;

// Param prop getter
export type RouteProp<ScreenName_ extends ScreenName> =
  ScreenName_ extends keyof TopLevelStackParams
    ? RNRouteProp<TopLevelStackParams, ScreenName_>
    : never;

// Type navigation globally
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends TopLevelStackParams {}
  }
}
