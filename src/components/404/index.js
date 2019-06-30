import React, { Component } from "react";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          height: "500px",
          textAlign: "center",
          fontSize: "100px",
          lineHeight: "800px"
        }}
      >
        Sorry! This page is missed.
      </div>
    );
  }
}

export default NotFound;
