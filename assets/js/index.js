$(function () {

    // 获取用户信息
    getUserInfo();

    // 退出登录
    $('#signOut').on('click', function (e) {
        e.preventDefault();
        layui.layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            // 退出登录
            signOut();
            layui.layer.close(index);
        });
    })
});

// 获取用户信息
function getUserInfo() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // layui.layer.msg(res.message);
            // console.log(res);
            // 渲染用户头像
            renderAvatar(res.data);
        }
    });
}

// 渲染用户头像
function renderAvatar(data) {
    // 渲染欢迎文字
    var name = data.nickname || data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 渲染头像
    if (data.user_pic) {
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text_avatar').hide();
    } else {
        // [0].toUpperCase() visibility: visible;
        $('.layui-nav-img').hide();
        $('.text_avatar').html(name[0].toUpperCase()).show().css('visibility', 'visible');
    }
    $('.layui-side-scroll .userinfo').css('visibility', 'visible');
}

// 退出登录
function signOut() {
    // 清空 token 
    localStorage.removeItem('token');
    // 跳转到login页面
    location.href = '/login.html';
}