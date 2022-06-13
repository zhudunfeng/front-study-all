window.addEventListener('load', function () {

  // 1. 获取元素
  let arrow_l = document.querySelector('.arrow-l');
  let arrow_r = document.querySelector('.arrow-r');
  let focus = document.querySelector('.focus');
  let focusWidth = focus.offsetWidth;

  // 2. 鼠标经过focus 就显示隐藏左右按钮 
  focus.addEventListener('mouseenter', function () {
    arrow_l.style.display = 'block';
    arrow_r.style.display = 'block';
    //关闭自动播放
    clearInterval(timer);
    timer = null;
  });

  focus.addEventListener('mouseleave', function () {
    arrow_l.style.display = 'none';
    arrow_r.style.display = 'none';
    //开启自动播放
    timer = setInterval(function () { 
      arrow_r.click();
    }, 2000);
  });

  // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
  let ul = focus.querySelector('ul');
  let ol = focus.querySelector('ol');
  for (let i = 0; i < ul.children.length; i++) {
    // 创建一个小li
    let li = document.createElement('li');
    // 把小li插入到ol 里面
    ol.appendChild(li);
    // 记录当前小圆圈的索引号 通过自定义属性来做 
    li.setAttribute('index', i);
    // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
    li.addEventListener('click', function () {
      //指定current指向的圆点
      //干掉其他的，只保留自己

      for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
      }
      this.className = 'current';
      // 5. 点击小圆圈，移动图片 当然移动的是 ul
      // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
      // 当我们点击了某个小li 就拿到当前小li 的索引号
      let index = this.getAttribute('index');
      // 当我们点击了某个小li 就要把这个li 的索引号给 num  【用来控制第几张图】
      num = index;
      // 当我们点击了某个小li 就要把这个li 的索引号给 circle  【用来控制第几个点】
      circle = index;
      //动画移动ul
      animate(ul, -index * focusWidth)
    });
  }

  // 把ol里面的第一个小li设置类名为 current
  ol.children[0].className = 'current';
  // 6. 克隆第一张图片(li)放到ul 最后面 实现无缝滚动 true表示深度克隆
  let first = ul.children[0].cloneNode(true);
  ul.appendChild(first);

  // 7. 点击右侧按钮， 图片滚动一张
  let num = 0;
  // circle 控制小圆圈的播放
  let circle = 0;
  // flag 节流阀 【用来控制按钮点击，图片切换速度】
  let flag = true;

  arrow_r.addEventListener('click', function () {
    if (flag) {
      flag = false; //关闭节流阀
      // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;//动画完成后，打开节流阀
      });

      // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle++;
      if (circle == ol.children.length) {
        //当圆点到达最后时，返回第一个
        circle = 0;
      }
      //干掉其他的，保留自己
      circleChange();
    }
  });



  // 9. 左侧按钮做法
  arrow_l.addEventListener('click', function () {
    if (flag) {
      flag = false;
      // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + 'px';
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });

      // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle--;
      // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
      // if (circle < 0) {
      //     circle = ol.children.length - 1;
      // }
      circle = circle < 0 ? ol.children.length - 1 : circle;
      //干掉其他的，保留自己
      circleChange();
    }
  });



  function circleChange() {
    // 先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    // 留下当前的小圆圈的current类名
    ol.children[circle].className = 'current';
  }

  // 10. 自动播放轮播图
  let timer = this.setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);
});