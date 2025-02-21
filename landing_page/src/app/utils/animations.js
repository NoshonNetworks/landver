// utils/animations.js
export const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  
  export const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  export const fadeIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };
  
  export const scaleIn = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };
  
  export const slideIn = {
    initial: {
      x: -60,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  
  export const menuSlide = {
    initial: { height: 0, opacity: 0 },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
          delay: 0.1,
        },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };
  