import React from "react";

import ReactDOM from "react-dom";

const Drawer = ({ children, isOpen }) => {
  return <div className={`drawer ${isOpen ? "active" : ""}`}>{children}</div>;
};

const DrawerPortal = (props) => {
  const domContainer = document.getElementById("drawer-container");
  return domContainer
    ? ReactDOM.createPortal(<Drawer {...props} />, domContainer)
    : null;
};

export default DrawerPortal;
