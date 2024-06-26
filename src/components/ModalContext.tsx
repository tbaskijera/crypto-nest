import React from "react";

export type Content = { uniqueId: string; children: React.ReactNode };

export const ModalContext = React.createContext<{
  addContent(params: Content): void;
  removeContent(uniqueId: Content["uniqueId"]): void;
  updateContent(params: Content): void;
} | null>(null);
