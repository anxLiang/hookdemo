import React, { Component } from "react";
import classNames from "classnames";

import StateCard from "./components/StateCard";
import AgentListItem from "./components/AppListItem";

import { getAllAgents } from "server";

import "./index.less";

class AgentsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeCond: "agents",
      styleType: "list",
      agents: [],
      displayAgents: [],
      // 保存一份数据，分类渲染时计算取出即可，在此用空间换性能
      physical: [],
      virtual: [],
      building: [],
      idle: []
    };
  }

  componentDidMount() {
    this.getAllAgents();
  }

  getAllAgents = () => {
    getAllAgents().then(res => {
      if (res.length === 0) return console.log("暂无数据！");
      let handleData = {
        physical: [],
        virtual: [],
        building: [],
        idle: []
      };
      res.forEach(item => {
        handleData[item.status].push(item);
        handleData[item.type].push(item);
      });
      this.setState({
        agents: res,
        displayAgents: res,
        ...handleData
      });
    });
  }

  selectType = type => e => {
    this.setState({
      typeCond: type,
      displayAgents: this.state[type]
    });
  };
  selectStyle = type => e => {
    this.setState({ styleType: type });
  };

  render() {
    const { typeCond, styleType, displayAgents, building, idle, physical, virtual, agents } = this.state;
    return (
      <div className="agents-wrap">
        <div className="state-area">
          <StateCard state="Building" num={building.length} />
          <StateCard state="Idle" num={idle.length} />
          <div className="card-wrap">
            <div className="total-card">
              <div className="info-block">
                <p className="info-title">All</p>
                <p className="info-data">{agents.length}</p>
              </div>
              <div className="info-block">
                <p className="info-title">PHYSICAL</p>
                <p className="info-data">{physical.length}</p>
              </div>
              <div className="info-block">
                <p className="info-title">VIRTUAL</p>
                <p className="info-data">{virtual.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="option-area">
          <div className="type-list">
            <ul>
              <li
                className={classNames({ active: typeCond === "agents" })}
                onClick={this.selectType("agents")}
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
        <div className="CI-list">
          {displayAgents.map((item, index) => {
            return <AgentListItem key={index + item.id} appInfo={item} getAllAgents={this.getAllAgents}/>;
          })}
        </div>
      </div>
    );
  }
}

export default AgentsContent;
