export function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
    willChange: "transform, opacity",
  };
}

export const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.1,
  },
  atLeave: {
    opacity: 0,
    scale: 0.9,
  },
  atActive: {
    opacity: 1,
    scale: 1,
  },
};
