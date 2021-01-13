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

const HomeScreenInputs = ({
  children,
  setIsLeft = () => null,
  setIsAButtonDown = () => null,
  setIsBButtonDown = () => null,
}) => {
  const [setActiveGameIndex, startSteamGame, setIsLoading] = useActions([
    homeActions.setActiveGameIndex,
    homeActions.startSteamGame,
    homeActions.setIsHomeLoading,
  ]);

  const isLoading = useSelector(selectIsHomeLoading);
  const games = useSelector(selectSteamGames);
  const activeGame = useSelector(selectActiveGameIndex);

  const [localActiveGame, setLocalActiveGame] = useState(0);

  const addTocurrentActiveIndex = (value = 1) => {
    setIsLeft(() => value === -1);
    setLocalActiveGame((oldValue) => {
      const newValue = oldValue + value;
      return !(newValue < 0 || newValue === games.length) ? newValue : oldValue;
    });
  };

  useEffect(() => {
    setActiveGameIndex(localActiveGame);
  }, [localActiveGame]);

  useGamepadButton({
    0: {
      onButtonDown: () => {
        const { appId } = games[activeGame];
        //startSteamGame(appId);
        setIsAButtonDown(true);
        setIsLoading(!isLoading);
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
