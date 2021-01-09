export default (props) => {
  const {
    shadowColor,
    shadowPosition: { x, y },
    shadowSpread,
    shadowBlur,
    width,
    height,
  } = props;

  return {
    type: "shadow",
    filterComponents: [
      {
        blur: { blur: shadowBlur },
        x: x - shadowSpread,
        y: y - shadowSpread,
        width: width + shadowSpread,
        height: height + shadowSpread,
        colorize: { color: shadowColor },
      },
    ],
  };
};
