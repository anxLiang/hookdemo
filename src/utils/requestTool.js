import axios from "axios";

const HTTP_PREFIX = process.env.HTTP_PREFIX;

function request(url, options) {
  axios({
    header: {
      "Content-Type": "application/json"
    },
    url: `${HTTP_PREFIX}/${url}`,
    ...options
  }).then(res => {
    // axios 的数据层
    // 可以在这里做状态码处理
    // if (res.status === whichHttpStatuCode) {
    //   throw or return
    // }
    return res.data;
  }).then(data => {
    // 接口数据层
    // 如果通过接口数据反馈请求情况，在这里添加拦截器
    /**
     * if (data.requestTag means error) {
     *   do some thing
     *   ...
     *   throw exception
     * }
     * ...
     */
    return data
  }).catch(error => {
    // 对捕获的异常处理
    console.log(error);
  })
}

export default request;