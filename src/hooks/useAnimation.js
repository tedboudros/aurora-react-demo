import { useRef } from "react";
import { useSpring } from "react-spring";
import _isFunction from "lodash/isFunction";
import { easeSinInOut, easeCubicOut, easePolyInOut } from "d3-ease";

const useAnimation = (baseStyle = {}, animations = [], duration = 200) => {
  const currentAnimation = useRef(baseStyle);

  const getCurrentAnimation = () => currentAnimation.current;
  const setCurrentAnimation = (value) => (currentAnimation.current = value);

  const [props, set, stop] = useSpring(() => ({
    config: { duration, easing: easePolyInOut },
    ...baseStyle,
  }));

  const setAnyAnimation = (animation) => {
    setCurrentAnimation(animation);
    set(animation);
  };

  const setAnimation = (animationInput) => {
    if (_isFunction(animationInput)) {
      setAnyAnimation(animationInput(getCurrentAnimation()));
    } else if (!animationInput) {
      const { name, ...rest } = baseStyle; // get rid of the name
      setAnyAnimation(rest);
    } else {
      const animation = animations.find(
        (animation) => animation.name === animationInput
      );
      const { name, ...rest } = animation; // get rid of the name
      setAnyAnimation(rest);
    }
  };

  return {
    props,
    setAnimation,
    stopAnimation: stop,
  };
};

export default useAnimation;
