import React from "react";

import Modal from "components/general/Modal";

import { selectActiveGame } from "store/home/selectors";
import { useSelector } from "react-redux";

import config from "./config";

const DetailsModal = ({ isOpen, setIsOpen }) => {
  const activeGame = useSelector(selectActiveGame);

  const activeContent = config(activeGame);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {Object.keys(activeContent).map((key) => {
        return (
          <span>
            {activeContent[key].title}: <b>{activeContent[key].value}</b>
          </span>
        );
      })}
    </Modal>
  );
};

export default DetailsModal;
