import React from "react";

import Button from "components/general/Button";
import List from "components/general/List";

import { ArrowBack, Minimize, Close } from "assets/icons";

import { useHistory } from "react-router-dom";

import { Row, Col } from "reactstrap";

const Settings = () => {
  const history = useHistory();

  const listItems = [
    { icon: Minimize, title: "Toggle fullscreen", onPress: () => null },
    { icon: Close, title: "Quit", onPress: () => null },
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
