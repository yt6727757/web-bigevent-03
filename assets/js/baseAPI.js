(function () {

    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url;

        if (options.url.indexOf('/my/') !== -1) {
            options.headers = { Authorization: localStorage.getItem('token') || '' };

            options.complete = function (res) {
                var re = res.responseJSON;

                // console.log(re);
                if (1 === re.status && '身份认证失败！' === re.message) {
                    // 强制删除localStorage
                    localStorage.removeItem('token');
                    // 强制跳转到login页面
                    top.location.href = '/login.html';
                }

            }
        }

    });

})();