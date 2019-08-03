$(function () {
    // -------------------------------------------------
    /* 楼层跳跃 */
    //获取标签
    var jump = $(".jump");
    // console.log(jump);
    var btn = $(".jump_H"); //按钮组
    var box = $(".floor_1"); //楼层组

    // 给按钮组绑定事件  点击时可以跳到相应的楼层
    for (var i = 0; i < box.length; i++) {
        // 获取屏幕的高度
        box[i].style.height = (window.scrollHeight) + "px";
    };
    // 绑定事件
    for (var i = 0; i < btn.length; i++) {
        btn[i].index = i;
        btn[i].onclick = function () {
            //排他
            for (var k = 0; k < btn.length; k++) {
                $(this).addClass("wtt").siblings().removeClass("wtt");
            }
            //this指当前被点击的li
            // 点击跳到相应楼层
            window.scrollTo(0, (this.index * 513) + 1060);
        }
    }
    // 滚动滑轮的时候 楼层反过来控制按钮
    window.onscroll = function () { //监听页面的滚动
        var ertt = window.scrollY; //获取滚动距离
        console.log(ertt);

        if (ertt < 950) {
            $(".jump").css("display", "none");
        } else {
            $(".jump").css("display", "block");
        }
        for (var i = 0; i < box.length; i++) {
            // box[i]相对于版面顶端位置 减50是屏幕顶端和盒子的顶部距离
            if (ertt >= box[i].offsetTop) {
                //排他处理
                for (var k = 0; k < btn.length; k++) {
                    btn[k].className = "";
                }
                //this指当前被点击的li
                //点击li设置css样式
                btn[i].className = "wtt";
            }
        }
        btn.onclick = function () {
            box1.style.transform = "window.scrollY";
        }
    }


    // 回到顶部
    $("#btnH").on('click', goTop)

    function goTop() {
        var pp = document.documentElement;
        var stop = document.body;
        var timer = setInterval(function () {
            //获取滚动条的滚动高度
            var osTop = pp.scrollTop || stop.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            pp.scrollTop = stop.scrollTop = osTop + speed;
            isTop = true; //用于阻止滚动事件清除定时器
            if (osTop == 0) {
                clearInterval(timer);
            }
        }, 50);
    }
    // --------------------------------------

})