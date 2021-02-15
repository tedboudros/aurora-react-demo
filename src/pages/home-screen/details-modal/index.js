import React from "react";

import Drawer from "components/general/Drawer";
import InfoCard from "components/general/InfoCard";

import { selectActiveApp } from "store/apps/selectors";
import { useSelector } from "react-redux";

import config from "./config";

const DetailsModal = ({ isOpen, setIsOpen }) => {
  const activeApp = useSelector(selectActiveApp);
  if (!activeApp) return null;

  const isActiveGameValid = Object.keys(activeApp).length;

  const activeContent = config(isActiveGameValid ? activeApp : null);

  return isActiveGameValid ? (
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Details:"}
      closeButton="Y"
    >
      <div className="d-flex align-items-center flex-wrap">
        {Object.keys(activeContent).map((key) => {
          return activeContent[key].value ? (
            <InfoCard
              key={key}
              className={`mx-1 ${activeContent[key].className || ""}`}
              title={activeContent[key].title}
              value={activeContent[key].value}
            />
          ) : null;
        })}
      </div>
    </Drawer>
  ) : null;
};

export default DetailsModal;
