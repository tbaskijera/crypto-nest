import React from "react";
import type { ToastType } from "./ToastProvider";

export const ToastContext = React.createContext<{
  showToast(
    message: ToastType["message"],
    options?: ToastType["options"],
  ): void;
} | null>(null);
