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

    // =------------

    // -=========




    $(".footer-bottom").load("he-bottom.html", function () {


    });
})