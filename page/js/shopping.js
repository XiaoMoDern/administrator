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


        var CookieName = getCookie("tru");
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: {
                "userName": CookieName
            },
            success: function (response) {
                // console.log(response);
                data = JSON.parse(response);
                // console.log(data);

                var res = '';
                var res2 = data.map((ele) => {
                    return `
                    
                    <ul class="order_lists">
                                <li class="list_chk">
                                    <input type="checkbox" id="checkbox_2" class="son_check">
                                    <label for="checkbox_2"></label>
                                </li>
                                <li class="list_con">
                                    <div class="list_img"><a href="javascript:;"><img src=${ele.src}
                                                alt=""></a></div>
                                    <div class="list_text"><a href="javascript:;">${ele.title}</a></div>
                                </li>
                                <li class="list_info">
    
                                </li>
                                <li class="list_price ip">
                                    <p class="price">￥${ele.price}</p>
                                </li>
                                <li class="list_amount">
                                    <div class="amount_box">
                                        <a href="javascript:;" class="reduce reSty">-</a>
                                        <input type="text" value="1" class="sum">
                                        <a href="javascript:;" class="plus">+</a>
                                    </div>
                                </li>
                                <li class="list_sum">
                                    <p class="sum_price">￥980</p>
                                </li>
                                <li class="list_op">
                                    <p class="del"><a href="javascript:;" class="delBtn delgod">移除商品</a></p>
                                </li>
                                </ul>
                           
                    `

                }).join('');

                res += `<div class="order_content">  ${res2}     </div> `
                $(".cartBox").html(res);
                xuanran();
            }

        });




    });



    // ===============================================
    function xuanran() {
        //全局的checkbox选中和未选中的样式
        var $allCheckbox = $('input[type="checkbox"]'), //全局的全部checkbox
            $wholeChexbox = $('.whole_check'),
            $cartBox = $('.cartBox'), //每个商铺盒子
            $shopCheckbox = $('.shopChoice'), //每个商铺的checkbox
            $sonCheckBox = $('.son_check');
        //每个商铺下的商品的checkbox

        //	$('#cartMain').on('click','input[type="checkbox"]',function(){
        //		if($(this).is(':checked')) {
        //			$(this).next('label').addClass('mark');
        //		} else {
        //			$(this).next('label').removeClass('mark')
        //		}
        //	});

        $allCheckbox.click(function () {
            if ($(this).is(':checked')) {
                $(this).next('label').addClass('mark');
            } else {
                $(this).next('label').removeClass('mark')
            }
        });

        //===============================================全局全选与单个商品的关系================================
        $wholeChexbox.click(function () {
            var $checkboxs = $cartBox.find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
                $checkboxs.next('label').addClass('mark');
            } else {
                $checkboxs.prop("checked", false);
                $checkboxs.next('label').removeClass('mark');
            }
            totalMoney();
        });

        $sonCheckBox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：所有单个商品是否勾选
                    var len = $sonCheckBox.length;
                    var num = 0;
                    $sonCheckBox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }
                } else {
                    //单个商品取消勾选，全局全选取消勾选
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');
                }
            })
        })

        //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

        //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
        $shopCheckbox.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：店铺全选中，则全局全选按钮打对勾。
                    var len = $shopCheckbox.length;
                    var num = 0;
                    $shopCheckbox.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $wholeChexbox.prop("checked", true);
                        $wholeChexbox.next('label').addClass('mark');
                    }

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                    $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
                } else {
                    //否则，全局全选按钮取消对勾
                    $wholeChexbox.prop("checked", false);
                    $wholeChexbox.next('label').removeClass('mark');

                    //店铺下的checkbox选中状态
                    $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                    $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
                }
                totalMoney();
            });
        });

        //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

        //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
        $cartBox.each(function () {
            var $this = $(this);
            var $sonChecks = $this.find('.son_check');
            $sonChecks.each(function () {
                $(this).click(function () {
                    if ($(this).is(':checked')) {
                        //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                        var len = $sonChecks.length;
                        var num = 0;
                        $sonChecks.each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                            }
                        });
                        if (num == len) {
                            $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                            $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                        }

                    } else {
                        //否则，店铺全选取消
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                    }
                    totalMoney();
                });
            });
        });

        //=================================================商品数量==============================================
        var $plus = $('.plus'),
            $reduce = $('.reduce'),
            $all_sum = $('.sum');
        $plus.click(function () {
            var $inputVal = $(this).prev('input'),
                $count = parseInt($inputVal.val()) + 1,
                $obj = $(this).parents('.amount_box').find('.reduce'),
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(), //单价
                $priceTotal = $count * parseInt($price.substring(1));
            $inputVal.val($count);
            $priceTotalObj.html('￥' + $priceTotal);
            if ($inputVal.val() > 1 && $obj.hasClass('reSty')) {
                $obj.removeClass('reSty');
            }
            totalMoney();
        });

        $reduce.click(function () {
            var $inputVal = $(this).next('input'),
                $count = parseInt($inputVal.val()) - 1,
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(), //单价
                $priceTotal = $count * parseInt($price.substring(1));
            if ($inputVal.val() > 1) {
                $inputVal.val($count);
                $priceTotalObj.html('￥' + $priceTotal);
            }
            if ($inputVal.val() == 1 && !$(this).hasClass('reSty')) {
                $(this).addClass('reSty');
            }
            totalMoney();
        });

        $all_sum.keyup(function () {
            var $count = 0,
                $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
                $price = $(this).parents('.order_lists').find('.price').html(), //单价
                $priceTotal = 0;
            if ($(this).val() == '') {
                $(this).val('1');
            }
            $(this).val($(this).val().replace(/\D|^0/g, ''));
            $count = $(this).val();
            $priceTotal = $count * parseInt($price.substring(1));
            $(this).attr('value', $count);
            $priceTotalObj.html('￥' + $priceTotal);
            totalMoney();
        })

        //======================================移除商品========================================

        var $order_lists = null;
        var $order_content = '';
        var index = 0;
        var goid = 0;
        $('.delBtn').click(function () {
            index = $(this).index('.delgod');
            // console.log(index);
            goid = data[index].id;
            console.log(goid);

            $('.all_del').css('display', 'none');
            $('.itemdel').css('display', 'block');

            $order_lists = $(this).parents('.order_lists');
            $order_content = $order_lists.parents('.order_content');
            // $('.model_bg').fadeIn(300);
            // $('.my_model').fadeIn(300);
        });

        //关闭模态框
        $('.closeModel').click(function () {
            closeM();
        });
        $('.dialog-close').click(function () {
            closeM();
        });

        function closeM() {
            $('.model_bg').fadeOut(300);
            $('.my_model').fadeOut(300);
        }
        //确定按钮，移除商品
        $('.dialog-sure').click(function () {
            $order_lists.remove();
            if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
                $order_content.parents('.cartBox').remove();
            }
            closeM();
            $sonCheckBox = $('.son_check');
            totalMoney();


            //数据库移除数据
            // console.log(index);
            // console.log(goid);
            $.ajax({
                type: 'post',
                url: '../php/cart.php',
                data: {
                    'goid': goid
                },
                success: function (str) {
                    console.log(str);
                }
            });

        })
        //全部删除
        $('.alldel').click(function () {
            $('.itemdel').css('display', 'none');
            // $('.model_bg').fadeIn(300);
            // $('.my_model').fadeIn(300);
            $('.all_del').css('display', 'block');
            $('.itemdel').css('display', 'none');
        });
        //关闭模态框
        $('.closeModel').click(function () {
            closeM();
        });
        $('.dialog-close').click(function () {
            closeM();
        });

        function closeM() {
            $('.model_bg').fadeOut(300);
            $('.my_model').fadeOut(300);
        }
        $('.queall').click(function () {
            closeM();
            $sonCheckBox = $('.son_check');
            totalMoney();
            $('.order_content').children('.aaa').remove();
            $.ajax({
                type: 'post',
                url: '../api/cart.php',
                data: {
                    'allname': uname
                },
                success: function (str) {
                    console.log(str);

                }
            });

        });

        //======================================总计==========================================

        function totalMoney() {
            var total_money = 0;
            var total_count = 0;
            var calBtn = $('.calBtn a');
            $sonCheckBox.each(function () {
                if ($(this).is(':checked')) {
                    var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                    var num = parseInt($(this).parents('.order_lists').find('.sum').val());
                    total_money += goods;
                    total_count += num;
                }
            });
            $('.total_text').html('￥' + total_money);
            $('.piece_num').html(total_count);

            // console.log(total_money,total_count);

            if (total_money != 0 && total_count != 0) {
                if (!calBtn.hasClass('btn_sty')) {
                    calBtn.addClass('btn_sty');
                }
            } else {
                if (calBtn.hasClass('btn_sty')) {
                    calBtn.removeClass('btn_sty');
                }
            }
        }

    }



    // ===============================================




    $('.footerR').load('he-bottom.html');
})