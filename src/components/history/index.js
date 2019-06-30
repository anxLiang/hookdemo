import React from "react";

import "./index.less";

function History(props) {
  return (
    <div className="history-wrap">
      <h2>History</h2>
      <ul className="history-list">
        {[props.historyList.map((item, index) => {
          return <li key={index}>{item.operation}</li>
        })]}
      </ul>
    </div>
  );
}

export default History;
