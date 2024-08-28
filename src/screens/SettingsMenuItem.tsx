import { observer } from "mobx-react-lite";
import { IconProps, Icon } from "../components/Icon";
import { Spacer } from "../components/Spacer";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { View } from "../components/View";
import { styleConstants as C } from "../styleConstants";
import { Text } from "../components/Text";

export const SettingsMenuItem = observer(function SettingsMenuItem({
  title,
  iconName,
  onPress,
  danger,
}: {
  title: string;
  iconName: IconProps["name"];
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity flexDirectionRow onPress={onPress}>
      <View flex flexDirectionRow>
        <Icon
          name={iconName}
          size={28}
          color={danger ? C.colorDanger : C.colorLight}
        />
        <Spacer />
        <Text colorDanger={danger}>{title}</Text>
      </View>

      <Icon
        name="chevron-right"
        color={danger ? C.colorDanger : C.colorLight}
      />
    </TouchableOpacity>
  );
});
