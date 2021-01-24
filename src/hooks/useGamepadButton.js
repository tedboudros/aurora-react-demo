import { useEffect, useContext } from "react";
import _isEqual from "lodash/isEqual";

import { GamepadsContext } from "contexts/GamepadsContext";

import usePrevious from "hooks/usePrevious";

import { useSelector } from "react-redux";
import { selectIsDrawerOpen } from "store/drawer/selectors";

import { shouldRegister } from "utils/gamepadBehaviour";

const useGamepadButton = (config, behaviour) => {
  const {
    gamepads: { buttons },
  } = useContext(GamepadsContext);
  const previousButtonsState = usePrevious(buttons);

  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  useEffect(() => {
    if (!_isEqual(buttons, previousButtonsState) && buttons) {
      Object.keys(buttons).forEach((button, i) => {
        const isClickable = shouldRegister(behaviour, button, isDrawerOpen);

        const buttonValue = isButtonPressed(buttons, button);
        const prevButtonValue = isButtonPressed(previousButtonsState, button);

        if (buttonValue === true && prevButtonValue === false && isClickable) {
          if (config[button] && config[button].onButtonDown)
            config[button].onButtonDown();
        }

        if (buttonValue === false && prevButtonValue === true) {
          if (config[button] && config[button].onButtonUp)
            config[button].onButtonUp();
        }
      });
    }
  }, [buttons]);

  const isButtonPressed = (buttonState, button) => {
    return buttonState && buttonState.length ? buttonState[button] : false;
  };

  return null;
};

export default useGamepadButton;
