import React from "react";

import Drawer from "components/general/Drawer";

import { selectActiveGame } from "store/home/selectors";
import { useSelector } from "react-redux";

import config from "./config";

const DetailsModal = ({ isOpen, setIsOpen }) => {
  const activeGame = useSelector(selectActiveGame);

  const isActiveGameValid = Object.keys(activeGame).length;

  const activeContent = config(isActiveGameValid ? activeGame : null);

  return isActiveGameValid ? (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title={"Details:"}>
      <div className="d-flex flex-column align-items-start justify-content-center">
        {Object.keys(activeContent).map((key) => {
          return activeContent[key].value ? (
            <span key={key} className={activeContent[key].className || ""}>
              {activeContent[key].title}: <b>{activeContent[key].value}</b>
            </span>
          ) : null;
        })}
      </div>
    </Drawer>
  ) : null;
};

export default DetailsModal;
