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

const ROUTE_LIST = [
  {
    path: "/",
    component: AgentsContent
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
    this.state = {};
  }
  render() {
    return (
      <div id="app-portal">
        <HeaderBar />
        <SideMenu />
        <div id="app-content" className="app-content">
          <HashRouter>
            <Switch>
              {ROUTE_LIST.map((item, index) => (
                <Route
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              ))}
              <Route component={NotFound} />
            </Switch>
          </HashRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AppPortal;
