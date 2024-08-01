import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import type { AlertButton } from "react-native";
import { shadow } from "../../utils/shadow";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Modal } from "../Modal";
import { Spacer } from "../Spacer";
import { Text } from "../Text";
import { View } from "../View";
import type { AlertContextType, AlertType } from "./AlertContext";
import { AlertContext } from "./AlertContext";
import { styleConstants as C } from "../../styleConstants";

const defaultOptions = {
  cancelable: false,
  onDismiss: () => {},
};

const S = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.colorBackdrop,
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    maxHeight: "80%",
    width: "90%",
    borderRadius: 20,
    ...shadow(5),
  },
  flex: { flex: 1 },
  flexAndCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "box-none",
  },
});

interface AlertProviderProps {
  children: React.ReactNode;
}

export function AlertProvider({ children, ...otherProps }: AlertProviderProps) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertParams, setAlertParams] = useState({
    title: "",
    message: "",
    type: "default" as AlertType,
    buttons: [] as AlertButton[],
    options: defaultOptions,
  });

  const alert: AlertContextType["alert"] = useCallback(
    ({
      title = "",
      message = "",
      type = "default",
      buttons = [],
      options = defaultOptions,
    }) => {
      const preparedOptions = { ...defaultOptions, ...options };
      setAlertParams({
        title,
        message,
        type,
        buttons,
        options: preparedOptions,
      });
      setAlertVisible(true);
    },
    [],
  );

  const contextValue = { alertVisible, setAlertVisible, alert };

  const { title, message, type, buttons, options } = alertParams;

  const { onDismiss, cancelable } = options;

  const handleModalPress = () => {
    if (cancelable) {
      onDismiss();
      setAlertVisible(false);
    }
  };

  const buttonsRender = buttons.map((button, index) => {
    return (
      <React.Fragment key={button.text}>
        {index !== 0 && <Spacer />}
        <Button
          title="Zatvori"
          withGradient
          outline={button.style === "cancel"}
          medium
          onPress={() => {
            setAlertVisible(false);
            return button.onPress?.();
          }}
          style={{
            flex: buttons.length <= 2 ? 1 : 0,
          }}
        />
      </React.Fragment>
    );
  });

  return (
    <AlertContext.Provider value={contextValue} {...otherProps}>
      {children}
      {alertVisible && (
        <Modal>
          <View style={S.flex}>
            <Pressable style={S.backdrop} onPress={handleModalPress} />

            <View style={S.flexAndCenter}>
              {/* Popup / Modal container */}
              <View style={S.popup} colorDarkAccent paddingExtraLarge>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {!!title && (
                    <View alignItemsCenter justifyContentCenter>
                      {type === "default" ? (
                        <Icon name="abacus" color="red" size={24} />
                      ) : type === "success" ? (
                        <Icon name="abacus" color="red" size={24} />
                      ) : type === "warning" ? (
                        <Icon name="abacus" color="red" size={24} />
                      ) : type === "error" ? (
                        <Icon name="abacus" color="red" size={24} />
                      ) : (
                        <Icon name="abacus" size={24} color="red" />
                      )}
                      <Spacer extraLarge />
                      <Text sizeLarge weightSemiBold alignCenter>
                        {title}
                      </Text>

                      <Spacer />
                    </View>
                  )}

                  {!!message && (
                    <View paddingVerticalMedium>
                      <Text alignCenter sizeSmall colorDarkAccentLight>
                        {message}
                      </Text>
                    </View>
                  )}
                </ScrollView>

                <Spacer large />

                <View
                  flexDirectionRow={buttonsRender.length < 3}
                  flexDirectionColumn={buttonsRender.length >= 3}
                >
                  {buttonsRender.length === 0 ? (
                    <Button
                      withGradient
                      medium
                      flex
                      title="U redu"
                      onPress={() => {
                        setAlertVisible(false);
                      }}
                    />
                  ) : (
                    buttonsRender
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </AlertContext.Provider>
  );
}
