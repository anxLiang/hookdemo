/**
 * @description 函数防抖
 * @author anxLiang
 * @param {Function} fn 被防抖函数
 * @param {Number} delay 防抖间隔, 单位 ms
 * @param {Boolean} immediate 触发时立即执行防抖函数或者间隔后执行
 * @returns {Function} 防抖处理后的函数
 */
export function debounce(fn, delay = 1000, immediate = true) {
  if (Object.prototype.toString.call(fn).slice(8, -1) !== "Function") {
    console.log(new Error("要防抖处理的目标不是函数！"));
    return fn;
  }
  let timer = null;
  return function(...args) {
    let ctx = this;
    if (immediate && !timer) {
      fn.call(ctx, ...args);
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
      if (!immediate) {
        fn.call(ctx, ...args);
      }
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}
