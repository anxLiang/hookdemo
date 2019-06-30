import React, { Component } from "react";
import { Link } from "react-router-dom";

import History from "components/history";

import { getHistory } from "server";

import "./index.less";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: []
    };
  }

  componentDidMount() {
    getHistory().then(res => {
      this.setState({ historyList: res });
    });
  }

  setActiveMenu = menu => e => {
    this.props.setMenu && this.props.setMenu(menu);
  };

  render() {
    return (
      <nav className="nav-menu">
        <ul className="menu-list">
          <li className={this.props.activeMenu === "dashboard" ? "active" : ""}>
            <i className="icon-dashboard" />
            <Link
              className="menu-text"
              to="/dashboard"
              onClick={this.setActiveMenu("dashboard")}
            >
              DASHBOARD
            </Link>
          </li>
          <li className={this.props.activeMenu === "agents" ? "active" : ""}>
            <i className="icon-sitemap" />
            <Link
              className="menu-text"
              to="/agents"
              onClick={this.setActiveMenu("agents")}
            >
              AGENT
            </Link>
          </li>
          <li className={this.props.activeMenu === "mycruise" ? "active" : ""}>
            <i className="icon-boat" />
            <Link
              className="menu-text"
              to="/mycruise"
              onClick={this.setActiveMenu("mycruise")}
            >
              MY CRUISE
            </Link>
          </li>
          <li className={this.props.activeMenu === "help" ? "active" : ""}>
            <i className="icon-life-bouy" />
            <Link
              className="menu-text"
              to="/help"
              onClick={this.setActiveMenu("help")}
            >
              HELP
            </Link>
          </li>
        </ul>
        <History historyList={this.state.historyList} />
      </nav>
    );
  }
}

export default SideMenu;
