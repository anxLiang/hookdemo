import React, { useState, useEffect } from "react";
import axios from "axios";

export function useTodoList(init) {
  const [listData, setListData] = useState(init || []);
  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    if (listData.length === 0 && !hasInit) {
      axios.get("/list").then(res => {
        const data = res.data;
        setListData(data);
        setHasInit(true);
      });
    }
  }, [hasInit, listData.length]);

  return [listData, setListData];
}
