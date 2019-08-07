$(function () {
    // 引入头部
    $(".header-top").load("he-top.html", function () {




    })



    // 主要内容

    let list = $(".select-list");

    let iPage = 1;
    let num = 40;


    function init() {

        $.ajax({
            type: 'get',
            url: '../php/listing.php',
            data: 'page=' + iPage + '&num=' + num,
            success: str => {
                // console.log(str);
                var src = JSON.parse(str);
                console.log(src);
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



            }
        })

        $(".category-sort li").click(function () {
            console.log($(this).index());

        })
    }
    init();





    // 引入底部
    $(".footer-bottom").load("he-bottom.html", function () {});
})