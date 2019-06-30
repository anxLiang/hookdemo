import axios from "axios";

// 注：拦截器也可以通过 axios 提供的 api 进行添加
/**
 * @description 封装拦截器的请求工具
 * @param {String} url 请求地址
 * @param {Object} options 标准 axios 请求 options 对象，不包含 url，但包含 method, data 等属性
 * @returns {Promise}
 */
function request(url, options) {
  /**
   * 使用 try catch 包裹，并且去掉 Promise 的 catch
   * 避免 Promise 的 catch 返回新 Promise 对象而继续执行请求链上后续的 then
   */
  try {
    return axios({
      header: {
        "Content-Type": "application/json"
      },
      url: url,
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
    })
  } catch (error) {
    console.log(error);
  }
}

export default request;