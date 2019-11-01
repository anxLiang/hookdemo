/* eslint-disable no-debugger */
import React from "react";
const Core1 = React.createElement("div", { id: "core1" }, "core1");

const Core2 = function(props) {
  return <div {...props}>core2</div>;
};

export {
  Core1,
  Core2
};
