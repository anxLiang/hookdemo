/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Button, Table } from "antd";

import "./index.less";

const ICON_LIST = {
  success: <Icon style={{ color: "green" }} type="check-circle" />,
  in_progress: <Icon style={{ color: "#8299c9" }} type="clock-circle" />,
  error: <Icon style={{ color: "red" }} type="close-circle" />,
  ONCLOSED: <Icon type="menu" />,
  ONEXPANDED: <Icon type="close" />,
  DOWNLOAD: <Icon type="cloud-download" />
};

const STATUS_MAP = {
  in_progress: "ONGOING",
  success: "SUCCEED",
  error: "FAILED"
};

class HistoryList extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      currentPage: 1,
      expandedRows: []
    };

    this.columns = [
      {
        title: "YOUR FILE",
        key: "filename",
        // TODO:修改此处以匹配传入数据的渲染字段
        dataIndex: "filename",
        render: (value, record, index) => {
          return (
            <div className="unit-file-self">
              <span title={value}>{value}</span>
              <i
                style={{ cursor: "pointer" }}
                onClick={this.download(record, "self")}
              >
                {ICON_LIST.DOWNLOAD}
              </i>
            </div>
          );
        },
        className: "col-file"
      },
      {
        title: "TIME/DATE UPLOADED",
        key: "time",
        // TODO:修改此处以匹配传入数据的渲染字段
        dataIndex: "created",
        // TODO:添加 render 属性以达到格式化日期输出
        className: "col-time"
      },
      {
        title: "STATUS",
        key: "status",
        // TODO:修改此处以匹配传入数据的渲染字段
        dataIndex: "status",
        render: (value, record, index) => {
          return (
            <div className="unit-status">
              {ICON_LIST[value]}
              {STATUS_MAP[value]}
            </div>
          );
        },
        className: "col-status"
      },
      {
        title: "OUTPUTS",
        key: "outputs",
        // TODO:修改此处以匹配传入数据的渲染字段
        dataIndex: "output",
        render: (value, record, index) => {
          if (!value.hasOwnProperty("filename")) {
            return null;
          }
          return (
            <Button
              className="unit-file-output"
              onClick={this.download(record, "output")}
            >
              {value.filename}
              {ICON_LIST.DOWNLOAD}
            </Button>
          );
        },
        className: "col-output"
      },
      {
        title: "",
        key: "icon",
        render: (value, record, index) => {
          if (this.state.expandedRows.includes(index)) {
            return ICON_LIST.ONEXPANDED;
          }
          return ICON_LIST.ONCLOSED;
        },
        className: "col-icon"
      }
    ];
  }

  componentDidMount() {
    const { data, onPagination } = this.props;
    // 没有分页逻辑则代表使用内部分页
    if (!onPagination) {
      this.setState({ showData: data.slice(0, 5) });
    }
  }

  // 分页处理
  handlePageChange = (page, pageSize) => {
    const { data, onPagination } = this.props;
    // 如果传入了分页逻辑，则走自定义分页逻辑，否则走组件内前端分页
    this.setState({ currentPage: page });
    if (onPagination) {
      return onPagination(page);
    }
    this.setState({ showData: data.slice((page - 1) * 5, page * 5) });
  };

  handleExpandedRowsChange = expandedRows => {
    this.setState({ expandedRows });
  };

  /**
   * @description 下载文件回调，可以将下载业务逻辑内嵌到组件中，无需通过API传入
   * @params {Object} record 触发下载的数据源
   * @params {String} type   下载类型，有两个值： self:下载上传的文件； output:下载输出文件
   */
  download = (record, type) => e => {
    e.stopPropagation();
    this.props.download && this.props.download(record, type);
  };

  render() {
    const { currentPage, showData } = this.state;
    const { data, subContent, total, onPagination } = this.props;
    return (
      <div className="history-list-wrap">
        <Table
          columns={this.columns}
          dataSource={onPagination ? data : showData}
          expandedRowRender={subContent}
          expandRowByClick
          pagination={{
            current: currentPage,
            total,
            pageSize: 5,
            onChange: this.handlePageChange,
            itemRender
          }}
          onExpandedRowsChange={this.handleExpandedRowsChange}
        />
      </div>
    );
  }
}

HistoryList.defaultProps = {
  data: [],
  // subContent: undefined,
  total: 0
};

HistoryList.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
  subContent: PropTypes.func,
  onPagination: PropTypes.func
};

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <span className="self-pagination">
        <Icon style={{ marginRight: "5px" }} type="left" />
        PREV
      </span>
    );
  }
  if (type === "next") {
    return (
      <span className="self-pagination">
        NEXT
        <Icon style={{ marginLeft: "5px" }} type="right" />
      </span>
    );
  }
  return originalElement;
}

export default HistoryList;
