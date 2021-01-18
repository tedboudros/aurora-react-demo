import React from "react";

import logo from "assets/png/logo.png";

import Time from "components/home-page/Time";

import { IoIosNotificationsOutline } from "react-icons/io";
import { IoVolumeHighOutline } from "react-icons/io5";

const HomeHeader = () => {
  return (
    <div className="home-screen__header d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <img className="home-screen__header--logo" src={logo} />
        <span className="ml-3">aurora</span>
        <span className="ml-1 text-small">
          v{process.env.REACT_APP_AURORA_VERSION}
        </span>
      </div>
      <div className="home-screen__header--time">
        <Time />
      </div>
      <div className="home-screen__icons">
        <IoVolumeHighOutline size={22} className="mr-2" />
        <IoIosNotificationsOutline size={24} />
      </div>
    </div>
  );
};

export default HomeHeader;
