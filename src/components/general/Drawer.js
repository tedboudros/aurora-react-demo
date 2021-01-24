import React, { useState, useEffect } from "react";

import useGamepadButton from "hooks/useGamepadButton";

import { useSelector } from "react-redux";
import { selectIsDrawerOpen } from "store/drawer/selectors";

import useActions from "hooks/useActions";
import * as drawerActions from "store/drawer/actions";

const Drawer = ({ children, isOpen, setIsOpen, title }) => {
  const [setIsDrawerOpen] = useActions([drawerActions.setIsDrawerOpen]);
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

  useGamepadButton(
    {
      1: {
        onButtonDown: () => setIsOpen(() => false),
      },
    },
    "drawer"
  );

  useEffect(() => {
    if (isOpen) {
      setIsDrawerOpen(isOpen);
      return;
    }

    const timeout = setTimeout(() => {
      setIsDrawerOpen(isOpen);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    <div className="drawer__container">
      <div className={`drawer__backdrop ${isOpen ? "active" : ""}`} />
      <div className={`drawer ${isOpen ? "active" : ""}`}>
        {title ? <div className="drawer__title">{title}</div> : null}
        {isDrawerOpen ? <div className="drawer__inner">{children}</div> : null}
      </div>
    </div>
  );
};

export default React.memo(Drawer);
