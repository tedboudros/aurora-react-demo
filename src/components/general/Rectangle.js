import { Graphics, filters } from "pixi.js";
import { PixiComponent, Container, withFilters } from "@inlet/react-pixi";
import useColor from "hooks/useColor";

const Filters = withFilters(Container, {
  blur: filters.BlurFilter,
});

const Rectangle = PixiComponent("Rectangle", {
  create: () => new Graphics(),
  applyProps: (instance, _, props) => {
    const { x, y, width, height, fill } = props;
    instance.clear();
    instance.beginFill(fill);
    instance.drawRect(x, y, width, height);
    instance.endFill();
  },
});

const RoundedRectangle = PixiComponent("RoundedRectangle", {
  create: () => new Graphics(),
  applyProps: (instance, _, props) => {
    const { x, y, width, height, fill, radius } = props;
    instance.clear();
    instance.beginFill(fill);
    instance.drawRoundedRect(x, y, width, height, radius);
    instance.endFill();
  },
});

const calculateInnerBorderRectangle = ({ width, height, x, y, borderSize }) => {
  const newWidth = width - borderSize * 2;
  const newHeight = height - borderSize * 2;
  const newX = x + borderSize;
  const newY = y + borderSize;

  return {
    width: newWidth,
    height: newHeight,
    x: newX,
    y: newY,
  };
};

const RectangleBorderRadiusController = (props) => {
  const { background, borderRadius, ...rest } = props;

  const hex = useColor(background);

  return (
    <>
      {borderRadius ? (
        <RoundedRectangle radius={borderRadius} {...rest} fill={hex} />
      ) : (
        <Rectangle {...rest} fill={hex} />
      )}
    </>
  );
};

const RectangleShadowControler = (props) => {
  const { shadowColor, shadowBlur, shadowAlpha, ...rest } = props;

  return shadowColor && shadowBlur ? (
    <Filters alpha={shadowAlpha || 1} blur={{ blur: shadowBlur }}>
      <RectangleBorderRadiusController {...props} background={shadowColor} />
    </Filters>
  ) : null;
};

const RectangleContainer = (props) => {
  const { borderSize, borderColor, borderAlpha, alpha, ...rest } = props;

  const innerBorderRect = calculateInnerBorderRectangle(props);

  const hasBorder = borderColor && borderSize;

  return (
    <Container alpha={alpha}>
      <RectangleShadowControler {...rest} />
      <Container alpha={borderAlpha}>
        <RectangleBorderRadiusController
          {...rest}
          {...(hasBorder ? { background: borderColor } : {})}
        />
      </Container>
      {hasBorder ? (
        <RectangleBorderRadiusController {...rest} {...innerBorderRect} />
      ) : null}
    </Container>
  );
};

export default RectangleContainer;
