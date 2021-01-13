import React, { useState } from "react";

import buttons from "constants/buttons";
import useGamepadButton from "hooks/useGamepadButton";

const Button = ({ text, className, onPress, Icon, button }) => {
  const [isButtonDown, setIsButtonDown] = useState(false);

  const buttonInfo = buttons[button];

  useGamepadButton({
    [buttonInfo.buttonIndex]: {
      onButtonDown: () => {
        setIsButtonDown(true);
        if (onPress) onPress();
      },
      onButtonUp: () => {
        setIsButtonDown(false);
      },
    },
  });

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
