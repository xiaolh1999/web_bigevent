$(function() {
    //点击出注册账号链接
    $('#linkReg').on('click', function(){
        $('.login').hide();
        $('.reg').show();
    })
    //点击去登录
    $('#linkLogin').on('click', function(){
        $('.login').show();
        $('.reg').hide();
    })

    //从layui中获取form对象
    var form = layui.form
    //通过from.verify（）函数自定义校验规则
    form.verify({
        //自定义了‘pwd’校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
        //定义repwd的校验规则
        repwd:function(value){
            var pwd = $('.reg [name=password]').val()
            if(pwd !== value){
                return '确认密码不一致！'
            }

        }
    })

    //监听注册表单的提交事件    
    $('#form-reg').on('submit', function(e){
        //阻止表单默认行为
        e.preventDefault()

        var data = {
            username:$('.reg [name=username]').val(),
            password:$('.reg [name=password]').val(),
        }
        //发起post请求
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // $('.login').show();
            // $('.reg').hide();
            $('#linkLogin').click()
        })
    })

    //监听登录表单提交事件
    $('#form-login').on('submit',function(e){
        e.preventDefault();
       
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单数据
            data : $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //将登录成功后得到的token，保存到localstorage
                localStorage.setItem('token', res.token);
                //跳转后台主页
                location.href = '/home/index.html';
            }
        })
    })
})