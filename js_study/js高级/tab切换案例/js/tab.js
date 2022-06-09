
let that;
class Tab {
  // 构造函数
  constructor(id) {
    that = this;

    //获取元素
    this.main = document.querySelector(id);
    this.add = this.main.querySelector('.tabadd');
    //li的父元素
    this.ul = this.main.querySelector('.firstnav ul:first-child');

    //section的父元素
    this.fsection = this.main.querySelector('.tabscon');

    //初始化 带（）表示立即执行
    this.init();
  }


  
  init() {
    this.updateNode();
    //init初始化操作，让相关的元素绑定事件
    this.add.addEventListener('click', this.addTab);
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].addEventListener("click", this.toggleTab);
      this.remove[i].addEventListener('click', this.removeTab);
      this.spans[i].ondblclick = this.editTab;
      this.sections[i].addEventListener('dblclick', this.editTab);
    }
  }



  // 因为我们动态添加元素 需要从新获取对应的元素
  updateNode() {
    this.lis = this.main.querySelectorAll("li");
    this.sections = this.main.querySelectorAll("section");
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
  }



  //1.切换功能
  toggleTab() {
    // console.log(this.index);
    //干掉其他的，保留自己
    that.clearClass();
    this.className = "liactive";
    that.sections[this.index].className = 'conactive';
  }

  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }


  //2.添加功能
  addTab() {
    that.clearClass();
    //this指向调用者。此时是add按钮
    // (1)创建li元素和section元素
    let random = Math.random();
    let li = `<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>`;
    let section = `<section class="conactive">New Tab ${random}</section>`;
    //(2)把这两个元素追加到对应的父元素里面
    // console.log(that.ul);

    that.ul.insertAdjacentHTML('beforeend', li);
    that.fsection.insertAdjacentHTML('beforeend', section);
    that.init();
  }


  //3.删除功能
  removeTab(e) {
    // 阻止冒泡 防止触发li 的切换点击事件
    e.stopPropagation();
    var index = this.parentNode.index;
    console.log(index);
    // 根据索引号删除对应的li 和section   remove()方法可以直接删除指定的元素
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
    if (document.querySelector('.liactive')) return;
    // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
    index--;
    // 手动调用我们的点击事件  不需要鼠标触发
    that.lis[index] && that.lis[index].click();
  }


  //4.修改功能
  editTab() {
    let str = this.innerHTML;
    //双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    // alert(11);
    this.innerHTML = `<input type="text" />`;
    let input = this.children[0];
    input.value = str;
    input.select(); // 文本框里面的文字处于选定状态
    // 当我们离开文本框就把文本框里面的值给span 
    input.onblur = function() {
      this.parentNode.innerHTML = this.value;
    }
    // 按下回车也可以把文本框里面的值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        // 手动调用表单失去焦点事件  不需要鼠标离开操作
        this.blur();
       }
    }
  }
}

new Tab("#tab");