import { observer } from "mobx-react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "../../components/IconButton";
import { Modal } from "../../components/Modal";
import { Spacer } from "../../components/Spacer";
import { View } from "../../components/View";
import { styleConstants as C } from "../../styleConstants";
import { useStore } from "../../mobx/utils/useStore";
import { Text } from "../../components/Text";
import { Icon } from "../../components/Icon";
import { TouchableOpacity } from "../../components/TouchableOpacity";
import { Fragment, useState } from "react";
import { usePromptYesNo } from "../../hooks/usePromptYesNo";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type AccountSelectionSheetProps =
  | {
      editMode: boolean;
      setIsVisible: (isVisible: boolean) => void;
      setPickerOption?: never;
    }
  | {
      editMode?: never;
      setIsVisible: (isVisible: boolean) => void;
      setPickerOption: (option: string) => void;
    };

export const AccountSelectionSheet = observer(function AccountSelectionSheet({
  editMode,
  setIsVisible,
  setPickerOption,
}: AccountSelectionSheetProps) {
  const store = useStore();
  const insets = useSafeAreaInsets();
  const promptYesNo = usePromptYesNo();

  const onDismiss = () => {
    setIsVisible(false);
    // store.walletStore.wallet?.selectAccount(selectedAccount);
  };

  const accounts = store.walletStore.wallet?.accounts;
  const [selectedAccount, setSelectedAccount] = useState(
    store.walletStore.wallet?.selectedAccount.index,
  );

  return (
    <Modal>
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        onPress={() => onDismiss()}
        style={[S.backdrop]}
      >
        <AnimatedPressable entering={SlideInDown} exiting={SlideOutDown}>
          <View style={[S.wrapperView, { paddingBottom: insets.bottom }]}>
            <View
              paddingVerticalLarge
              paddingHorizontalLarge
              flexDirectionRow
              justifyContentFlexEnd
            >
              <IconButton iconName="close" onPress={() => onDismiss()} />
            </View>

            <View paddingHorizontalLarge>
              <FlatList
                keyExtractor={(item) => item.tokens.master.publicKey}
                data={accounts}
                renderItem={({ item }) => (
                  <View flexDirectionRow justifyContentCenter alignItemsCenter>
                    <TouchableOpacity
                      onPress={() => {
                        if (editMode) setSelectedAccount(item.index);
                        else {
                          // setPickerOption(item.tokens.master.publicKey);
                          setIsVisible(false);
                        }
                      }}
                    >
                      <Text
                        sizeLarge
                        weightSemiBold
                        colorTheme={editMode && item.index === selectedAccount}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                    {editMode && (
                      <Fragment>
                        <Spacer extraLarge />
                        {/* <IconButton
                          iconName="account-edit-outline"
                          iconSize={24}
                        />
                        <Spacer small /> */}
                        <IconButton
                          iconName="trash-can-outline"
                          iconSize={24}
                          onPress={async () => {
                            const result = await promptYesNo({
                              title: "Delete Account",
                              message:
                                "Are you sure you want to delete this account?",
                            });

                            if (!result) return;

                            store.walletStore.wallet?.deleteAccount(item.index);
                          }}
                        />
                      </Fragment>
                    )}
                  </View>
                )}
                ItemSeparatorComponent={() => <Spacer large />}
                ListFooterComponent={() => {
                  if (!editMode) return <Spacer extraLarge />;

                  return (
                    <View paddingVerticalExtraLarge centerContent>
                      <TouchableOpacity
                        paddingMedium
                        flexDirectionRow
                        colorDark
                        onPress={() =>
                          store.walletStore.wallet?.generateNewAccount()
                        }
                        style={{ borderRadius: 12 }}
                      >
                        <Icon name="plus" size={20} />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </AnimatedPressable>
      </AnimatedPressable>
    </Modal>
  );
});

const S = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.colorBackdrop,
    justifyContent: "flex-end",
  },

  wrapperView: {
    backgroundColor: C.colorDarkAccent,
    borderRadius: 12,
  },

  // filterContainer: {
  //   columnGap: C.spacingExtraLarge,
  //   flex: 1,
  //   flexWrap: "wrap",
  // },
});
