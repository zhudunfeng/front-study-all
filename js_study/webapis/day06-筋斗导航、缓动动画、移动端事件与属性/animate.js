function animate(obj, target, callback) {
  // 先清除以前的定时器，只保留当前的一个定时器执行
  clearInterval(obj.timer);
  obj.timer = setInterval(function (e) {
    let steps = (target - obj.offsetLeft) / 10;
    //这里没有取绝对值
    steps = steps > 0 ? Math.ceil(steps) : Math.floor(steps);
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer);
      // if(callback){
      //   callback();
      // }
      //简写
      callback && callback();
    }
    obj.style.left = obj.offsetLeft + steps + 'px';
  }, 15)
}