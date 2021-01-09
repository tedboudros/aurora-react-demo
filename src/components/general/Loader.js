import React, { useEffect } from "react";

import { AnimatedSprite, Container } from "@inlet/react-pixi";
import Rectangle from "./Rectangle";
import useUpdateWindowDimensions from "hooks/useUpdateWindowDimensions";
import useAnimation from "hooks/useAnimation";
import { animated } from "react-spring";

const AnimatedContainer = animated(Container);
const AnimatedLoader = animated(AnimatedSprite);

const Loader = ({ isLoading = false }) => {
  const { width, height } = useUpdateWindowDimensions();

  const transition = useAnimation(
    { alpha: 0 },
    [
      { name: "show", alpha: 1 },
      { name: "hide", alpha: 0 },
    ],
    250
  );

  useEffect(() => {
    transition.setAnimation(isLoading ? "show" : "hide");
  }, [isLoading]);

  return (
    <AnimatedContainer x={0} y={0} {...transition.props}>
      <Container alpha={0.6}>
        <Rectangle
          background={"#000"}
          x={0}
          y={0}
          width={width}
          height={height}
        />
      </Container>
      <AnimatedLoader
        images={Array(38)
          .fill(false)
          .map(
            (_, i) =>
              require(`assets/png/infinityLoader/frame-${i}.png`).default
          )}
        animationSpeed={0.7}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
        {...transition.props}
      />
    </AnimatedContainer>
  );
};

export default Loader;
