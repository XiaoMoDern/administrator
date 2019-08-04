$(function () {
    $(".header-top").load("he-top.html", function () {
        // 选项卡部分
        // 鼠标移入
        $(".xt_li").mouseenter(function () {
            $(this).addClass("xt").siblings().removeClass("xt");
            var index = $(this).index();
            // console.log(index);
            $(".inServerMenuB").eq(index).addClass("xq-block").siblings().removeClass("xq-block");
        })
        // 鼠标移出
        $(".xt_li").mouseout(function () {
            $(this).removeClass("xt")
            var index = $(this).index();
            $(".inServerMenuB").eq(index).addClass("xq-block").removeClass("xq-block")
        })

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
                this.data.forEach(element => {
                    let lisStr = element.products.map((ele) => {
                        let list = ele.list.map((eles) => {
                            return `<a href="">${eles}</a>`
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
                    res += `
                    <div class="inServerMenuB">
                    ${lisStr}
                     </div>
                    `
                })
                // 返回标签
                return $(".inServerMenuList").html(res);

            }

        }



        // var jq = new NavManager(data);
        // jq.renderLabel();
        // ----------------------------------

        $.getJSON("../js/TabStrip.json", (json) => (new NavManager(json)).renderLabel());

    });

    $(".footer-bottom").load("he-bottom.html", function () {


    });
})