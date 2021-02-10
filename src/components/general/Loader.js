import React, { useState, useEffect } from "react";

import Button from "./Button";
import { ArrowBack } from "assets/icons";

const Loader = ({ isLoading, canGoBack, goBack }) => {
  return (
    <div className={`page-loader ${isLoading ? "active" : ""}`}>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
      {canGoBack ? (
        <div className="page-loader__back">
          <div>
            Game didn't load? <strong>Go back!</strong>
          </div>

          <Button
            text="BACK"
            Icon={ArrowBack}
            className="mt-4"
            button={"B"}
            onPress={goBack}
            behaviour="always"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
