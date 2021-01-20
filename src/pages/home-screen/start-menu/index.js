import React from "react";

import Drawer from "components/general/Drawer";

import { IoClose } from "react-icons/io5";
import { FiMinimize } from "react-icons/fi";

import List from "components/general/List";
import useActions from "hooks/useActions";

import * as homeActions from "store/home/actions";

const StartMenu = ({ isOpen, setIsOpen }) => {
  const [quitApp] = useActions([homeActions.quitApp]);

  const listItems = [
    { icon: IoClose, title: "Quit aurora", onPress: quitApp },
    { icon: FiMinimize, title: "Toggle fullscreen" },
  ];

  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title={"Menu"}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div />
        <List items={listItems} />
      </div>
    </Drawer>
  );
};

export default StartMenu;
