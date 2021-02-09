import React from "react";

import Drawer from "components/general/Drawer";

import { Close, Minimize } from "assets/icons";

import List from "components/general/List";
import useActions from "hooks/useActions";

import * as homeActions from "store/apps/actions";

const StartMenu = ({ isOpen, setIsOpen }) => {
  const [quitApp, toggleFullscreen] = useActions([
    homeActions.quitApp,
    homeActions.toggleFullscreen,
  ]);

  const listItems = [
    { icon: Minimize, title: "Toggle fullscreen", onPress: toggleFullscreen },
    { icon: Close, title: "Quit", onPress: quitApp },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Menu"}
      closeButton="start"
    >
      <div className="d-flex flex-column justify-content-between h-100">
        <List items={listItems} behaviour="drawer" />
      </div>
    </Drawer>
  );
};

export default StartMenu;
