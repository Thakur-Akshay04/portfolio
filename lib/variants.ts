import { Variants } from "framer-motion";



// Fade in reveal variant
export const getFadeIn = (direction: "up" | "down" | "left" | "right" | "none" = "none", distance = 30): (shouldReduce: boolean | null) => Variants => {
  return (shouldReduce: boolean | null): Variants => {
    const reduce = !!shouldReduce;
    const isDirectional = direction !== "none" && !reduce;
    
    let x = 0;
    let y = 0;
    
    if (isDirectional) {
      if (direction === "up") y = distance;
      if (direction === "down") y = -distance;
      if (direction === "left") x = distance;
      if (direction === "right") x = -distance;
    }
    
    return {
      hidden: {
        opacity: 0,
        x,
        y,
      },
      visible: (custom = {}) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 100,
          ...custom,
        },
      }),
    };
  };
};

// Scale in variant
export const getScaleIn = (shouldReduce: boolean | null): Variants => {
  const reduce = !!shouldReduce;
  return {
    hidden: {
      opacity: 0,
      scale: reduce ? 1 : 0.95,
    },
    visible: (custom = {}) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        ...custom,
      },
    }),
  };
};





