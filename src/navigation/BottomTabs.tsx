import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { SettingsScreen } from "../screens/SettingsScreen";
import { WalletScreen } from "../screens/WalletScreen";
import { styleConstants as C } from "../styleConstants";
import { MainTabParams } from "./RouterTypes";

const Tabs = createBottomTabNavigator<MainTabParams>();

export const BottomTabs = observer(function BottomTabs() {
  // const insets = useSafeAreaInsets();
  // const isAndroid = Platform.OS === "android";

  return (
    <Tabs.Navigator
      screenOptions={() => ({
        header: (props) => <Header {...props} />,
        tabBarStyle: {
          backgroundColor: C.colorDarkAccentLighter,
          borderTopWidth: 0,
        },
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
            return <Icon name="wallet" size={24} color={props.color} />;
          },
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon(props) {
            return <Icon name="cogs" size={24} color={props.color} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
});
