import React, { Component } from "react";

import "./index.less";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="history-wrap">
        <h2>History</h2>
        <ul className="history-list">
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
          <li>12312312</li>
        </ul>
      </div>
    );
  }
}

export default History;
