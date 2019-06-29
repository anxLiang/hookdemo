import React, { Component } from "react";
import classNames from "classnames";

import logo from "assets/logo/logo.svg";
import icon from "../../logo.svg";
import "./index.less";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.userIcon = React.createRef();
  }

  componentDidMount() {
    // 获取用户信息...
    // this.userIcon.style.backgroundImage = "图片地址"
    console.log(this.userIcon.src);
  }

  handleAngleClick = e => {
    e.stopPropagation();
    this.props.switchUserOption && this.props.switchUserOption();
  };

  render() {
    const { showUserOptions } = this.props;
    return (
      <header className="tw-header">
        <h1 className="tw-header-text">
          <img src={logo} alt="" height="40" />
        </h1>
        <div id="user" className="user-info">
          <div className="user-icon-wrap">
            <img
              ref={el => (this.userIcon = el)}
              className="user-icon"
              src={icon}
              alt=""
            />
            <i
              className={classNames({
                "icon-angle-down": !showUserOptions,
                "icon-angle-up": showUserOptions
              })}
              onClick={this.handleAngleClick}
            />
          </div>
          <div
            className={classNames("user-op-list", {
              "show-uol": showUserOptions
            })}
            // 阻止菜单点击冒泡而隐藏
            onClick={e => e.stopPropagation()}
          >
            {/* 可以条件渲染用户菜单，可以抽象 */}
            <ul>
              <li>
                <i className="icon-id-card" />
                <a className="user-op-text" href="javascript:void(0);">
                  Profile
                </a>
              </li>
              <li>
                <i className="icon-sign-in" />
                <a className="user-op-text" href="javascript:void(0);">
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
