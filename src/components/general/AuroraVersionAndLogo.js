import React from "react";

import logo from "assets/icon/logo.png";

const AuroraVersionAndLogo = () => {
  return (
    <div className="d-flex align-items-center">
      <img className="home-screen__header--logo" src={logo} />
      <span className="ml-3">aurora</span>
      <span className="ml-1 text-small">
        alpha v{process.env.REACT_APP_AURORA_VERSION}
      </span>
    </div>
  );
};

export default AuroraVersionAndLogo;
