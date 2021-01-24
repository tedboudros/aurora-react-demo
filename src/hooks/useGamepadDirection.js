import { useEffect, useRef, useContext } from "react";
import { GamepadsContext } from "contexts/GamepadsContext";
import usePrevious from "hooks/usePrevious";
import _isEqual from "lodash/isEqual";
import _debounce from "lodash/debounce";

import { useSelector } from "react-redux";
import { selectIsDrawerOpen } from "store/drawer/selectors";

import { shouldRegister } from "utils/gamepadBehaviour";

// in ms
const spamTimeout = 400;
const spamInterval = 150;

const useGamepadDirection = (config = {}, behaviour) => {
  const {
    gamepads: { axes },
  } = useContext(GamepadsContext);
  const previousAxesState = usePrevious(axes);

  const currentSpam = useRef();
  const currentTimeout = useRef();

  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  const setSpam = (func) => {
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

  useEffect(() => {
    if (
      !_isEqual(axes, previousAxesState) &&
      previousAxesState &&
      previousAxesState.length &&
      axes.length
    ) {
      axes.forEach((axis, i) => {
        const prevValue = previousAxesState[i];
        const isRegistered = shouldRegister(
          behaviour,
          `axes${i}`,
          isDrawerOpen
        );

        if (
          axis.positiveValue === true &&
          prevValue.positiveValue === false &&
          isRegistered
        ) {
          //Positive in
          const functionName = `on${axis.type.positiveType}`;
          if (config[functionName]) config[functionName]();
          setSpam(config[`on${axis.type.positiveType}`]);
        } else if (
          axis.positiveValue === false &&
          prevValue.positiveValue === true
        ) {
          //Positive out
          const functionName = `on${axis.type.positiveType}Leave`;
          if (config[functionName]) config[functionName]();
          stopSpam();
        }
        if (
          axis.negativeValue === true &&
          prevValue.negativeValue === false &&
          isRegistered
        ) {
          //Negative in
          const functionName = `on${axis.type.negativeType}`;
          if (config[functionName]) config[functionName]();
          setSpam(config[`on${axis.type.negativeType}`]);
        } else if (
          axis.negativeValue === false &&
          prevValue.negativeValue === true
        ) {
          //Negative out
          const functionName = `on${axis.type.negativeType}Leave`;
          if (config[functionName]) config[functionName]();
          stopSpam();
        }
      });
    }
  }, [axes]);
};

export default useGamepadDirection;
