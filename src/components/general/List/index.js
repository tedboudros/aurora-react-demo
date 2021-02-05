import React, { useState, useEffect } from "react";

import useGamepadDirection from "hooks/useGamepadDirection";
import useGamepadButton from "hooks/useGamepadButton";
import useSoundEffect from "hooks/useSoundEffect";

const ListItem = ({ item, isActive }) => {
  return (
    <div className={`list-item${isActive ? " active" : ""}`}>
      <item.icon size={20} />
      <span className="list-item__title">{item.title}</span>
    </div>
  );
};

const List = ({ items, behaviour }) => {
  const [activeItem, setActiveItem] = useState(0);
  const playSoundEffect = useSoundEffect("tap");

  useEffect(() => {

    playSoundEffect();
  }, [activeItem])

  useGamepadButton(
    {
      0: {
        onButtonDown: () =>
          items[activeItem].onPress ? items[activeItem].onPress() : null,
      },
    },
    "drawer"
  );

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
        <ListItem item={item} isActive={i === activeItem} />
      ))}
    </div>
  );
};

export default List;
