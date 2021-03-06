
//防抖函数
export function debounce(func,delay = 300){
  let timer = null
  return function (...args) {
    //清除上一次的timer 设置新的timer 进入新的延迟时间
    //直到延迟结束才会执行setTimeout的内部函数
    if(timer) clearTimeout(timer)
    timer = setTimeout( ()=>{
      func.apply(this, args)
    },delay)
  }
}

//时间填0操作 4 -> 004 -> 04
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

//时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
