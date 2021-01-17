import React from "react";

import Modal from "components/general/Modal";

import { selectActiveGame } from "store/home/selectors";
import { useSelector } from "react-redux";

import config from "./config";

const DetailsModal = ({ isOpen, setIsOpen }) => {
  const activeGame = useSelector(selectActiveGame);

  const activeContent = config(activeGame);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Game details:"}>
      <div className="d-flex flex-column align-items-start justify-content-center">
        {Object.keys(activeContent).map((key) => {
          return (
            <span key={key} className={activeContent[key].className || ""}>
              {activeContent[key].title}: <b>{activeContent[key].value}</b>
            </span>
          );
        })}
      </div>
    </Modal>
  );
};

export default DetailsModal;
