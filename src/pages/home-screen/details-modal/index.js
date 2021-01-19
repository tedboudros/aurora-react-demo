import React from "react";

import Modal from "components/general/Modal";

import { selectActiveGame } from "store/home/selectors";
import { useSelector } from "react-redux";

import config from "./config";

const DetailsModal = ({ isOpen, setIsOpen }) => {
  const activeGame = useSelector(selectActiveGame);

  const isActiveGameValid = Object.keys(activeGame).length;

  const activeContent = config(isActiveGameValid ? activeGame : null);

  return isActiveGameValid ? (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Details:"}>
      <div className="d-flex flex-column align-items-start justify-content-center">
        {Object.keys(activeContent).map((key) => {
          return activeContent[key].value ? (
            <span key={key} className={activeContent[key].className || ""}>
              {activeContent[key].title}: <b>{activeContent[key].value}</b>
            </span>
          ) : null;
        })}
      </div>
    </Modal>
  ) : null;
};

export default DetailsModal;
