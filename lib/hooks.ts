import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";


// Hook to prevent hydration mismatches when using prefers-reduced-motion
export function useSafeReducedMotion() {
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? !!shouldReduceMotion : false;
}

