import React from "react";
import RNCollapsible from "react-native-collapsible";

type CollapsibleProps = {
  children?: React.ReactNode | React.ReactNode[] | undefined;
  collapsed: boolean;
  duration?: number;
};

export function Collapsible({
  children,
  collapsed,
  duration = 300,
}: CollapsibleProps) {
  return (
    <RNCollapsible
      collapsed={collapsed}
      duration={duration}
      align="top"
      collapsedHeight={0}
      enablePointerEvents={false}
      renderChildrenCollapsed
    >
      {children}
    </RNCollapsible>
  );
}
