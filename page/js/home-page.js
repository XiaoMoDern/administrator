$(function () {

    // 页面渲染
    var data = [{
            products: [{
                st: "../images/01/001.png",
                title: "活动推荐",
                hunt: "",
                huno: "",
                src: ["../images/01/129.jpg", "../images/01/119.jpg", "../images/01/116.jpg"],
                img: ["../images/01/9.jpg", "../images/01/62.jpg", "../images/01/65.jpg", "../images/01/63.jpg", "../images/01/64.jpg", "../images/01/12.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/002.png",
                title: "保税区闪送",
                hunt: "母婴食品",
                huno: "母婴食品",
                src: ["../images/01/114.jpg", "../images/01/115.jpg", "../images/01/120.jpg"],
                img: ["../images/01/2.jpg", "../images/01/88.jpg", "../images/01/83.jpg", "../images/01/54.jpg", "../images/01/82.jpg", "../images/01/3.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/003.png",
                title: "食品保健",
                hunt: "母婴食品",
                huno: "母婴食品",
                src: ["../images/01/130.jpg", "../images/01/125.jpg", "../images/01/124.jpg"],
                img: ["../images/01/5.jpg", "../images/01/60.jpg", "../images/01/79.jpg", "../images/01/77.jpg", "../images/01/52.jpg", "../images/01/4.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/004.png",
                title: "母婴用品",
                hunt: "",
                huno: "",
                src: ["../images/01/126.jpg", "../images/01/123.jpg", "../images/01/122.jpg"],
                img: ["../images/01/7.jpg", "../images/01/86.jpg", "../images/01/89.jpg", "../images/01/85.jpg", "../images/01/61.jpg", "../images/01/8.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/005.png",
                title: "美妆个护",
                hunt: "",
                huno: "",
                src: ["../images/01/127.jpg", "../images/01/128.jpg", "../images/01/118.jpg"],
                img: ["../images/01/10.jpg", "../images/01/75.jpg", "../images/01/87.jpg", "../images/01/80.jpg", "../images/01/81.png", "../images/01/17.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/006.png",
                title: "家居日化",
                hunt: "",
                huno: "",
                src: ["../images/01/111.jpg", "../images/01/112.jpg", "../images/01/116.jpg"],
                img: ["../images/01/9.jpg", "../images/01/62.jpg", "../images/01/65.jpg", "../images/01/63.jpg", "../images/01/64.jpg", "../images/01/12.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/007.png",
                title: "数码电子",
                hunt: "",
                huno: "",
                src: ["../images/01/117.jpg", "../images/01/121.jpg", "../images/01/112.jpg"],
                img: ["../images/01/15.jpg", "../images/01/78.jpg", "../images/01/69.jpg", "../images/01/66.jpg", "../images/01/67.jpg", "../images/01/14.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/008.png",
                title: "箱包首饰",
                hunt: "",
                huno: "",
                src: ["../images/01/116.jpg", "../images/01/126.jpg", "../images/01/129.jpg"],
                img: ["../images/01/16.jpg", "../images/01/70.jpg", "../images/01/71.jpg", "../images/01/72.jpg", "../images/01/73.jpg", "../images/01/21.jpg"]
            }]
        },
        {
            products: [{
                st: "../images/01/007.png",
                title: "成人用品",
                hunt: "",
                huno: "",
                src: ["../images/01/116.jpg", "../images/01/126.jpg", "../images/01/129.jpg"],
                img: ["../images/01/18.jpg", "../images/01/90.jpg", "../images/01/91.jpg", "../images/01/92.jpg", "../images/01/93.jpg", "../images/01/19.jpg"]
            }]
        }
    ]
    // console.log(JSON.stringify(data));

    class floor {
        constructor(data) {
            this.data = data;
        }

        renderLabel() {
            this.dispose();

        }

        dispose() {
            let oDiv = document.createElement("div");
            oDiv.className = "floor_1";
            var res = "";
            this.data.forEach(element => {
                let lisStr = element.products.map((ele) => {
                    let list = ele.img.map((eles) => {
                        return ` <li><img src="${eles}" alt=""></li>`
                    }).join("");
                    let list1 = ele.src.map((elet) => {
                        return `<a class="swiper-slide" href="javascript"><img src="${elet}" alt=""></a> `
                    }).join('');
                    return ` 

                <div class="f_title">
                    <span class="f_ico">
                    <img src="${ele.st}" alt=""></span>
                    <b>${ele.title}</b>
                    <div class="mQ">
                    <ul>
                        <li>${ele.hunt}</li>
                        <li>${ele.huno}</li>
                    </ul>
                </div>
                </div>
                <div class="f_con">
                <div class="f_con_l swiper-container">
                    <div class="swiper-wrapper">
                    ${list1}
                    </div>   
               </div>        
                 <div class="f_con_r">
                        <ul>
                          ${list}
                        </ul>
                    </div>
                </div>

                `

                }).join("");
                res += `
            <div class="floor_1">
            ${lisStr}
             </div>
            `


            })
            // 返回标签

            return $(".floor>.content").html(res);

        }

    }

    var SQ = new floor(data);
    SQ.renderLabel();


    // $.getJSON("../json-in/floor.json", (json) => (new floor(json)).renderLabel());
    // -------------------------------------------------
    /* 楼层跳跃 */
    //获取标签
    var jump = $(".jump");
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

        if (ertt < 950) {
            $(".jump").css("display", "none");
        } else {
            $(".jump").css("display", "block");
        }



        for (var i = 0; i < box.length; i++) {
            // console.log(box.length);

            // box[i]相对于版面顶端位置 减50是屏幕顶端和盒子的顶部距离
            if (ertt >= box[i].offsetTop) {
                //排他处理
                for (var k = 0; k < btn.length; k++) {
                    btn[k].className = "";
                }
                btn[i].className = "wtt";
            }
        }
        btn.onclick = function () {
            box1.style.transform = "window.scrollY";
        }
    }


    // 回到顶部
    $("#btnH").on('click', goTop);

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
    // 小图轮播

    var swiper = new Swiper('.f_con_l', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },

    });

})