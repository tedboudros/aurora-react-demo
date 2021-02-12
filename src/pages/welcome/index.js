import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

import Button from "components/general/Button";

import { ArrowForward } from "assets/icons";

const WelcomeScreen = () => {
  const history = useHistory();

  return (
    <div className="welcome-screen">
      <span className="welcome-screen__title">Welcome to Aurora!</span>
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
