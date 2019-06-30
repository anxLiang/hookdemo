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

  render() {
    return (
      <nav className="nav-menu">
        <ul className="menu-list">
          <li>
            <i className="icon-dashboard" />
            <Link className="menu-text" to="/dashboard">
              DASHBOARD
            </Link>
          </li>
          <li>
            <i className="icon-sitemap" />
            <Link className="menu-text" to="/agents">
              AGENT
            </Link>
          </li>
          <li>
            <i className="icon-boat" />
            <Link className="menu-text" to="/mycruise">
              MY CRUISE
            </Link>
          </li>
          <li>
            <i className="icon-life-bouy" />
            <Link className="menu-text" to="/help">
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
