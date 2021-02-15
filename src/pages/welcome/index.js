import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import Button from "components/general/Button";

import { ArrowForward } from "assets/icons";

const WelcomeScreen = () => {
  const history = useHistory();

  return (
    <div className="welcome-screen">
      <div className="background">
        <div className="position-relative h-100 w-100">
          <div className="auroral-agrabah" />
        </div>
      </div>
      <div className="welcome-screen__title">
        <h1>Welcome to Aurora</h1>
        <h4>Glad to have you!</h4>
      </div>
      <Button
        Icon={ArrowForward}
        text="Continue"
        button="A"
        onPress={() => history.push("/")}
        behaviour="always"
      />
    </div>
  );
};

export default WelcomeScreen;
