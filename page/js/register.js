$(function () {
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
            console.log(888);

            $(".serverMenu").css("display", "block")

        })



        // 选项卡部分
        // 鼠标移入

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


    $(".footer-bottom").load("he-bottom.html", function () {


    });


    // ---------------------------------------
    // 正则
    let regUsername = /^[A-Za-z]{6,8}$/;
    let regPhone = /^1[3-9]\d{9}$/; /* 1开头 第二位3-9 后面全都是数字   11位 */
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;

    phone.blur(function (e) {
        let text = $.trim($(this).val());
        let parent = $(this).parents(".form-item");
        let msg = $(this).nextAll(".form-group__message");

        if (text.length == 0) {
            parent.addClass("form-group-error");
            msg.html("手机号码不能为空");
        } else if (!regPhone.test(text)) {
            parent.addClass("form-group-error");
            msg.html("请输入正确的手机号码！");
        } else {
            parent.removeClass("form-group-error");
        }
    });


})