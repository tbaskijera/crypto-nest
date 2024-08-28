import { useRef } from "react";

export function useStatic<T>(getValue: () => T) {
  const ref = useRef<T | undefined>(undefined);
  if (ref.current === undefined) {
    ref.current = getValue();
  }

  return ref.current as T;
}
