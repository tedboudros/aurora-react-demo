import React, { createContext, useState, useEffect } from "react";
import useGamepad from "hooks/useGamepad";

import _isEqual from "lodash/isEqual";

const GamepadsContext = createContext();

const initialState = {
  gamepads: {},
  updateGlobalGamepads: () => {},
};

const GamepadsProvider = ({ children }) => {
  const [state, updateState] = useState(initialState);

  const gamepads = useGamepad(state);

  useEffect(() => {
    if (!_isEqual(gamepads, state)) {
      updateState(gamepads);
    }
  }, [gamepads]);

  return (
    <GamepadsContext.Provider
      value={{ gamepads: state, updateGlobalGamepads: updateState }}
    >
      {children}
    </GamepadsContext.Provider>
  );
};

export { GamepadsProvider, GamepadsContext };
