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
            // console.log(888);

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
    // 图形验证码
    let imgCodeText = "";

    (new Captcha({
        fontSize: 30,
        content: "wweyeqytruth12334345425"
    })).draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码1');
        imgCodeText = r;
    });




    // 正则
    // let regUsername = /^[A-Za-z]{6,8}$/;
    let regPhone = /^1[3-9]\d{9}$/; /* 1开头 第二位3-9 后面全都是数字   11位 */
    let regPassword = /^[a-zA-Z0-9]{6,16}$/;


    // 获取标签
    let tp = $(".tp");
    console.log(tp);

    var phone = $(".phone");
    let passwdrdA = $('#passwdrdA');
    let passwdrdB = $("#passwdrdB");
    let htnl = "x"
    let htvl = "√"






    // 手机号码验证
    phone.blur(function (e) {
        // 清空格
        let text = $.trim($(this).val());
        // 判断内容是否为空
        if (text.length == 0) {
            // 添加样式
            // alert("手机号码不能为空！")
            $(".h1").html(htnl)
            $(".h1").css("display", "block")
        } else if (!regPhone.test(text)) {
            alert("请您输入正确的手机号码！")
            $(".h1").html(htnl)
            $(".h1").css("display", "block")
        } else if (regPhone.test(text)) {
            $(".h1").html(htvl)
            $(".h1").css("display", "block")
        }


    });
    // 密码验证
    let passwdrdAtext = "";
    passwdrdA.blur(function (e) {
        // 清空格
        let text = $.trim($(this).val());
        // 判断内容是否为空
        passwdrdAtext = text;
        // console.log(passwdrdAtat);

        if (text.length == 0) {
            // 添加样式
            $(".h2").html(htnl)
            $(".h2").css("display", "block")
        } else if (!regPassword.test(text)) {
            alert("请您输入正确的密码！")
            $(".h2").html(htnl)
            $(".h2").css("display", "block")
        } else if (regPassword.test(text)) {
            $(".h2").html(htvl)
            $(".h2").css("display", "block")
        }


    });
    // 确认密码
    passwdrdB.blur(function (e) {
        // 清空格
        let text = $.trim($(this).val());
        console.log(text);

        // 判断内容是否为空
        if (text.length == 0) {
            // 添加样式
            $(".h3").html(htnl)
            $(".h3").css("display", "block")
        } else if (passwdrdAtext != text) {
            alert("您输入的密码不匹配！")
            $(".h3").html(htnl)
            $(".h3").css("display", "block")
        } else {
            $(".h3").html(htvl)
            $(".h3").css("display", "block")
        }
    });


    // 图片验证码
    tp.blur(function (e) {
        // 清空格
        let text = $.trim($(this).val());
        // 判断内容是否为空
        if (text.length == 0) {
            // 添加样式
            // alert("手机号码不能为空！")
            $(".h4").html(htnl)
            $(".h4").css("display", "block")
        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            alert("验证码不正确！")
            $(".h4").html(htnl)
            $(".h4").css("display", "block")
        } else {
            $(".h4").html(htvl)
            $(".h4").css("display", "block")
        }


    });

})