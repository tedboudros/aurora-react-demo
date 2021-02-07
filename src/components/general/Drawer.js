import React, { useState, useEffect } from "react";

import Button from "./Button";

import useActions from "hooks/useActions";
import * as drawerActions from "store/drawer/actions";

import { ArrowBack } from "assets/icons";

const Drawer = ({ children, isOpen, setIsOpen, title, closeButton }) => {
  const [setIsDrawerOpen] = useActions([drawerActions.setIsDrawerOpen]);

  useEffect(() => {
    setIsDrawerOpen(isOpen);
  }, [isOpen]);

  return (
    <div className="drawer__container">
      <div className={`drawer__backdrop ${isOpen ? "active" : ""}`} />
      <div className={`drawer ${isOpen ? "active" : ""}`}>
        {title ? <div className="drawer__title">{title}</div> : null}
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="drawer__inner">{children}</div>
          <div className="my-4">
            <Button
              text="back"
              Icon={ArrowBack}
              button="B"
              onPress={() => setIsOpen(false)}
              behaviour="drawer"
            />
            {closeButton && isOpen ? (
              <div className="d-none">
                <Button
                  text="BACK"
                  Icon={ArrowBack}
                  button={closeButton}
                  onPress={() => setIsOpen(false)}
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
