import { useContext } from "react";
import { AlertContext } from "../components/alert-provider/AlertContext";

export function useAlert() {
  const context = useContext(AlertContext);

  if (context === undefined)
    throw new Error("Calling use alert without an AlertProvider");

  return context.alert;
}
