import React, { useState } from "react";

import useGamepadDirection from "hooks/useGamepadDirection";
import useGamepadButton from "hooks/useGamepadButton";

const ListItem = ({ item, isActive }) => {
  return (
    <div className={`list-item${isActive ? " active" : ""}`}>
      <item.icon size={20} />
      <span className="list-item__title">{item.title}</span>
    </div>
  );
};

const List = ({ items }) => {
  const [activeItem, setActiveItem] = useState(0);

  useGamepadButton({
    2: {
      onButtonDown: () =>
        items[activeItem].onPress ? items[activeItem].onPress() : null,
    },
  });

  useGamepadDirection({
    onUp: () =>
      setActiveItem((lastState) =>
        lastState === 0 ? lastState : lastState - 1
      ),
    onDown: () =>
      setActiveItem((lastState) =>
        lastState === items.length - 1 ? lastState : lastState + 1
      ),
  });

  return (
    <div className="list">
      {items.map((item, i) => (
        <ListItem item={item} isActive={i === activeItem} />
      ))}
    </div>
  );
};

export default List;
