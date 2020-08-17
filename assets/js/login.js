$(function () {
    // 点击去注册页面
    $('#link_reg').on('click', function () {
        $(this).parents('.login_box').hide().siblings('.reg_box').show();
    });

    // 点击去登录页面
    $('#link_login').on('click', function () {
        $(this).parents('.reg_box').hide().siblings('.login_box').show();
    })
})