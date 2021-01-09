import React, { useEffect } from "react";
import homeScreenAnimations from "screens/HomeScreen/HomeScreen.animations";
import styles from "screens/HomeScreen/HomeScreen.styles";

import Rectangle from "components/general/Rectangle";
import Container from "components/general/Container";

import { animated } from "react-spring";
import useAnimation from "hooks/useAnimation";
import { useSelector } from "react-redux";
import { selectActiveGameIndex } from "store/home/selectors";

const Game = ({ index }) => {
  const currentActiveIndex = useSelector(selectActiveGameIndex);
  const isActive = index === currentActiveIndex;
  const isAfterActive = index > currentActiveIndex;

  const boxAnimation = useAnimation(styles.box, homeScreenAnimations.box);
  const boxBorderAnimation = useAnimation(
    styles.boxBorder,
    homeScreenAnimations.boxBorder
  );

  useEffect(() => {
    reAnimate();
  }, [currentActiveIndex]);

  const reAnimate = () => {
    if (isActive) {
      boxAnimation.setAnimation(() => ({
        ...homeScreenAnimations.box[0],
        x: index * 152 + 64,
        name: "scrollActive",
      }));
      boxBorderAnimation.setAnimation("active");
    } else if (isAfterActive) {
      boxAnimation.setAnimation(() => ({
        ...styles.box,
        x: index * 152 + 64 + (isAfterActive ? 70 : 0),
        name: "scrollAfter",
      }));
      boxBorderAnimation.setAnimation();
    } else {
      boxAnimation.setAnimation(() => ({
        ...styles.box,
        x: index * 152 + 64,
        name: "scrollBefore",
      }));
      boxBorderAnimation.setAnimation();
    }
  };

  reAnimate();

  const AnimatedRectangle = animated(Rectangle);
  return (
    <Container zIndex={isActive ? 1 : 2}>
      <AnimatedRectangle
        {...boxAnimation.props}
        {...boxBorderAnimation.props}
      />
    </Container>
  );
};

export default React.memo(Game);
