import React, { useState, useEffect } from "react";

import AppRect from "components/general/AppRect";

import { selectSteamGames } from "store/apps/selectors";
import { useSelector } from "react-redux";

import useGamepadDirection from "hooks/useGamepadDirection";
import useSoundEffect from "hooks/useSoundEffect";

import useActions from "hooks/useActions";
import * as homeActions from "store/apps/actions";

const AppSlider = ({ stockApps }) => {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [setActiveApp] = useActions([homeActions.setActiveApp]);

  const games = useSelector(selectSteamGames);

  const allApps = [...games, ...stockApps];

  const playSoundEffect = useSoundEffect("tap");

  const addTocurrentActiveIndex = (value = 1) => {
    setActiveAppIndex((oldValue) => {
      const newValue = oldValue + value;

      if (!(newValue < 0 || newValue === allApps.length)) {
        playSoundEffect();
        setActiveApp(allApps[newValue]);
        return newValue;
      }

      return oldValue;
    });
  };

  useEffect(() => {
    setActiveApp(allApps[0]);
  }, [games]);

  useGamepadDirection({
    onLeft: () => addTocurrentActiveIndex(-1),
    onRight: () => addTocurrentActiveIndex(1),
  });

  return (
    <div className="app-slider">
      <div
        className="app-slider__menu"
        style={{ transform: `translateX(-${activeAppIndex * 9.5}rem)` }}
      >
        {allApps.map((app, i) => (
          <AppRect key={i} app={app} isActive={i === activeAppIndex} />
        ))}
      </div>
    </div>
  );
};

export default AppSlider;
