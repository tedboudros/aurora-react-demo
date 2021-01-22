import { useState, useEffect } from "react";

import useGamepadDirection from "hooks/useGamepadDirection";
import useGamepadButton from "hooks/useGamepadButton";
import useActions from "hooks/useActions";
import { useSelector } from "react-redux";

import * as homeActions from "store/home/actions";
import {
  selectActiveGameIndex,
  selectIsHomeLoading,
  selectSteamGames,
} from "store/home/selectors";

import useSound from "use-sound";
import tap from "assets/sounds/tap.mp3";

const HomeScreenInputs = ({
  children,
  setIsLeft = () => null,
  setIsAButtonDown = () => null,
  setIsBButtonDown = () => null,
}) => {
  const [play] = useSound(tap, { sprite: { tap: [0, 120] } });

  const [setActiveGameIndex] = useActions([homeActions.setActiveGameIndex]);

  const games = useSelector(selectSteamGames);

  const [localActiveGame, setLocalActiveGame] = useState(0);

  const addTocurrentActiveIndex = (value = 1) => {
    setIsLeft(() => value === -1);
    setLocalActiveGame((oldValue) => {
      const newValue = oldValue + value;
      if (!(newValue < 0 || newValue === games.length)) play({ id: "tap" });
      return !(newValue < 0 || newValue === games.length) ? newValue : oldValue;
    });
  };

  useEffect(() => {
    setActiveGameIndex(localActiveGame);
  }, [localActiveGame]);

  useGamepadButton({
    0: {
      onButtonDown: () => {
        setIsAButtonDown(true);
      },
      onButtonUp: () => {
        setIsAButtonDown(false);
      },
    },
    1: {
      /*
      onButtonDown: () => {
        setIsLoading(!isLoading);
      },*/
      onButtonDown: () => {
        setIsBButtonDown(true);
      },
      onButtonUp: () => {
        setIsBButtonDown(false);
      },
    },
  });

  useGamepadDirection({
    onLeft: () => addTocurrentActiveIndex(-1),
    onRight: () => addTocurrentActiveIndex(1),
  });

  return children;
};

export default HomeScreenInputs;
