$(function () {
    $(".header-top").load("he-top.html", function () {
        class NavManager {
            constructor(data) {
                this.data = data;

                // console.log(this.data);
            }
            renderLabel() {
                this.dispose();
            }

            dispose() {
                let oDiv = document.createElement("div");
                oDiv.className = "inServerMenuB";
                var res = "";
                var data1 = ["摩西热卖", "食品饮料", "营养保健", "美妆护肤", "母婴用品", "家居生活", "数码电器", "成人用品"]

                var er = data1.map((re, index) => {

                    // let res1 = this.data.map(element => {

                    let lisStr = this.data[index].products.map((ele) => {

                        let list = ele.list.map((eles) => {
                            return `<a class="" href="">${eles}</a>`
                        }).join("");

                        return ` 
                            <ul>
                                <li>
                                    <h3>${ele.title}</h3>
                                   ${list}
                                </li>
                            </ul>
                            `

                    }).join("");
                    return ` <li class="xt_li"><a class="nin" href="">${re}</a><div class="inServerMenuB">
                    ${lisStr}
                     </div></li>`

                }).join('');

                $(".uL").html(er);

            }

        }

        $.getJSON("../js/TabStrip.json", (json) => (new NavManager(json)).renderLabel());


        // var jq = new NavManager(data);
        // jq.renderLabel();

        // ----------------------------------


        $(".navAll").mouseover(function () {
            // console.log(888);

            $(".serverMenu").css("display", "block")

        })



        // 选项卡部分
        // 鼠标移入
        $('.navAll').on('mouseover', function () {
            $('.serverMenu').addClass('xq-block')
        });
        $('.navAll').on('mouseout', function () {
            $('.serverMenu').css('display', 'none');
        });


        $(".serverMenu").on("mouseover", ".xt_li", function (e) {
            $(e.target).addClass("xt").siblings().removeClass("xt");
            var index = $(this).index();
            // console.log(index);
            $(".inServerMenuB").eq(index).addClass("xq-block").siblings().removeClass("xq-block");

        });

        $(".serverMenu").on("mouseout", ".xt_li", function (e) {

            $(e.target).removeClass("xt")
            var index = $(this).index();
            $(".inServerMenuB").eq(index).addClass("xq-block").removeClass("xq-block")
        })


    })







    var html = window.location.search.slice(-1);


    function particulars() {
        $.ajax({
            type: "get",
            url: "../php/list_e.php",
            data: {
                'IPid': html
            },
            success: function (str) {
                // console.log(str);

                data = JSON.parse(str)[0].src;
                var res = ` <img src="${data}" alt="">`

                $(".small-img").html(res);

                $(".fn").html(`<img src="${data}"    alt="">`)

                $('.ar').html(`<img src="${data}"    alt="">`)


            }
        });

    }
    particulars();

    // 放大镜

    $(function () {

        var magnifierConfig = {
            magnifier: "#magnifier1", //最外层的大容器
            width: 350, //承载容器宽
            height: 350, //承载容器高
            moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
            zoom: 3 //缩放比例
        };

        magnifier(magnifierConfig);

        /*magnifier的内置函数调用*/
        /*
            //设置magnifier函数的index属性
            _magnifier.setIndex(1);
    
            //重新载入主图,根据magnifier函数的index属性
            _magnifier.eqImg();
        */
    });


    function trus() {
        $.ajax({
            type: "get",
            url: "../php/list_e.php",
            data: {
                'IPid': html
            },
            success: function (str) {
                // console.log(str);

                data = JSON.parse(str);

                var fn = data.map((element) => {

                    return `  <div class="hyb-dinfo-box-center">
<dl>
    <dt>
        <h1>${element.title}
        </h1>
    </dt>
    <dd class="hyb-p-price">
        <ul>
            <li>
                价格：¥
                <span class="hyb-price-money" id="em-pricecny">${element.price}</span>
            </li>
            <li>
                市场价：
                <span class="hyb-price-ago">
                    ¥166.48
                </span>
            </li>
        </ul>
    </dd>
    <dd class="hyb-p-price">
        <ul>
            <li class="hyb-p-li1">
                品牌：
            </li>
            <li class="hyb-p-li2">
                产地：日本
            </li>
            <li class="hyb-p-li3">
                所属国：日本
            </li>
        </ul>
    </dd>
    <dd class="hyb-pcom-dd">
        <div class="hyb-p-dt">
            编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号 :
        </div>
        52595(635888922029150589)
    </dd>
    <dd class="hyb-pcom-dd">
        <div class="hyb-p-dt">
            库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存 :
        </div>
        <div class="hyb-p-dd">
            <span class="btn-stock hyb-p-active curr">
                日本发货
                <b class="hyb-right-red"></b>
            </span>
        </div>
    </dd>
    <dd class="hyb-pcom-dd">
        <div class="hyb-p-dt">
            配送信息：
        </div>
        <div class="hyb-p-dd">
            <span class="btn-stock hyb-p-active curr">
                海外直邮
                <b class="hyb-right-red"></b>
            </span>
            <span class="btn-stock hyb-p-active curr gf">
                经济航空运
                <b class="hyb-right-red"></b>
            </span>
            <div class="goods-time">
                <a href=""> 海外直邮，发货后约3~10天到货</a></div>
        </div>

    </dd>
    <dd class="hyb-pcom-dd">
        <div class="hyb-p-dt">数量信息：</div>
        <div class="hyb-p-dd">
            <a href="" class="hyb-btn-reduce"></a>
            <input type="text" class="hyb-total-txt" value="0">
            <a href="" class="hyb-btn-add"></a>
        </div>
    </dd>
    <dd class="hyb-pcom-dd">
        <div class="hyb-p-dt">
            销 量 ：
        </div>
        349
    </dd>
    <dd class="hyb-pcom-dd hyb-p-btn">
        <div class="hyb-p-dd">
            <a href="" class="btn-append">加入购物车</a>
            <a href="" class="btn-buy">立刻购买</a>
        </div>
    </dd>
    <dd class="hyb-warp-share">
        <div class="hyb-p-share">
            <a href="" class="hyb-btn-praise goods-button-love">
                <b></b>
                赞（0）
            </a>
            <a href="" class="hyb-btn-praise goods-button-fav">
                <b></b>
                加入收藏
            </a>
            <a href="" class="hyb-btn-share">
                <b></b>
                优惠活动
            </a>
        </div>
    </dd>

</dl>
</div>`

                }).join('');
                $(".xian").html(fn)

            }
        });

    }
    trus();




    $('.footerR').load('he-bottom.html');
})