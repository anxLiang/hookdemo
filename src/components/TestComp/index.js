import React, { useState, useEffect } from "react";

import "./index.less";

const COLOR_LIST = ["blue", "yellow", "green", "white", "red", "black", "grey"];

const SubComp = props => {
  const useSelfHooks = count => {
    const [subText, setSubText] = useState("init");
    useEffect(() => {
      console.log("subText has changed ", count, " times");
    }, [count]);
    return [subText, setSubText];
  };
  const [subText, setSubText] = useSelfHooks(props.count);

  return (
    <span
      onClick={() => {
        props.click();
        setSubText(COLOR_LIST[props.count % 7]);
      }}
    >
      {subText}
    </span>
  );
};

const FuncComp = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("after set count:", count);
  });
  const [color, setColor] = useState("blue");
  useEffect(() => {
    console.log("after set color:", color);
  });

  const handleClick = () => {
    console.log("before set", count, color);
    setCount(count + 1);
    setColor(COLOR_LIST[(count + 1) % 7]);
    // setColor(COLOR_LIST[Math.floor(Math.random() * 7)]);
    // setTimeout(() => {
    //   console.log("async count:", count);
    //   setCount(count + 1);
    // },   1000);
  };

  return (
    <div style={{ color: color, textAlign: "center", fontSize: "30px" }}>
      <SubComp click={handleClick} count={count} />
    </div>
  );
};

export default FuncComp;
