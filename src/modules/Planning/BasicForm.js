import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Row, Col, Form, Input, Select, Button, Alert, Icon } from "antd";

// import style from './BasicForm.less';
import "./BasicForm.less";
const { Option } = Select;

const UNIT_LIST = [
  {
    type: "20'",
    desc: "Inner Dimensions: 589.0 x 235.0 x 238.0 cm"
  },
  {
    type: "40'",
    desc: "Inner Dimensions: 1203.0 x 235.0 x 238.0 cm"
  },
  {
    type: "20' x 40'",
    desc: "Combination"
  },
  {
    type: "custom",
    desc: "Set Container's Inner Dimensions on Your Own"
  }
];

// TODO:可能是动态业务数据
const EQU_LIST = ["50% or less", "63%", "73%", "83%", "93%", "98%"];

class BasicForm extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: {}
    };

    this.alert = React.createRef();
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  selectUnitOrProcess = (props, type) => e => {
    this.setState({ data: { ...this.state.data, [props]: type } });
  };

  checkForm = () => {
    const { data } = this.state;
    let flag = true;
    let saveData = {};
    if (!data.unitType || !data.processType) {
      flag = false;
      ReactDOM.render(
        <Alert
          message="Error"
          description="You need to select a container unit and a planning process."
          type="error"
          closable
          showIcon
        />,
        this.alert
      );
    }
    saveData.unitType = data.unitType;
    saveData.processType = data.processType;
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        flag = false;
        return;
      }
      saveData = { ...saveData, ...fieldsValue };
    });
    return { flag, saveData };
  };

  // 保存子表单数据
  saveParameters = parameters => {
    this.setState({ data: { ...this.state.data, parameters } });
  };

  saveAndNext = () => {
    const { flag, saveData } = this.checkForm();
    if (!flag) {
      return;
    }
    const { next, save } = this.props;
    save && save(saveData);
    next && next(1);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
    return (
      <div className={"p-form-wrap"}>
        <Form>
          <Row>
            <Col span={16} offset={4}>
              <p className={"p-text-intro"}>
                We invite you to fill out the form <br />
                for us to provide better service.
              </p>
              <div className="alert-wrap" ref={el => (this.alert = el)}></div>
              <div className="p-form-block">
                <h3>Select Container Unit</h3>
                <div className="form-block-content">
                  <ul className="unit-list">
                    {UNIT_LIST.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={
                            item.type === data.unitType ? "unit-slected" : ""
                          }
                          onClick={this.selectUnitOrProcess(
                            "unitType",
                            item.type
                          )}
                        >
                          <UnitContainer title={item.type} desc={item.desc} />
                        </li>
                      );
                    })}
                  </ul>
                  {data.unitType === "custom" ? (
                    <div className="unit-costom-wrap">
                      <h5>Container Dimensions (cm) *</h5>
                      <div>
                        <Form.Item>
                          {getFieldDecorator("leight", {
                            initialValue: data.leight,
                            // TODO:在这添加校验规则
                            rules: [
                              {
                                required: true,
                                message: "Please input your leight!"
                              }
                            ]
                          })(<Input placeholder="Leight" />)}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator("height", {
                            initialValue: data.height,
                            // TODO:在这添加校验规则
                            rules: [
                              {
                                required: true,
                                message: "Please input your height!"
                              }
                            ]
                          })(<Input placeholder="Height" />)}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator("weight", {
                            initialValue: data.weight,
                            // TODO:在这添加校验规则
                            rules: [
                              {
                                required: true,
                                message: "Please input your weight!"
                              }
                            ]
                          })(<Input placeholder="Weight" />)}
                        </Form.Item>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="p-form-block">
                <h3>Select Planning Process</h3>
                <div className="form-block-content">
                  <div
                    className={
                      data.processType === "segmented"
                        ? "process-wrap process-selected"
                        : "process-wrap"
                    }
                    onClick={this.selectUnitOrProcess(
                      "processType",
                      "segmented"
                    )}
                  >
                    <Icon type="check-circle" />
                    <p>Segmented Planning</p>
                  </div>
                  <div
                    className={
                      data.processType === "continuous"
                        ? "process-wrap process-selected"
                        : "process-wrap"
                    }
                    onClick={this.selectUnitOrProcess(
                      "processType",
                      "continuous"
                    )}
                  >
                    <Icon type="check-circle" />
                    <p>Continuous Planning</p>
                  </div>
                </div>
              </div>
              <Form.Item label="EQU" className="equ-select">
                {getFieldDecorator("equ", {
                  initialValue: data.equ,
                  // TODO:在这添加校验规则
                  rules: [
                    {
                      required: true,
                      message: "Please select your EQU!"
                    }
                  ]
                })(
                  <Select>
                    {EQU_LIST.length > 0 &&
                      EQU_LIST.map(item => {
                        return <Option value={item} key={item}>{item}</Option>;
                      })}
                  </Select>
                )}
              </Form.Item>
              {/* 在下边替换更多表单列，如果是一个封装好的表单域组件，请确保它调用 saveParameter 函数来向上保存数据，或者使用ref */}
              <div style={{ fontSize: "30px" }}>
                Replace me with your Form Component <br />
                You should inject saveParameters function as a props to your
                component and ensure the component will call saveParameters to
                save your form data at a proper time.
              </div>
              <div className="p-form-btn-wrap">
                <Button onClick={this.saveAndNext}>Submit and Go Next</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const UnitContainer = props => {
  return (
    <div className="unit-wrap">
      <p className="unit-title">{props.title}</p>
      <p className="unit-desc">{props.desc}</p>
    </div>
  );
};

export default Form.create({ name: "create_planning" })(BasicForm);
