import React, { Component } from "react";
import ReactDOM from "react-dom";

import { updateTargetAgent } from "server";

import "./Modal.less";

class ResourceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputBuffer = "";
  }

  closeModalAnyway = e => {
    const modal = document.getElementById("unique-modal-wrap");
    modal.parentNode.removeChild(modal);
  };

  handleInputChange = e => {
    // 存入缓存，无需更新整体，TODO:???
    this.inputBuffer = e.target.value;
  };

  addResources = e => {
    const { data, callback } = this.props;
    let newData = this.inputBuffer.replace(/\s/g, "").split(",");
    let newResources = new Array(...new Set(data.resources.concat(newData)));

    updateTargetAgent({
      ...data,
      resources: newResources
    }).then(res => {
      console.log(res);
      this.closeModalAnyway();
      alert("添加成功！");
      callback && callback();
    });
  };

  render() {
    return (
      <div id="modal-dialog" style={{ cursor: "default" }}>
        <div className="modal-backDrop" onClick={this.closeModalAnyway} />
        <div
          id="modal"
          className="modal-wrap"
          onClick={e => e.stopPropagation()}
        >
          <div className={`modal-content ${this.props.className || " "}`}>
            <div className="modal-header">
              <p className="modal-title" />
              <i className="icon-close" onClick={this.closeModalAnyway} />
            </div>
            <div className="modal-body">
              <p className="input-caption">
                Separate multiple resource name with commas
              </p>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="Input resource value"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={this.addResources}>Add Resources</button>
              <button onClick={this.closeModalAnyway}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @description 将模态框渲染到指定元素上
 * @param {Node} context 触发渲染的元素上下文
 * @param {Node} modal 要渲染的模态框
 * @param {Node} target 要渲染到的元素
 */
function createModal(context, modal, target) {
  const contextNode = target || ReactDOM.findDOMNode(context) || document.body;
  let wrap = document.createElement("div");
  wrap.setAttribute("id", "unique-modal-wrap");
  contextNode.appendChild(wrap);
  ReactDOM.render(modal, wrap);
}

ResourceModal.create = createModal;

export default ResourceModal;
