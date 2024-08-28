import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { SettingsScreen } from "../screens/SettingsScreen";
import { WalletScreen } from "../screens/WalletScreen";
import { styleConstants as C } from "../styleConstants";
import { MainTabParams } from "./RouterTypes";
import { TransactionListScreen } from "../screens/TransactionListScreen";

const Tabs = createBottomTabNavigator<MainTabParams>();

export const BottomTabs = observer(function BottomTabs() {
  // const insets = useSafeAreaInsets();
  // const isAndroid = Platform.OS === "android";

  return (
    <Tabs.Navigator
      screenOptions={() => ({
        header: (props) => <Header {...props} />,
        tabBarStyle: {
          backgroundColor: C.colorDark,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: C.colorLight,
        tabBarInactiveTintColor: C.colorDarkAccentLight,
        tabBarLabelPosition: "below-icon",
        // tabBarLabel: ({ focused, children }) =>
        //   focused ? (
        //     <Text sizeXSmall weightXBold colorPrimaryTextDark>
        //       {children}
        //     </Text>
        //   ) : (
        //     <Text sizeXSmall colorPrimaryTextDarkSoft>
        //       {children}
        //     </Text>
        //   ),
        // tabBarStyle: [
        //   {
        //     ...shadow(5),
        //     borderTopWidth: 0,
        //   },
        //   isAndroid
        //     ? { height: 56 + insets.bottom + 10, paddingBottom: 10 }
        //     : { height: 56 + insets.bottom },
        // ],
      })}
    >
      <Tabs.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          title: "Wallet",
          tabBarIcon(props) {
            return <Icon name="wallet" size={32} color={props.color} />;
          },
        }}
      />
      <Tabs.Screen
        name="TransactionListScreen"
        component={TransactionListScreen}
        options={{
          title: "Transactions",
          tabBarIcon(props) {
            return (
              <Icon name="swap-horizontal" size={40} color={props.color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon(props) {
            return <Icon name="cogs" size={32} color={props.color} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
});
