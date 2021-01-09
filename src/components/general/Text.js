import React from "react";
import { Text } from "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

const TextComp = ({ text, x = 0, y = 0, textStyle = {}, ...rest }) => {
  return (
    <Text
      text={text}
      //anchor={0.5}
      x={x}
      y={y}
      {...rest}
      style={
        new TextStyle({
          align: "center",
          fontFamily: "Quicksand",
          fontSize: 12,
          fontWeight: 300,
          ...textStyle,
        })
      }
    />
  );
};

export default TextComp;
