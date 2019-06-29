import React from "react";

import "./index.less";

const ICON_MAP = {
  Building: "icon-cog",
  Idle: "icon-coffee"
};

function StateCard(props) {
  return (
    <div className="card-wrap">
      <div className={`state-card card-type-${props.state}`}>
        <div className="card-bg-animation">
          <i className={ICON_MAP[props.state]} />
        </div>
        <p className="state-text">{props.state}</p>
        <p className="state-num">{props.num}</p>
      </div>
    </div>
  );
}

export default StateCard;
