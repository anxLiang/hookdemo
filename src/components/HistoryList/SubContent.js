import React from "react";

import "./SubContent.less";

const UNIT_DESC = {
  "20'": "20' Standard Container (Inner Dimensions: 589.0 x 235.0 x 238.0 cm)",
  "40'": "40' Standard Container (Inner Dimensions: 1203.0 x 235.0 x 238.0 cm)",
  "20' x 40'": "20' x 40' Standard Container (Combination)",
  undefined: "unknown"
};

const SubContent = props => {
  const { data } = props;
  if (!data) return null;
  return (
    <div className="subcontent">
      <SelfFormBlock title="Container Unit">
        <p>
          {UNIT_DESC[data.unit]
            ? UNIT_DESC[data.unit]
            : // TODO:如果是自定义尺寸，请结合业务数据修改此处渲染格式
              `${data.unit} (Custom container's Inner Dimensions')`}
        </p>
      </SelfFormBlock>
      <SelfFormBlock title="Index">
        {/* TODO:渲染数据字段请结合实际数据进行修改 */}
        <SelfFormItem label="Dest Port">
          {data.destPort || "unknown"}
        </SelfFormItem>
        <SelfFormItem label="Vendor">{data.vendor || "unknown"}</SelfFormItem>
        <SelfFormItem label="CSM">{data.csm || "unknown"}</SelfFormItem>
        <SelfFormItem label="Art">{data.art || "unknown"}</SelfFormItem>
      </SelfFormBlock>
      {/* TODO:渲染数据字段请结合实际数据进行修改 */}
      {data.packages instanceof Array &&
        data.packages.length > 0 &&
        data.packages.map((item, index) => {
          return (
            <SelfFormBlock
              key={`${item.numPallet}-${index}`}
              title={`Package Type ${index + 1}`}
            >
              <SelfFormItem label="Num Pallet">{item.numPallet}</SelfFormItem>
              <SelfFormItem
                className="inline-item"
                label="Gross CBM / Net CBM (kg)"
              >
                {item.cbm}
              </SelfFormItem>
              <SelfFormItem
                className="inline-item"
                label="Gross Weight / Net Weight (kg)"
              >
                {item.weight}
              </SelfFormItem>
              <SelfFormItem label="Bearing Weight (kg)">
                {item.bearing}
              </SelfFormItem>
              <SelfFormItem label="Dimensions (cm)">
                {item.dimension}
              </SelfFormItem>
            </SelfFormBlock>
          );
        })}
    </div>
  );
};

const SelfFormBlock = props => {
  return (
    <div className={`s-form-content-wrap ${props.className}`}>
      <h4 className="s-form-title">{props.title}</h4>
      <div className="s-form-content">{props.children}</div>
    </div>
  );
};

SelfFormBlock.defaultProps = {
  className: ""
};

const SelfFormItem = props => {
  return (
    <div className={`s-form-item ${props.className}`}>
      <label className="s-form-item-label">{props.label}:</label>
      <div className="s-form-item-content">{props.children}</div>
    </div>
  );
};

SelfFormItem.defaultProps = {
  className: ""
};

export default SubContent;
