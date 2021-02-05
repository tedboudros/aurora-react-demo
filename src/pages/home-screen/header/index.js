import React from "react";

import Time from "components/home-page/Time";

import { Home } from "assets/icons";

const HomeHeader = () => {
  return (
    <div className="home-screen__header d-flex justify-content-between">
      <div>
        <span className="ml-3 d-flex align-items-center">
          <Home size={20} className="mr-2" /> Home
        </span>
      </div>
      <div className="mr-3">
        <Time />
      </div>
    </div>
  );
};

export default HomeHeader;
