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


    $(".footer-bottom").load("he-bottom.html", function () {


    });

    $(".qt").click(function () {
        alert("还没有开放哦！！！！！")
    })


    // ---------------------------------------

    /* 图形验证码 */
    let imgCodeText = "";
    /* 短信验证码 */
    var msgText = "";
    /* 密码 */
    let passwordAText = "";
    let passwordBText = "";
    /* 用户名 */
    let usernameText = "";
    /* 手机号码 */
    let phoneText = "";


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
    let HY = $(".HY");
    let msgCode = $("#msgCode")
    var phone = $(".phone");
    let passwdrdA = $('#passwdrdA');
    let passwdrdB = $("#passwdrdB");
    let imageCode = $("imageCode");
    let tu = $(".tu")
    let htnl = "x"
    let htvl = "√"


    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }


    HY.click(function () {
        msgCodeText = parseInt(Math.random() * 1000000);
        /* 检查手机号码是否正确 */
        var text = $.trim(phone.val());
        if (text.length != 0 && regPhone.test(text)) {

            /* 发送网络请求：发短信 */
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '101997', //这里需要改成自己的appid
                    "showapi_sign": '01dcd0c0aeab40339708b6e767e0c1a3', //这里需要改成自己的应用的密钥secret
                    "mobile": text,
                    "content": `{"code":${msgCodeText},"minute":"3","comName":"摩西摩西购物网"}`,
                    "tNum": "T150606060601",
                    "big_msg": ""
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log(result) //console变量在ie低版本下不能用
                    // alert(result.showapi_res_code)
                }
            });

            var count = 60;
            var timer = setInterval(function () {
                count--;
                if (count <= 0) {
                    HY.html("发送短信验证码");
                    clearInterval(timer);
                } else {
                    HY.html("重试 " + count + "s");
                }
            }, 1000);
        } else {
            alert("手机号码不正确");
        }

        /* 开启倒计时：当前的标签不可点击 */
    });
    // 手机号码验证
    phone.blur(function (e) {
        // 清空格
        let text = $.trim($(this).val());
        phoneText = text;
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

    tu.blur(function (e) {
        let text = $.trim($(this).val());
        msgText = text;

        if (text.length == 0) {
            alert("短信验证码不能为空!")
            $(".h5").html(htnl)
            $(".h5").css("display", "block")
        } else if (text != msgCodeText) {
            $(".h5").html(htnl)
            $(".h5").css("display", "block")
        } else {
            $(".h5").html(htvl)
            $(".h5").css("display", "block")

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
        passwordBText = text;
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
            $(".h4").css("display", "none")
        } else if (imgCodeText.toLowerCase() != text.toLowerCase()) {
            // alert("验证码不正确！")
            $(".h4").html(htnl)
            $(".h4").css("display", "block")
        } else {
            $(".h4").html(htvl)
            $(".h4").css("display", "block")
        }

    });


    /* 验证码处理 */
    (new Captcha({
        fontSize: 30
    })).draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码1');
        imgCodeText = r;
        /* 自动触发标签失去焦点的事件 */
        tp.trigger("blur");
    });





    // ----------------
    $("#registerBtn").click(function () {
        let isCheck = $("#protocol").is(":checked");
        if (!isCheck) {
            alert("请阅读并同意用户协议");
            return;
        }

        usernameText = "jiji";
        phoneText = "18689429886";
        msgText = "111";
        imgCodeText = "222";
        passwordBText = passwordAText = "33333333";

        
        if (usernameText.length != 0 &&
            phoneText.length != 0 &&
            msgText.length != 0 &&
            passwordAText.length != 0 &&
            passwordBText.length != 0 &&
            imgCodeText.length != 0 && $(".form-group-error").length == 0
        ) 
        {

            $.ajax({
                type: "post",
                url: "../php/register.phps",
                dataType: "json",
                data: `username=${usernameText}&password=${passwordAText}&phone=${phoneText}`,
                // dataType: "dataType",
                success: function (response) {
                    console.log(response);
                    /* 先检查请求的结果，然后做出对应的处理 */
                    if (response.status == "success") {
                        alert(response.msg);
                        /* 跳转到登录页面 */
                        window.location.href = "http://www.baidu.com"
                    } else {
                        alert(response.msg);
                    }
                }
            });
        }

    })
})