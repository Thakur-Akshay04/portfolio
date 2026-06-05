import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Hook for counting up integers smoothly (e.g. statistics)
export function useCountUp(end: number, duration = 2000, startAnimation = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Quadratic easeOut formulation
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, startAnimation]);

  return count;
}



// Hook to prevent hydration mismatches when using prefers-reduced-motion
export function useSafeReducedMotion() {
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? !!shouldReduceMotion : false;
}

