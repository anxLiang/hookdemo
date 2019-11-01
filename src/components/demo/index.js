import React, { useState } from "react";

import Demo1 from "./demo1";
import Demo2 from "./demo2";
import Demo3 from "./demo3";

import "./index.less";

const list = [Demo1, Demo2, Demo3];

const DemoList = () => {
  const [demo, setDemo] = useState(0);
  const RenderDemo = list[demo];
  return (
    <div style={{display: "flex"}}>
      <div className="demo-list">
        <ul>
          {list.map((item, index) => (
            <li
              key={index}
              className={index === demo ? "active" : ""}
              onClick={() => setDemo(index)}
            >
              demo{index + 1}
            </li>
          ))}
        </ul>
      </div>
      <div className="demo-section">
        <RenderDemo />
      </div>
    </div>
  );
};

export default DemoList;
