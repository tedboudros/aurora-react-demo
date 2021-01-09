import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import configureStore from "store";
import Renderer from "components/renderer";

import { background } from "assets/styles/colors";

ReactDOM.render(
  <Renderer background={background}>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </Renderer>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
