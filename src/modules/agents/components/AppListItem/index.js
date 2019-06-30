import React, { Component } from "react";

import ResourceModal from "../ResourceModal/Modal";

import { updateTargetAgent } from "server";

import centos from "assets/osicons/cent_os.png";
import debian from "assets/osicons/debian.png";
import suse from "assets/osicons/suse.png";
import ubuntu from "assets/osicons/ubuntu.png";
import windows from "assets/osicons/windows.png";
import "./index.less";

const OS_MAP = {
  centos: centos,
  debian: debian,
  suse: suse,
  ubuntu: ubuntu,
  windows: windows
};

class AppListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddResource = e => {
    const modal = <ResourceModal className="" data={this.props.appInfo} callback={this.props.getAllAgents}/>;
    ResourceModal.create(this, modal, e.target.parentNode);
  };

  handleDeleteResource = index => e => {
    const { appInfo, getAllAgents } = this.props;
    const oldResources = appInfo.resources;
    let newResources = oldResources.slice();
    newResources.splice(index, 1);
    updateTargetAgent({
      ...this.props.appInfo,
      resources: newResources
    }).then(res => {
      console.log(res);
      alert("删除成功！");
      getAllAgents && getAllAgents();
    })
  };

  render() {
    const { appInfo } = this.props;
    return (
      <div className="app-item-wrap">
        <div className="app-item-content">
          <div className="app-icon">
            <img src={OS_MAP[appInfo.os]} alt="" width="80" height="80" />
          </div>
          <div className="app-info">
            <div className="app-info-basic">
              <div className="info-block">
                <i className="icon-desktop" />
                <span className="item-name">{appInfo.name}</span>
              </div>
              <div
                className="info-block"
                style={{ textAlign: "center", paddingTop: "5px" }}
              >
                <span className={`item-state state-type-${appInfo.status}`}>
                  {appInfo.status}
                </span>
              </div>
              <div className="info-block">
                <i className="icon-info" />
                <span className="item-ip">{appInfo.ip}</span>
              </div>
              <div className="info-block">
                <i className="icon-folder" />
                <span className="item-address">{appInfo.location}</span>
              </div>
            </div>
            <div className="app-info-resource">
              <div className="add-btn">
                <i className="icon-plus" onClick={this.handleAddResource} />
              </div>
              <ul>
                {appInfo.resources.map((item, index) => {
                  return (
                    <li key={index} className="resource-item">
                      <span className="rs-text">{item}</span>
                      &nbsp;
                      <i
                        className="icon-trash"
                        onClick={this.handleDeleteResource(index)}
                      />
                    </li>
                  );
                })}
              </ul>
              {appInfo.status === "building" ? (
                <button className="deny-btn" onClick={undefined}>
                  <i className="icon-deny" />
                  &nbsp;Deny
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppListItem;
