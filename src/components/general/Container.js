import React from "react";
import { Container as PIXIContainer } from "@inlet/react-pixi";

const Container = ({ children, active = 0, ...props }) => {
  return <PIXIContainer {...props}>{children}</PIXIContainer>;
};

export default Container;
