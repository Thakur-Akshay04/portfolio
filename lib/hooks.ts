import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const emptySubscribe = () => () => {};

// Hook to prevent hydration mismatches when using prefers-reduced-motion
export function useSafeReducedMotion() {
  const shouldReduceMotion = useReducedMotion();
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return isClient ? !!shouldReduceMotion : false;
}

