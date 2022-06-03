$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为有权限的接口设置headers 请求头
    if(options.url.indexOf('/my/') !== -1){
    options.headers={
        Authorization :localStorage.getItem('token'),
    }}

    //全局统一挂载complete回调函数
    //无论获取成功与否，都会调用complete 函数
    options.complete = function (res) {
        // console.log(res);
        if(res.responseJSON.status == 1){
            return location.href = '/home/login.html';
        }
    }
})