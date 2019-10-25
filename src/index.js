import React from "react";
import "core-js";
import ReactDOM from "react-dom";
import "./index.less";
import Portal from "modules/portal";
import * as serviceWorker from "./serviceWorker";
import "tinper-bee/assets/tinper-bee.css";
import "antd/dist/antd.css";

ReactDOM.render(<Portal />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
