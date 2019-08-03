$(function () {


    // -------------------------------------------------

    //获取标签
    var jump = $(".jump");
    console.log(jump);

    var btn = $(".jump_H"); //按钮组
    var box = $(".floor_1"); //楼层组


    // 给按钮组绑定事件  点击时可以跳到相应的楼层
    for (var i = 0; i < box.length; i++) {
        // 获取屏幕的高度，设置和样式一样
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
            //点击li设置css样式
            // this.className = "wtt";
            console.log(this.index);
            // 点击跳到相应楼层
            window.scrollTo(0, (this.index * innerHeight) + 1060);


        }
    }

    // 滚动滑轮的时候 楼层反过来控制按钮

    window.onscroll = function () { //监听页面的滚动
        var ertt = window.scrollY; //获取滚动距离
        console.log(ertt);

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


})