import React, { useState, useEffect } from "react";

import useGamepadDirection from "hooks/useGamepadDirection";
import useGamepadButton from "hooks/useGamepadButton";
import useSoundEffect from "hooks/useSoundEffect";

import Button from "../Button";

const List = ({ items, behaviour }) => {
  const [activeItem, setActiveItem] = useState(0);
  const playSoundEffect = useSoundEffect("tap");

  useEffect(() => {
    playSoundEffect();
  }, [activeItem]);

  useGamepadDirection(
    {
      onUp: () => {
        setActiveItem((lastState) =>
          lastState === 0 ? lastState : lastState - 1
        );
      },
      onDown: () => {
        setActiveItem((lastState) =>
          lastState === items.length - 1 ? lastState : lastState + 1
        );
      },
    },
    behaviour
  );

  return (
    <div className="list">
      {items.map((item, i) => (
        <Button
          key={i}
          text={item.title}
          Icon={item.icon}
          button="A"
          onPress={item.onPress}
          highlighted={i === activeItem}
          list
          disabled={!(item.onPress && i === activeItem)}
          behaviour="drawer"
          className="mb-2"
        />
      ))}
    </div>
  );
};

export default List;
