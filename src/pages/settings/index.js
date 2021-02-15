import React from "react";

import Button from "components/general/Button";
import { ArrowBack } from "assets/icons";

import { useHistory } from "react-router-dom";

const Settings = () => {
  const history = useHistory();
  return (
    <div>
      <Button
        Icon={ArrowBack}
        text="Go Back"
        button="B"
        onPress={() => history.push("/")}
        behaviour="always"
      />
    </div>
  );
};

export default Settings;
