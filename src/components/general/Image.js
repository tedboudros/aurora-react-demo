import React, { useEffect, useState } from "react";
import { Sprite } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";

const nearestPowerOf2 = (n) => {
  return 1 << (31 - Math.clz32(n));
};

const ImageComp = (props) => {
  const { image, width, height, ...rest } = props;
  const texture = new PIXI.Texture.from(image);

  const newHeight = (width / texture.orig.width) * texture.orig.height;
  return (
    <Sprite
      anchor={0}
      texture={texture}
      width={width}
      height={newHeight}
      {...rest}
    />
  );
};
export default ImageComp;
