import React, { useState, useReducer, useCallback } from "react";
import moment from "moment";
import uuid1 from "uuid/v1";

import { Button, Input, Modal, DatePicker } from "antd";
import TodoItem from "./TodoItem";

import axios from "axios";
axios.defaults.headers.post["Content-Type"] = axios.defaults.headers.delete[
  "Content-Type"
] = axios.defaults.headers.put["Content-Type"] = "application/json";

import { useTodoList } from "./hooks";
import { debounce } from "utils/tools";

import "./index.less";

const MODAL_TITLE = {
  add: "添加Todo",
  edit: "编辑Todo"
};

const reducers = {
  init: (state, payload) => ({ title: "", date: Date.now() }),
  title: (state, payload) => ({ ...state, title: payload }),
  date: (state, payload) => ({ ...state, date: payload }),
  open: (state, payload) => ({ ...state, ...payload })
};

const simpleReducer = (state, action) => {
  if (reducers.hasOwnProperty(action.type)) {
    return reducers[action.type](state, action.payload);
  } else {
    throw new Error(`未知的 action 类型：${action.type}`);
  }
};

// 函数组件本身就对应着类组件的 render 函数
const TodoList = () => {
  // ==============  状态声明区域  =================
  const [listData, setListData] = useTodoList();
  const [editData, dispatchEditData] = useReducer(simpleReducer, {
    title: "",
    date: Date.now()
  });
  const [formFlag, setFormFlag] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  // ===================  end  ==================

  // ===============  方法定义  ===============
  const completeForm = () => {
    if (formFlag === "add") {
      const id = uuid1();
      axios
        .post("/list", {
          id,
          detail: "",
          status: 0,
          ...editData
        })
        .then(() => {
          setShowFormModal(false);
          return getList();
        });
    } else if (formFlag === "edit") {
      modifyData(editData).then(() => setShowFormModal(false));
    }
  };

  const getList = () => {
    axios.get("/list").then(res => {
      setListData(res.data);
    });
  };

  const deleteItem = id => {
    axios.delete(`/list/${id}`).then(() => {
      return getList();
    });
  };

  const editItem = item => {
    dispatchEditData({ type: "open", payload: item });
    showForm("edit", true);
  };

  const modifyData = data => {
    axios.put(`/list/${data.id}`, data).then(() => {
      return getList();
    });
  };

  const showForm = (type, show) => {
    setFormFlag(type);
    setShowFormModal(show);
  };

  const abortAdd = () => {
    dispatchEditData({ type: "init" });
    showForm("", false);
  };

  const handleTitleChange = useCallback(
    debounce(
      value => {
        dispatchEditData({ type: "title", payload: value });
      },
      500,
      false
    )
  );
  // ================  end  =================
  
  // ================  渲染逻辑  ==================
  let showData = [];
  if (filterStatus === "all") {
    showData = listData;
  } else if (filterStatus === "done") {
    showData = listData.filter(item => item.status === 1);
  } else if (filterStatus === "undone") {
    showData = listData.filter(item => item.status === 0);
  }

  return (
    <div>
      <div className="options">
        <Input.Search placeholder="查找指定项" style={{ width: 300 }} />
        <Button onClick={() => setFilterStatus("done")}>已完成</Button>
        <Button onClick={() => setFilterStatus("undone")}>未完成</Button>
        <Button onClick={() => setFilterStatus("all")}>全部</Button>
        <Button onClick={() => showForm("add", true)}>添加项目</Button>
      </div>
      <div className="list-section">
        <ul>
          {showData.length > 0 &&
            showData.map(item => (
              <li key={item.id}>
                <TodoItem
                  item={item}
                  delete={deleteItem}
                  edit={editItem}
                  setStatus={modifyData}
                />
              </li>
            ))}
        </ul>
      </div>
      <Modal
        title={MODAL_TITLE[formFlag]}
        visible={showFormModal}
        onOk={completeForm}
        onCancel={abortAdd}
      >
        <div className="form-line">
          <label>概要：</label>
          <Input
            defaultValue={editData.title || ""}
            onChange={e => {
              // 事件对象不能作为参数传给防抖后的函数，会丢失事件对象
              handleTitleChange(e.target.value);
            }}
          />
        </div>
        <div className="form-line">
          <label>日期：</label>
          <DatePicker
            defaultValue={moment(editData.date || Date.now())}
            onChange={date => {
              dispatchEditData({ type: "date", payload: date.valueOf() });
            }}
          />
        </div>
      </Modal>
    </div>
  );
  // ===================  end  =====================
};

export default TodoList;
