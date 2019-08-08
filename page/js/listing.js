$(function () {
    // 引入头部
    $(".header-top").load("he-top.html", function () {

        // ------------------------------------

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



    // 主要内容

    let list = $(".select-list");
    let items = $("items");
    let iPage = 1;
    let num = 40;
    let ret = "";
    let hun = "";
    let paixu = "";
    // let pages = 0;


    function init(orderType) {
        $.ajax({
            type: 'get',
            url: '../php/listing.php',
            data: `page=${iPage}&num=${num}&ret=${ret}&hun=${hun}&paixu=${paixu}&orderType=${orderType}`,
            success: str => {
                // console.log(str);
                var src = JSON.parse(str);
                // console.log(src);
                var res = src.data.map(function (ele) {
                    // console.log(ele);

                    var html = `
                        <div class="sel-shop-iteam ">
                        <div class="s-pic">
                            <a href=""> <img src="${ele.src}" alt=""></a>
                        </div>
                        <div class="cart-price">
                            <strong>
                                ${ele.price}
                            </strong>
                            <strong>

                            </strong>
                        </div>
                        <div class="s-dec">
                            <a href="">${ele.title}</a>
                        </div>
                    </div>
                `
                    return html;
                }).join("");

                $(list).html(res);



                // 生成页码
                let pages = Math.ceil(src.pages / src.num)
                let pageBtns = "";
                for (let i = 0; i < 2; i++) {
                    pageBtns += ` <li class="item-cur" href="">${i + 1}</li> `;

                }
                $(".items").html(pageBtns);

                $(".items").children().eq(iPage - 1).addClass("active");
            }
        })
    }
    init('init');

    //3.点击页码，能够按需加载新一页数据过来渲染；事件委托实现事件绑定
    $(".items").on("click", $("li"), function (ev) {
        iPage = ev.target.innerHTML;
        init('init'); //调取最新的数据渲染到页面
    })


    $('.next').click(function () { //下一页
        iPage++;
        if (iPage > num) {
            iPage = num;
        }
        init('init');
    });
    $('.last').click(function () { //上一页
        iPage--;
        if (iPage > num) {
            iPage = 1;
        }
        init('init');
    });

    $('#btn2').click(function () {
        ret = $('#category-param-minprice').val();
        hun = $('#category-param-maxprice').val();
        init('price');
    });

    $('.nav-A li').click(function () {
        // console.log($(this).index());
        if ($(this).index() == 1) {
            init('ascending');
        } else if ($(this).index() == 2) {
            init('descending')
        } else {
            init('init')
        }
    })




    // 引入底部
    $(".footer-bottom").load("he-bottom.html", function () {});
})