import React, { useState } from "react";

import buttons from "constants/buttons";
import useGamepadButton from "hooks/useGamepadButton";

import useSoundEffect from "hooks/useSoundEffect";

const Button = ({
  text,
  className,
  onPress,
  Icon,
  button,
  behaviour,
  isSoundDisabled,
}) => {
  const [isButtonDown, setIsButtonDown] = useState(false);

  const buttonInfo = buttons[button];

  const playButtonSound = useSoundEffect("buttonDown");

  useGamepadButton(
    {
      [buttonInfo.buttonIndex]: {
        onButtonDown: () => {
          setIsButtonDown(true);
          if (!isSoundDisabled) playButtonSound();
          if (onPress) onPress();
        },
        onButtonUp: () => {
          setIsButtonDown(false);
        },
      },
    },
    behaviour
  );

  return (
    <div className={`button ${className}  ${isButtonDown ? "pressed" : ""}`}>
      <div className="d-flex justify-content-center align-items-center">
        <Icon size={18} className="mr-2" />
        {text}
      </div>
      <div
        className={`button__preview ${buttonInfo ? buttonInfo.className : ""}`}
      >
        {buttonInfo ? buttonInfo.text : ""}
      </div>
    </div>
  );
};

export default Button;
