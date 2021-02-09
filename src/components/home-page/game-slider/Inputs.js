import { useState, useEffect } from "react";

import useGamepadDirection from "hooks/useGamepadDirection";
import useActions from "hooks/useActions";
import { useSelector } from "react-redux";

import * as homeActions from "store/apps/actions";
import { selectSteamGames } from "store/apps/selectors";

import useSoundEffect from "hooks/useSoundEffect";

const HomeScreenInputs = ({ children }) => {
  const [localActiveGame, setLocalActiveGame] = useState(0);
  const [setActiveGameIndex] = useActions([homeActions.setActiveGameIndex]);
  const games = useSelector(selectSteamGames);

  const playSoundEffect = useSoundEffect("tap");

  const addTocurrentActiveIndex = (value = 1) => {
    setLocalActiveGame((oldValue) => {
      const newValue = oldValue + value;

      if (!(newValue < 0 || newValue === games.length)) {
        playSoundEffect();

        return newValue;
      }

      return oldValue;
    });
  };

  useEffect(() => {
    setActiveGameIndex(localActiveGame);
  }, [localActiveGame]);

  useGamepadDirection({
    onLeft: () => addTocurrentActiveIndex(-1),
    onRight: () => addTocurrentActiveIndex(1),
  });

  return children;
};

export default HomeScreenInputs;
