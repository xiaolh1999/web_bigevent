$(function () {
  var form = layui.form;
  var laypage = layui.laypage;
  //定义查询的参数对象，请求数据时将查询参数对象提交给服务器
  var q = {
    pagenum: 1, //页码值，默认第一页
    pagesize: 2, //每页显示多少条数据
    cate_id: "", //文章分类的 Id
    state: "", //文章的状态，可选值有：已发布、草稿
  };
  initTable();
  initCate();
  //获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("列表获取失败");
        }
        //使用模板引擎渲染列表数据
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        //调用渲染分页的方法
        rendeerPage(res.total);
      },
    });
  }
  //初始化文章分类菜单
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        //   console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取列表数据失败");
        }
        var htmlStr = template("tpl-cate", res);
        // console.log(htmlStr);
        $("#cataList").html(htmlStr);
        form.render();
      },
    });
  }

  //为筛选区域绑定submit事件
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    var cate_id = $("[name=cate_id]").val();
    var state = $("[name=state]").val();
    //为查询对象q重新赋值
    q.cate_id = cate_id;
    q.state = state;
    //根据新的查询对象q，重新渲染表格
    initTable();
  });

  //定义渲染分页方法
  function rendeerPage(total) {
    laypage.render({
      elem: "pageBox", //注意，这里的 test1 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum, //默认选中的分页
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      //分页发生切换时触发jump回调
      jump: function (obj, first) {
        //对q的页码重新赋值
        q.pagenum = obj.curr;
        //对q每页显示条目数重新赋值
        q.pagesize = obj.limit;
        if (first) {
          return;
        } else {
          initTable();
        }
      },
    });
  }

  //通过代理形式为删除按钮创建点击事件
  $("tbody").on("click", " .btn-delete", function () {
    var id = $(this).attr("data-Id");
    //获取删除按钮的个数
    var len = $(".btn-delete").length;
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
            if (len === 1) {
              //页码值-1
              //页码值最小为1
              q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
            }
            initTable();
          },
        });
        layer.close(index);
      }
    );
  });
});
