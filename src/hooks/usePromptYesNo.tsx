import { useAlert } from "./useAlert";
import type { AlertButton } from "react-native";

/**
 * returns a promise that resolves either with true or false, depending
 * on wheather the user accepts or dismisses the prompt
 */

export const usePromptYesNo = () => {
  const alert = useAlert();

  const promptYesNo = ({
    title,
    message,
    yesText = "Yes",
    noText = "No",
    yesStyle = "destructive",
    noStyle = "cancel",
  }: {
    title: string;
    message: string;
    yesText?: string;
    noText?: string;
    yesStyle?: AlertButton["style"];
    noStyle?: AlertButton["style"];
  }): Promise<boolean> =>
    new Promise((resolve) => {
      alert({
        title,
        message,
        type: "error",
        buttons: [
          { text: noText, style: noStyle, onPress: () => resolve(false) },
          { text: yesText, style: yesStyle, onPress: () => resolve(true) },
        ],
        options: { cancelable: false, onDismiss: () => resolve(false) },
      });
    });

  return promptYesNo;
};
