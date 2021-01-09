export const makeAnimations = (baseStyle, animations) => {
  return {
    animations: animations.map((animation) => ({ ...baseStyle, ...animation })),
    baseStyle,
  };
};
