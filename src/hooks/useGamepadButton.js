import { useEffect, useContext } from "react";
import _isEqual from "lodash/isEqual";

import { GamepadsContext } from "contexts/GamepadsContext";

import usePrevious from "hooks/usePrevious";

const useGamepadButton = (config) => {
  const {
    gamepads: { buttons },
  } = useContext(GamepadsContext);
  const previousButtonsState = usePrevious(buttons);

  useEffect(() => {
    if (!_isEqual(buttons, previousButtonsState) && buttons) {
      Object.keys(buttons).forEach((button, i) => {
        const buttonValue = isButtonPressed(buttons, button);
        const prevButtonValue = isButtonPressed(previousButtonsState, button);

        if (buttonValue === true && prevButtonValue === false) {
          if (config[button] && config[button].onButtonDown)
            config[button].onButtonDown();
        } else if (buttonValue === false && prevButtonValue === true) {
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
