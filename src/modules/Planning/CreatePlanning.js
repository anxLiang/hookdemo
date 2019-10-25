import React, { Component } from 'react';
import { Row, Col, Steps } from 'antd';

import BasicForm from './BasicForm';

import './CreatePlanning.less';

const { Step } = Steps;

class CreatePlanning extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      current: 0, // 当前步骤
      data: {} // 表单数据
    };
  }

  setStep = current => {
    this.setState({ current });
  };

  saveForm = data => {
    this.setState({ data });
  };

  // 传给 upload 组件的回调，当上传文件以后，将填好的表单数据提交到服务器
  submit = () => {
    const { data } = this.state;
    // TODO:具体的数据提交逻辑
  };

  render() {
    const { current, data } = this.state;
    return (
      <div className="create-planning-wrap">
        <Row className={'p-step-row'}>
          <Col span={6} offset={9}>
            <Steps
              type="navigation"
              size="small"
              current={current}
              onChange={this.setStep}
            >
              <Step title="Fill Out The Form" icon={<span>1.</span>} />
              <Step title="Upload Your File" icon={<span>2.</span>} />
            </Steps>
          </Col>
        </Row>
        {current === 0 ? (
          <BasicForm data={data} next={this.setStep} save={this.saveForm} />
        ) : null}
        {current === 1 ? <div>next</div> : null}
      </div>
    );
  }
}

export default CreatePlanning;
