$(function () {
  initArtCataList();
  //获取文章列表
  function initArtCataList() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取文章列表失败");
        }
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  var indexAdd = null;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  //通过代理的形式对 form-add 表单绑定 submit 事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault;
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("添加失败");
        }
        initArtCataList();
        layer.msg("添加成功");
        layer.close(indexAdd);
      },
    });
  });
  var form = layui.form;
  var layer = layui.layer;
  var indexEidt = null;
  //通过代理为 btn-edit 按钮绑定点击事件
  $("tbody").on("click", ".btn-edit", function () {
    //弹出层
    indexEidt = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    var id = $(this).attr("data-Id");
    //发送请求获取对应数据
    $.ajax({
      method: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });

  //通过代理形式为分类的表单绑定submit事件
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("编辑失败");
        }
        layer.msg("修改成功");
        layer.close(indexEidt);
        initArtCataList();
      },
    });
  });

  //通过代理形式为删除按钮绑定删除事件
  $("body").on("click", ".btn-delete", function () {
    var id = $(this).attr("data-Id");
    layer.confirm(
      "是否确认删除?",
      { icon: 3, title: "提示" },
      function (index) {
        $.ajax({
          method: "get",
          url: "/my/article/deletecate/" + id,
          data: $(this).serialize(),
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg("删除失败");
            }
            layer.msg("删除成功");
            initArtCataList();
          },
        });

        layer.close(index);
      }
    );
  });
});
