import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

const Drawer = ({ children, isOpen, title }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActive(isOpen);
      return;
    }

    const timeout = setTimeout(() => {
      setActive(() => isOpen);
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  return (
    <div className={`drawer ${isOpen ? "active" : ""}`}>
      {title ? <div className="drawer__title">{title}</div> : null}
      {active ? <div className="drawer__inner">{children}</div> : null}
    </div>
  );
};

const DrawerPortal = (props) => {
  const domContainer = document.getElementById("drawer-container");
  return domContainer
    ? ReactDOM.createPortal(<Drawer {...props} />, domContainer)
    : null;
};

export default React.memo(DrawerPortal);
