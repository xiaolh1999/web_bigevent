$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称因在1-6字符之间";
      }
    },
  });

  initUserInfo();
  //初始化用户信息
  function initUserInfo() {
    $.ajax({
      mmethod: "get",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败");
        }
        // console.log(res);
        //调用form.val()为表单快速赋值
        form.val("formUserInfo", res.data);
      },
    });
  }

  $("#btnRest").click(function (e) {
    // console.log(123);
    //阻止默认行为
    e.preventDefault();
    initUserInfo();
  });

  //监听表单提交事件
  $(".layui-form").submit(function (e) {
    //阻止默认提交行为
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          layer.msg("提交失败");
        }
        layer.msg("更新信息成功");
        //调用父元素的方法，重新渲染名称和头像
        window.parent.getUserInfo();
      },
    });
  });
});
