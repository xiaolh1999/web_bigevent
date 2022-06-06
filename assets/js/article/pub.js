$(function () {
  var form = layui.form;

  initEditor();
  initCate();
  //定义加载文章分类的方法
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败");
        }
        var htmlStr = template("tpl-list", res);
        $("#art_list").html(htmlStr);
        form.render();
      },
    });
  }
  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  //为选择图片的按钮绑定点击事件
  $("#btnChooseImg").on("click", function () {
    $("#coverFile").click();
    //监听coverFile的change事件 获取用户选择的文件列表
    $("#coverFile").on("change", function (e) {
      var file = e.target.files[0];
      var newImgURL = URL.createObjectURL(file);
      $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", newImgURL) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
    });
  });
});
