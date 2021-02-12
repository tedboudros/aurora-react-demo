import React, { useState, useEffect } from "react";

import Button from "./Button";

import useActions from "hooks/useActions";
import * as drawerActions from "store/drawer/actions";

import { ArrowBack } from "assets/icons";

const Drawer = ({ children, isOpen, setIsOpen, title, closeButton }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isUsable, setIsUsable] = useState(false);
  const [setIsDrawerOpen] = useActions([drawerActions.setIsDrawerOpen]);

  useEffect(() => {
    let isVisibleTimeout, isUsableTimeout;

    if (isOpen) setIsVisible(true);
    else isVisibleTimeout = setTimeout(() => setIsVisible(false), 200);

    if (!isOpen) setIsUsable(false);
    else isUsableTimeout = setTimeout(() => setIsUsable(true), 200);

    setIsDrawerOpen(isOpen);

    return () => {
      if (isVisibleTimeout) clearTimeout(isVisibleTimeout);
      if (isUsableTimeout) clearTimeout(isUsableTimeout);
    };
  }, [isOpen]);

  return (
    <div className="drawer__container">
      <div className={`drawer__backdrop ${isOpen ? "active" : ""}`} />
      <div className={`drawer ${isOpen ? "active" : ""}`}>
        {title ? <div className="drawer__title">{title}</div> : null}
        <div className="d-flex flex-column justify-content-between h-100">
          {isVisible ? <div className="drawer__inner">{children}</div> : null}

          <div className="my-4">
            {isVisible ? (
              <Button
                text="Back"
                Icon={ArrowBack}
                button="B"
                onPress={() => (isUsable ? setIsOpen(false) : null)}
                behaviour="drawer"
              />
            ) : null}
            {closeButton && isVisible ? (
              <div className="d-none">
                <Button
                  text="BACK"
                  Icon={ArrowBack}
                  button={closeButton}
                  onPress={() => (isUsable ? setIsOpen(false) : null)}
                  behaviour="drawer"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Drawer);
