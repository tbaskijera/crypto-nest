import { createContext } from "react";
import type { AlertButton, AlertOptions } from "react-native";

export type AlertType = "default" | "info" | "success" | "warning" | "error";

export interface AlertProps {
  title: string;
  message?: string;
  type?: AlertType;
  buttons?: AlertButton[];
  options?: AlertOptions;
}

export interface AlertContextType {
  alert: ({ title, message, type, buttons, options }: AlertProps) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);
