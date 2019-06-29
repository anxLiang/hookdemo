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
    component: DashboardContent
  },
  {
    path: "/agents",
    component: AgentsContent
  },
  {
    path: "/dashboard",
    component: DashboardContent
  },
  {
    path: "/mycruise",
    component: MyCruiseContent
  },
  {
    path: "/help",
    component: HelpContent
  }
];

class AppPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserOptions: false
    };
  }

  switchUserOption = () => {
    this.setState({ showUserOptions: !this.state.showUserOptions });
  };

  handleRootClick = e => {
    if (this.state.showUserOptions) {
      this.setState({ showUserOptions: false });
    }
    // TODO: 检测弹窗
  };

  render() {
    const { showUserOptions } = this.state;
    return (
      <div id="app-portal" onClick={this.handleRootClick}>
        <HeaderBar
          switchUserOption={this.switchUserOption}
          showUserOptions={showUserOptions}
        />
        <section id="main-content" className="main-content">
          <HashRouter>
            <div className="app-menu">
              <SideMenu />
            </div>
            <div id="app-content" className="app-content">
              <Switch>
                {ROUTE_LIST.map((item, index) => (
                  <Route
                    key={item.path}
                    {...item}
                  />
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
