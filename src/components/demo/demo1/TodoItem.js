import React from "react";

import { Icon } from "antd";

const TodoItem = props => {
  return (
    <div className="item-wrapper">
      <Icon
        className="status"
        type={props.item.status === 0 ? "close-circle" : "check-circle"}
      />
      <span className="title">{props.item.title}</span>
      <div className="item-opts">
        {props.item.status === 0 && (
          <Icon type="edit" onClick={() => props.edit(props.item)} />
        )}
        <Icon
          className="change-status"
          type={props.item.status === 1 ? "close-circle" : "check-circle"}
          onClick={() => {
            props.setStatus({ ...props.item, status: props.item.status ^ 1 });
          }}
        />
        <Icon type="delete" onClick={() => props.delete(props.item.id)} />
      </div>
    </div>
  );
};

export default TodoItem;
