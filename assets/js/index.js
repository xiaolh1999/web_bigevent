$(function() {
    getUserInfo()
    //退出按钮
    $('#logout').on('click', function(){
        //提示用户是否退出
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地存储内的token
            localStorage.removeItem('token');
            //返回登录注册界面
            location.href = '/home/login.html';

            layer.close(index);
          });

    })

    
})
//获取用户基本信息
function getUserInfo (){
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        //Headers：请求头配置对象
        // headers:{
        //     Authorization :localStorage.getItem('token'),
        // },
        success : function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            //调用renderAvatar 渲染头像
            reendeerAvatar(res.data)
        },
        
    })
        
}
//渲染用户头像
function reendeerAvatar(data){
    var name = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染头像
    if(data.user_pic !== null){
        $('.layui-nav-img').attr('src', data.user_pic)
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var frist = name[0].toUpperCase();
        $('.text-avatar').html(frist).show()
    }
}