import React, { useState, useEffect, useCallback } from "react";

import { debounce } from "utils/tools";

// hook 中的异步行为和记忆方法
const Demo3 = () => {
  const [count, setCount] = useState(0);
  const [dCount, setDCount] = useState(0);
  useEffect(() => {
    console.log("move %c %d %c times", "color: #f92", count, "color: #000");
    console.log("move %c %d %c times", "color: #f92", dCount, "color: #000");
  });
  const debounceSetCount = debounce(setDCount, 1000, false);
  // const debounceSetCount = useCallback(debounce(setDCount, 1000, false), []);
  const handleMove = () => {
    setCount(count + 1);
    debounceSetCount(dCount + 1);
  };
  return (
    <>
      <div
        onMouseMove={handleMove}
        style={{
          width: 1000,
          height: 300,
          margin: "0 auto",
          borderRadius: "150px",
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          fontSize: "100px",
          lineHeight: "300px"
        }}
      >
        滑我！
      </div>
      <div style={{ textAlign: "center", fontSize: "50px", padding: "20px 0" }}>
        未防抖值：{count}
      </div>
      <div style={{ textAlign: "center", fontSize: "50px", padding: "20px 0" }}>
        防抖值：{dCount}
      </div>
    </>
  );
};

export default Demo3;
