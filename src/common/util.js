export function debounce(func, delay) {
  // 0.防抖动函数
    // 定义一个空的时间变量
    let timer = null
    return function (...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
}
