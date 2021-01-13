import React from "react";

import buttonClassnames from "constants/buttonClassnames";

const Button = ({ text, className, isPressed, Icon, button }) => {
  const previewButton = buttonClassnames[button];

  console.log(buttonClassnames, previewButton, button);

  return (
    <div className={`button ${className}  ${isPressed ? "pressed" : ""}`}>
      <div className="d-flex justify-content-center align-items-center">
        <Icon size={18} className="mr-2" />
        {text}
      </div>
      <div
        className={`button__preview ${
          previewButton ? previewButton.className : ""
        }`}
      >
        {previewButton ? previewButton.text : ""}
      </div>
    </div>
  );
};

export default Button;
