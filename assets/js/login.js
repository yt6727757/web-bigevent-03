$(function () {
    // 点击去注册页面
    $('#link_reg').on('click', function () {
        $(this).parents('.login_box').hide().siblings('.reg_box').show();
        // 重置当前的form表单
        $('.login_form')[0].reset();
    });

    // 点击去登录页面
    $('#link_login').on('click', function () {
        $(this).parents('.reg_box').hide().siblings('.login_box').show();
        // 重置当前的form表单
        $('.reg_form')[0].reset();
    })

    // 表单验证
    layui.form.verify({
        pwd: [/[\S]{6,12}/, '密码长度为6-12位，且不能有空格'],
        repwd: function (value) {
            var pwd = $('.reg_box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })

    // 点击注册
    $('.reg_form').on('submit', function (e) {
        var username = $('.reg_box [name=username]').val();
        // 阻止表单默认提交
        e.preventDefault();
        // 发起请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                // 注册成功
                layui.layer.msg(res.message + '去登陆！');
                // 重置注册表单
                $('.reg_form')[0].reset();
                // 去登录页面
                $('#link_login').click();
                $('.login_box [name=username]').val(username);
            }
        });
    })

    // 点击登录
    $('.login_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                // 登录成功
                layui.layer.msg(res.message);
                // 保存身份认证信息
                localStorage.setItem('token',res.token);
                // 跳转到index页面
                top.location.href = '/index.html';
            }
        });
    })
})