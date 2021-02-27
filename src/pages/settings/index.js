import React, { useEffect, useState } from "react";

import Button from "components/general/Button";
import List from "components/general/List";

import { ArrowBack, Info, Close } from "assets/icons";

import { useHistory } from "react-router-dom";

import { Row, Col } from "reactstrap";

const settingsPanels = {
  about: {
    component: () => "hello",
    icon: Close,
    title: "",
  },
};

const Settings = () => {
  const history = useHistory();

  const listItems = [
    { icon: Info, title: "About Aurora", onPress: () => null },
    {
      icon: Close,
      title: "Restore Aurora settings to defaults",
      onPress: () => null,
    },
  ];

  return (
    <div className="h-100 w-100">
      <div className="background">
        <div className="auroral-northern" />
      </div>
      <div className="h-100 pb-3 pt-5 pl-5 pr-4">
        <Row className="h-100">
          <Col xs={3}>
            <h2 className="text-light mb-5">Settings</h2>
            <List items={listItems} />
          </Col>
          <Col xs={7}></Col>
          <Col xs={2} className="d-flex justify-content-end flex-column">
            <Button
              Icon={ArrowBack}
              text="Go Back"
              button="B"
              onPress={() => history.push("/")}
              behaviour="always"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Settings;
