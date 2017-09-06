$(function () {
    var url = 'http://192.168.70.63:9900/api';

    //主导航
    $.ajax({
        url: 'http://192.168.70.63:9900/api/nav',
        datatype: 'json',
        success: function (data) {
            var $data = JSON.parse(data);
            var res = template('mainNav', $data);
            $('.zdh').html(res);

            $('.zdh li').hover(function () {
                var type = $(this).attr('data-type');
                if (type) {
                    $.ajax({
                        url: url + '/nav',
                        data: {
                            type: type
                        },
                        datatype: 'json',
                        success: function (data) {
                            var $data = JSON.parse(data);
                            var res = template('mainNavList', {
                                data: $data
                            });
                            $('.mainNavList ul').html(res);
                        }
                    })
                }
                $('.mainNavList').stop().slideDown(500);
            }, function () {
                $('.mainNavList').stop().slideUp(500);
            })
            $('.mainNavList').hover(function () {
                $('.mainNavList').stop().slideDown(500);
            }, function () {
                $('.mainNavList').stop().slideUp(500);
            })
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

    //轮播图
    $.ajax({
        url: url + '/lunbo',
        success: function (data) {
            var $data = JSON.parse(data);
            // console.log($data);
            var res = template('slide', $data);
            $('.slide ul').html(res);

            var index = 0;
            var len = $('.slide li').length;
            $('.btn-right').click(function () {
                auto();
            })
            $('.btn-left').click(function () {
                index--;
                if (index < 0) {
                    index = len - 1;
                }
                $('.slide li').fadeOut().eq(index).fadeIn();
            })

            function auto() {

                index++;
                if (index > len - 1) {
                    index = 0;
                }
                $('.slide li').fadeOut().eq(index).fadeIn();

            }
            var timerId = setInterval(auto, 2000);
            $('.slide').mouseover(function () {
                clearInterval(timerId);
            })
            $('.slide').mouseout(function () {
                timerId = setInterval(auto, 2000)
            })

        }
    })

    //轮播左侧导航
    $.ajax({
        url: url + '/items',
        datatype: JSON,
        success: function (data) {
            // console.log(data)
            var $data = JSON.parse(data);
            var res = template('menu', $data);
            $('.menu ul').html(res);
        }
    })


})