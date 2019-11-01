import React from "react";

import { Core1, Core2 } from "../../core";

const CorePortal = props => {
  return (
    <div>
      {Core1}
      <Core2 id="core2" onClick={() => console.log("core2")} />
    </div>
  );
};

export default CorePortal;
