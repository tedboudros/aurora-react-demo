import { useEffect, useContext, useState } from "react";
import _isEqual from "lodash/isEqual";

import { GamepadsContext } from "contexts/GamepadsContext";

import usePrevious from "hooks/usePrevious";

import useActions from "hooks/useActions";
import * as navigationActions from "store/navigation/actions";

import { useSelector } from "react-redux";
import { selectIsButtonDown } from "store/navigation/selectors";
import { selectIsDrawerOpen } from "store/drawer/selectors";

import useShouldRegister from "hooks/useShouldRegister";

const useGamepadButton = (config, behaviour) => {
  const [setIsButtonDown] = useActions([navigationActions.setIsButtonDown]);
  const isButtonDown = useSelector(selectIsButtonDown);

  const {
    gamepads: { buttons },
  } = useContext(GamepadsContext);
  const previousButtonsState = usePrevious(buttons);

  const isDrawerOpen = useSelector(selectIsDrawerOpen);
  const shouldRegister = useShouldRegister();

  useEffect(() => {
    if (!_isEqual(buttons, previousButtonsState) && buttons) {
      Object.keys(buttons).forEach((button, i) => {
        const isClickable = shouldRegister(behaviour, button, isDrawerOpen);

        const buttonValue = isButtonPressed(buttons, button);
        const prevButtonValue = isButtonPressed(previousButtonsState, button);

        if (buttonValue === true && prevButtonValue === false && isClickable) {
          if (config[button] && config[button].onButtonDown && !isButtonDown)
            config[button].onButtonDown();
          setIsButtonDown(true);
        }

        if (buttonValue === false && prevButtonValue === true) {
          if (config[button] && config[button].onButtonUp && isButtonDown)
            config[button].onButtonUp();
          setIsButtonDown(false);
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
