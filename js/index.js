$(function () {
    var url = 'http://192.168.1.102:9900/api';

    //主导航
    $.ajax({
        url: 'http://192.168.1.102:9900/api/nav',
        datatype: 'json',
        success: function (data) {
            var $data = JSON.parse(data);
            // console.log($data);
            var res = template('mainNav', $data);
            // console.log(res)
            $('.zdh').html(res);
        }
    })

    //搜索获取焦点
    $('.seach input').focus(function () {
        $('.seach').css('border', '1px solid #ff6700');
        $('.seach lable').css('border-left', '1px solid #ff6700');
        $('.hotGoods').hide();
        $('.seachList').slideDown();
    });
    $('.seach input').blur(function () {
        $('.seach').css('border', '1px solid #ccc');
        $('.seach lable').css('border-left', '1px solid #ccc');
        $('.hotGoods').show();
        $('.seachList').slideUp();
    });



})