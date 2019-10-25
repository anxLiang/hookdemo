import React, { Component } from "react";

import SubContent from "components/HistoryList/SubContent";

// import 'assets/styles/common.less';
// import './index.less';

class ProjectPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  subContent = (record, index, indent, expanded) => {
    return <SubContent data={record.parameters} />;
  };

  render() {
    return <div id="app-portal" onClick={this.handleRootClick}></div>;
  }
}

export default ProjectPortal;
