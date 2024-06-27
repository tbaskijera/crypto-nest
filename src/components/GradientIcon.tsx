import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { styleConstants as C } from "../styleConstants";
import { Icon, IconProps } from "./Icon";

const GradientIcon = (props: IconProps) => {
  return (
    <MaskedView maskElement={<Icon {...props} />}>
      <LinearGradient
        colors={[C.colorGradientA, C.colorGradientB, C.colorGradientC]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Icon {...props} style={{ opacity: 0 }} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientIcon;
