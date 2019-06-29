import React, { Component } from "react";
import classNames from "classnames";

import StateCard from "./components/StateCard";

import "./index.less";

class AgentsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeCond: "all",
      styleType: "list"
    };
  }

  selectType = type => e => {
    this.setState({ typeCond: type });
  };
  selectStyle = type => e => {
    this.setState({ styleType: type });
  };

  render() {
    const { typeCond, styleType } = this.state;
    return (
      <div className="agents-wrap">
        <div className="state-area">
          <StateCard state="Building" num={3} />
          <StateCard state="Idle" num={3} />
          <div className="card-wrap">
            <div className="total-card">
              <div className="info-block">
                <p className="info-title">All</p>
                <p className="info-data">3</p>
              </div>
              <div className="info-block">
                <p className="info-title">PHYSICAL</p>
                <p className="info-data">3</p>
              </div>
              <div className="info-block">
                <p className="info-title">VIRTUAL</p>
                <p className="info-data">3</p>
              </div>
            </div>
          </div>
        </div>
        <div className="option-area">
          <div className="type-list">
            <ul>
              <li
                className={classNames({ active: typeCond === "all" })}
                onClick={this.selectType("all")}
              >
                All
              </li>
              <li
                className={classNames({ active: typeCond === "physical" })}
                onClick={this.selectType("physical")}
              >
                Physical
              </li>
              <li
                className={classNames({ active: typeCond === "virtual" })}
                onClick={this.selectType("virtual")}
              >
                Virtual
              </li>
            </ul>
          </div>
          <div className="input-search">
            <i className="icon-search" />
            <input type="text" />
          </div>
          <div className="style-list">
            <i
              className={classNames("icon-th-card", {
                active: styleType === "card"
              })}
              onClick={this.selectStyle("card")}
            />
            <i
              className={classNames("icon-th-list", {
                active: styleType === "list"
              })}
              onClick={this.selectStyle("list")}
            />
          </div>
        </div>
        <div className="CI-list" />
      </div>
    );
  }
}

export default AgentsContent;
