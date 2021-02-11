import { useEffect, useRef, useContext } from "react";
import { GamepadsContext } from "contexts/GamepadsContext";
import usePrevious from "hooks/usePrevious";
import _isEqual from "lodash/isEqual";
import _debounce from "lodash/debounce";

import useShouldRegister from "hooks/useShouldRegister";
import useGamepadButton from "hooks/useGamepadButton";

// in ms
const spamTimeout = 150;
const spamInterval = 100;

const useGamepadDirection = (config = {}, behaviour) => {
  const {
    gamepads: { axes },
  } = useContext(GamepadsContext);
  const previousAxesState = usePrevious(axes);

  const currentSpam = useRef();
  const currentTimeout = useRef();

  const shouldRegister = useShouldRegister();

  const setSpam = (func) => {
    stopSpam();
    currentTimeout.current = setTimeout(() => {
      currentSpam.current = setInterval(() => {
        if (func) func();
      }, spamInterval);
    }, spamTimeout);
  };

  const getSpam = () => currentSpam.current;
  const getTimeout = () => currentTimeout.current;

  const stopSpam = () => {
    const spam = getSpam();
    const timeout = getTimeout();
    clearInterval(spam);
    clearTimeout(timeout);
    currentSpam.current = null;
    currentTimeout.current = null;
  };

  const onDown = (funcName) => {
    if (config[funcName]) config[funcName]();
    setSpam(config[funcName]);
  };

  const onUp = (funcName) => {
    if (config[funcName]) config[funcName]();
    stopSpam();
  };

  useGamepadButton(
    {
      12: {
        onButtonDown: () => onDown("onUp"),
        onButtonUp: () => onDown("onUpLeave"),
      },
      13: {
        onButtonDown: () => onDown("onDown"),
        onButtonUp: () => onDown("onDownLeave"),
      },
      14: {
        onButtonDown: () => onDown("onLeft"),
        onButtonUp: () => onDown("onLeftLeave"),
      },
      15: {
        onButtonDown: () => onDown("onRight"),
        onButtonUp: () => onDown("onRightLeave"),
      },
    },
    behaviour
  );

  useEffect(() => {
    if (
      !_isEqual(axes, previousAxesState) &&
      previousAxesState &&
      previousAxesState.length &&
      axes.length
    ) {
      axes.forEach((axis, i) => {
        const prevValue = previousAxesState[i];
        const isRegistered = shouldRegister(behaviour, `axes${i}`);

        if (i > 1) return; // Not use right analog stick

        if (
          axis.positiveValue === true &&
          prevValue.positiveValue === false &&
          isRegistered
        ) {
          //Positive in
          onDown(`on${axis.type.positiveType}`);
        } else if (
          axis.positiveValue === false &&
          prevValue.positiveValue === true
        ) {
          //Positive out
          onUp(`on${axis.type.positiveType}Leave`);
        }
        if (
          axis.negativeValue === true &&
          prevValue.negativeValue === false &&
          isRegistered
        ) {
          //Negative in
          onDown(`on${axis.type.negativeType}`);
        } else if (
          axis.negativeValue === false &&
          prevValue.negativeValue === true
        ) {
          //Negative out
          onUp(`on${axis.type.negativeType}Leave`);
        }
      });
    }
  }, [axes]);
};

export default useGamepadDirection;
