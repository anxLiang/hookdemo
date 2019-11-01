import React, { useState, useEffect } from "react";

// hook 的闭包体验
var intervalCount = 0;
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    intervalCount++;
    const timer = setInterval(() => {
      console.log(
        "第%c %d %c定时器，闭包内的 count 值：%c %d",
        "color:red",
        timer,
        "color:#000",
        "color:red",
        count
      );
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div style={{textAlign: "center", fontSize: "50px", padding: "20px 0"}}>
      计数值：<span style={{color:"red"}}>{count}</span>
      <br />
      定时器个数：<span style={{color:"red"}}>{intervalCount}</span>
    </div>
  );
}

export default App;
