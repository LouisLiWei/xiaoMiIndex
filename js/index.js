$(function () {
    var url = 'http://192.168.1.102:9900/api';

    //主导航
    $.ajax({
        url: 'http://192.168.1.102:9900/api/nav',
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

            //鼠标移动点li上
            $('.menu li').hover(function () {
                var type = $(this).attr('data-type');
                $.ajax({
                    url: url + "/items",
                    data: {
                        type: type
                    },
                    dataType: "json",
                    success: function (backData) {
                        var ulLen = Math.ceil(backData.length / 6);
                        $(".menuList").empty();
                        for (var i = 0; i < ulLen; i++) {
                            var ul = document.createElement("ul");
                            if (i < ulLen - 1) {
                                for (var j = 0; j < 6; j++) {
                                    var str = backData[i * 6 + j].buyStatus == "true" ? '<li><a href="' + backData[i * 6 + j].sourceUrl + '"> <img src="' + backData[i * 6 + j].imgUrl + '" alt=""> <h4>' + backData[i * 6 + j].name + '</h4> </a> <a href="' + backData[i * 6 + j].buyUrl + '">选购</a> </li>' : '<li><a href="' + backData[i * 6 + j].sourceUrl + '"> <img src="' + backData[i * 6 + j].imgUrl + '" alt=""> <h4>' + backData[i * 6 + j].name + '</h4> </a> <a  class="buyStatus" href="' + backData[i * 6 + j].buyUrl + '">选购</a> </li>';
                                    $(ul).append(str);
                                }
                            } else {
                                for (var k = 0; k < (backData.length - (ulLen - 1) * 6); k++) {
                                    var str = backData[i * 6 + k].buyStatus == "true" ? '<li><a href="' + backData[i * 6 + k].sourceUrl + '"> <img src="' + backData[i * 6 + k].imgUrl + '" alt=""> <h4>' + backData[i * 6 + k].name + '</h4> </a> <a href="' + backData[i * 6 + k].buyUrl + '">选购</a> </li>' : '<li><a href="' + backData[i * 6 + k].sourceUrl + '"> <img src="' + backData[i * 6 + k].imgUrl + '" alt=""> <h4>' + backData[i * 6 + k].name + '</h4> </a> <a href="' + backData[i * 6 + k].buyUrl + '" class="buyStatus"></a> </li>';
                                    $(ul).append(str);
                                }
                            }
                            $(".menuList").append(ul);
                        }

                    }
                });
                $('.menuList').stop().show();
            }, function () {
                $('.menuList').stop().hide();
            })

            $('.menuList').hover(function () {
                $(this).stop().show();
            }, function () {
                $(this).stop().hide();
            })
        }
    })
    // 硬件部分
    $.ajax({
        url: url + '/hardware',
        success: function (data) {
            var $data = JSON.parse(data);
            // console.log($data);
            var res = template('znyj', $data);
            $('.znyj .body .bodyR ul').html(res);
        }
    })

    // 搭配 配件 周边
    $.ajax({
        url: url + '/product',
        data: {
            toptitle: 'match'
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var res = template('parentTemp', data);
            $('.seri').append(res);


            $.ajax({
                url: url + '/product',
                data: {
                    key: 'hotgoods'
                },
                dataType: 'json',
                success: function (data) {
                    // console.log(data)
                    var sub = template('subTemp', data);
                    // console.log(sub);
                    $('.rightGoods ul').html(sub)
                }
            })

        }
    })

})