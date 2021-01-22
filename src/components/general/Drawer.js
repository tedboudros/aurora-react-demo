import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

import { useSelector } from "react-redux";
import { selectIsDrawerOpen } from "store/drawer/selectors";

import useActions from "hooks/useActions";
import * as drawerActions from "store/drawer/actions";

const Drawer = ({ children, isOpen, title }) => {
  const [setIsDrawerOpen] = useActions([drawerActions.setIsDrawerOpen]);
  const isDrawerOpen = useSelector(selectIsDrawerOpen);

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
    <>
      <div className={`drawer__backdrop ${isOpen ? "active" : ""}`} />
      <div className={`drawer ${isOpen ? "active" : ""}`}>
        {title ? <div className="drawer__title">{title}</div> : null}
        {isDrawerOpen ? <div className="drawer__inner">{children}</div> : null}
      </div>
    </>
  );
};

const DrawerPortal = (props) => {
  const domContainer = document.getElementById("drawer-container");
  return domContainer
    ? ReactDOM.createPortal(<Drawer {...props} />, domContainer)
    : null;
};

export default React.memo(DrawerPortal);
