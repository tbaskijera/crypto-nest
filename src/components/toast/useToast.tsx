import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import { assert } from "../../utils/assert";

export function useToast() {
  const toast = useContext(ToastContext);
  assert(toast, "Using useToast without ToastProvider");
  return toast;
}
