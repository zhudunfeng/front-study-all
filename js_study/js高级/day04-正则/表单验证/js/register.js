window.addEventListener('load', function () {
  //正则
  let regtel = /^1[3|4|5|7|8]\d{9}$/;
  let regqq = /^[1-9]\d{4,}$/;
  let regnc = /^[\u4e00-\u9fa5]{2,8}$/;
  let regmsg = /^\d{6}$/;
  let regpwd = /^[a-zA-Z0-9_-]{6,16}$/;

  //获取元素
  let tel = document.querySelector('#tel');
  let qq = document.querySelector('#qq');
  let nc = document.querySelector('#nc');
  let msg = document.querySelector('#msg');
  let pwd = document.querySelector('#pwd');
  let repwd = document.querySelector('#repwd');

  //绑定事件
  regexp(tel, regtel); //手机号码
  regexp(qq, regqq);//qq
  regexp(nc, regnc);//昵称
  regexp(msg, regmsg);//验证码
  regexp(pwd, regpwd);//密码

  // 表单验证的函数
  function regexp(element, reg) {
    element.addEventListener('blur', function () {
      if (reg.test(this.value)) {
        this.nextElementSibling.className = 'success';
        this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
      } else {
        this.nextElementSibling.className = 'error';
        this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入';
      }
    })
  }

  repwd.addEventListener('blur', function () { 
    if (this.value===pwd.value) {
      this.nextElementSibling.className = 'success';
      this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
    } else {
      this.nextElementSibling.className = 'error';
      this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码输入不一致';
    }
  });

})