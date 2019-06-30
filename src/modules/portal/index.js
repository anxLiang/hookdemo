import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import HeaderBar from "components/header";
import SideMenu from "components/sideMenu";
import Footer from "components/footer";
import NotFound from "components/404";
import AgentsContent from "modules/agents";
import DashboardContent from "modules/dashboard";
import MyCruiseContent from "modules/myCruise";
import HelpContent from "modules/help";

import "assets/styles/common.less";
import "./index.less";

const ROUTE_LIST = [
  {
    exact: true,
    path: "/",
    component: NotFound
  },
  {
    path: "/agents",
    component: AgentsContent
  },
  {
    path: "/dashboard",
    component: NotFound
  },
  {
    path: "/mycruise",
    component: NotFound
  },
  {
    path: "/help",
    component: NotFound
  }
];

class AppPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserOptions: false,
      activeMenu: ""
    };
  }

  switchUserOption = () => {
    this.setState({ showUserOptions: !this.state.showUserOptions });
  };

  handleRootClick = e => {
    if (this.state.showUserOptions) {
      this.setState({ showUserOptions: false });
    }
  };

  setActiveMenu = menu => {
    this.setState({ activeMenu: menu });
  };

  render() {
    const { showUserOptions, activeMenu } = this.state;
    return (
      <div id="app-portal" onClick={this.handleRootClick}>
        <HeaderBar
          switchUserOption={this.switchUserOption}
          showUserOptions={showUserOptions}
        />
        <section id="main-content" className="main-content">
          <HashRouter>
            <div className="app-menu">
              <SideMenu setMenu={this.setActiveMenu} activeMenu={activeMenu} />
            </div>
            <div id="app-content" className="app-content">
              <Switch>
                {ROUTE_LIST.map((item, index) => (
                  <Route key={item.path} {...item} />
                ))}
                <Route component={NotFound} />
              </Switch>
            </div>
          </HashRouter>
        </section>
        <Footer />
      </div>
    );
  }
}

export default AppPortal;
