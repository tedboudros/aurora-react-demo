import React, { useState, useEffect } from "react";
import useGamepadButton from "hooks/useGamepadButton";
import { openFullscreen, closeFullscreen } from "utils/fullScreen";

const Development = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (isFullScreen) closeFullscreen();
    else openFullscreen();

    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    document.title = `Aurora UI - v${process.env.REACT_APP_AURORA_VERSION}`;
  }, []);

  useGamepadButton({
    8: {
      onButtonDown: () => {
        document.location.reload();
      },
    },
    9: {
      onButtonDown: toggleFullScreen,
    },
  });

  return children;
};

export default Development;