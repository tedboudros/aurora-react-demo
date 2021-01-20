import React from "react";

import Modal from "components/general/Modal";

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
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Menu"}>
      <List items={listItems} />
    </Modal>
  );
};

export default StartMenu;
