import React, { useState, useEffect } from "react";
import FastAverageColor from "fast-average-color";

const useAverageColor = (media) => {
  const [color, setColor] = useState({ hex: "#fff" });
  const fac = new FastAverageColor();

  useEffect(() => {
    fac
      .getColorAsync(media)
      .then((color) => {
        setColor(() => color);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [media]);

  return color;
};

export default useAverageColor;
