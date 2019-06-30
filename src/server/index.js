import request from "utils/requestTool";

const HTTP_PREFIX = process.env.HTTP_PREFIX;
const URL = {
  "GET_HISTORY": `${HTTP_PREFIX}/history`,
  "GET_ALL_AGENTS": `${HTTP_PREFIX}/agents`,
  "GET_TARGET_AGENT": `${HTTP_PREFIX}/agents`,
  "UPDATE_TARGET_AGENT": `${HTTP_PREFIX}/agents`,
}

export function getHistory() {
  return request(URL.GET_HISTORY, { method: "get" });
}

export function getAllAgents() {
  return request(URL.GET_ALL_AGENTS, { method: "get" });
}

export function getTargetAgent(id) {
  const url = URL.GET_TARGET_AGENT + `/${id}`;
  return request(url, { method: "get" });
}

export function updateTargetAgent(data) {
  const url = URL.UPDATE_TARGET_AGENT + `/${data.id}`;
  return request(url, {
    method: "put",
    data: data
  });
}