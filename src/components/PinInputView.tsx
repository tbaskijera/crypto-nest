import { StyleSheet, TouchableOpacity } from "react-native";
import { Spacer } from "./Spacer";
import { Text } from "./Text";
import { View } from "./View";
import { Icon } from "./Icon";
import { styleConstants as C } from "../styleConstants";

export const PinInputView = function PinInputView() {
  return (
    <View flex paddingHorizontalExtraLarge>
      <View flexDirectionRow justifyContentSpaceBetween>
        {[1, 2, 3].map((number) => (
          <TouchableOpacity>
            <Text key={number} style={S.number}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Spacer extraLarge />

      <View flexDirectionRow justifyContentSpaceBetween>
        {[4, 5, 6].map((number) => (
          <TouchableOpacity>
            <Text key={number} style={S.number}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Spacer extraLarge />

      <View flexDirectionRow justifyContentSpaceBetween>
        {[7, 8, 9].map((number) => (
          <TouchableOpacity>
            <Text key={number} style={S.number}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Spacer extraLarge />

      <View flexDirectionRow justifyContentSpaceBetween>
        <TouchableOpacity>
          <Icon name="face-recognition" color={C.colorLight} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text key={0} style={S.number}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="backspace-outline" color={C.colorLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const S = StyleSheet.create({
  number: {
    fontSize: 24,
  },
});
