$(function () {
    // 引入头部
    $(".header-top").load("he-top.html", function () {




    })



    // 主要内容

    let list = $(".select-list");
    let items = $("items");
    let iPage = 1;
    let num = 40;
    // let pages = 0;


    function init() {
        $.ajax({
            type: 'get',
            url: '../php/listing.php',
            data: 'page=' + iPage + '&num=' + num,
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
                for (let i = 0; i < pages; i++) {
                    pageBtns += ` <li class="item-cur" href="">${i + 1}</li> `;

                }
                $(".items").html(pageBtns);
                $(".items").children().eq(iPage - 1).addClass("active");
            }
        })
    }
    init();
    //3.点击页码，能够按需加载新一页数据过来渲染；事件委托实现事件绑定
    $(".items").on("click", $("li"), function (ev) {
        iPage = ev.target.innerHTML;
        init(); //调取最新的数据渲染到页面
    })


    $('.next').click(function () { //下一页
        iPage++;
        if (iPage > num) {
            iPage = num;
        }
        init();
    });
    $('.last').click(function () { //上一页
        iPage--;
        if (iPage > num) {
            iPage = 1;
        }
        init();
    });


    // 引入底部
    $(".footer-bottom").load("he-bottom.html", function () {});
})