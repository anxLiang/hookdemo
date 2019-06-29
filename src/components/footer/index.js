import React, { Component } from "react";

import "./index.less";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <footer className="tw-footer">&copy; Copyright 2017 <span style={{fontWeight: "bold"}}>Thought</span>Works</footer>;
  }
}

export default Footer;
