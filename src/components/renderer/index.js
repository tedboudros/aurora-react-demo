import React from "react";
import useUpdateWindowDimensions from "hooks/useUpdateWindowDimensions";
import { Stage } from "@inlet/react-pixi";
import useColor from "hooks/useColor";
import * as PIXI from "pixi.js";

const Container = ({ children, background }) => {
  const { width, height } = useUpdateWindowDimensions(true);

  const hex = useColor(background);

  return (
    <div>
      <Stage
        width={width}
        height={height}
        options={{
          antialias: true,
          backgroundColor: hex,
          FILTER_RESOLUTION: 2,
          PRECISION_VERTEX: PIXI.PRECISION.HIGH,
          PRECISION_FRAGMENT: PIXI.PRECISION.HIGH,
          ANISOTROPIC_LEVEL: 16,
          MIPMAP_TEXTURES: PIXI.MSAA_QUALITY.HIGH,
          SCALE_MODE: PIXI.SCALE_MODES.LINEAR,
        }}
      >
        {children}
      </Stage>
    </div>
  );
};

export default Container;
