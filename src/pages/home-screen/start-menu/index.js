import React from "react";

import Drawer from "components/general/Drawer";

import { Close, Minimize } from "assets/icons";

import List from "components/general/List";
import useActions from "hooks/useActions";

import * as homeActions from "store/home/actions";

const StartMenu = ({ isOpen, setIsOpen }) => {
  const [quitApp, toggleFullscreen] = useActions([
    homeActions.quitApp,
    homeActions.toggleFullscreen,
  ]);

  const listItems = [
    { icon: Minimize, title: "Toggle fullscreen", onPress: toggleFullscreen },
    { icon: Close, title: "Quit aurora", onPress: quitApp },
  ];

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title={"Menu"}>
      <div className="d-flex flex-column justify-content-between h-100">
        <List items={listItems} behaviour="drawer" />
      </div>
    </Drawer>
  );
};

export default StartMenu;
