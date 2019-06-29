import React, { Component } from "react";
import { Link } from "react-router-dom";

import History from "components/history";

import "./index.less";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="nav-menu">
        <ul className="menu-list">
          <li>
            <i className="icon-dashboard" />
            <Link className="menu-text" to="">
              DASHBOARD
            </Link>
          </li>
          <li>
            <i className="icon-sitemap" />
            <Link className="menu-text" to="">
              AGENT
            </Link>
          </li>
          <li>
            <i className="icon-boat" />
            <Link className="menu-text" to="">
              MY CRUISE
            </Link>
          </li>
          <li>
            <i className="icon-life-bouy" />
            <Link className="menu-text" to="">
              HELP
            </Link>
          </li>
        </ul>
        <History />
      </nav>
    );
  }
}

export default SideMenu;
