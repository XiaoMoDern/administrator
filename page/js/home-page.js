$(function () {
    // 楼层跳跃
    for (var i = 0; i < $(".floor_1").length; i++) {
        // 获取屏幕的高度，设置和样式一样
        console.log($(".floor_1")[i].style.height = (window.innerHeight) + "px");
    }

    // for (var i = 0; i < $(".jump_H").length; i++) {
    //     $(".jump_H")[i].index = i;
    //     $(".jump_H")[i].onclick = function () {
    //         //排他
    //         for (var k = 0; k < $(".jump_H").length; k++) {
    //             $(".jump_H")[k].className = "";
    //         }
    //         //this指当前被点击的li
    //         //点击li设置css样式
    //         this.className = "wtt";
    //         console.log(this.index);
    //         // 点击跳到相应楼层
    //         window.scrollTo(0, this.index * innerHeight);

    //     }

    $(".jump_H").on('click', function () {
        $(this).css("background", "#FF3D3B").siblings().removeClass("");
        var index = $(this).index();
        console.log(index);
        // $(".floor_1").eq(index).show().siblings().hide();
        // window.scrollTo(0, this.index * innerHeight);
    })








})