class BannerManager {
    constructor(data, root = document.getElementsByClassName("banner")[0]) {
        this.data = data;
        this.sliderBox = null;
        this.sliderNav = null;
        this.slider = null;
        this.root = root;
    }
    init() {
        /* 初始化数据 */
        this.index = 0;
        this.sliderBoxStyleLeft = 0;
        this.sliderBoxItemWidth = 950;

        this.createHTML()
        this.root.appendChild(this.slider);

        this.sliderBoxItemCount = this.data.length;
        this.addEventHandle();
        this.switchSlider(0);
        this.autoPlayer();
        this.addMouseHandle();
        this.addMouseHandleWithItem();
        // ----------
        this.addCss(0);
    }
    createHTML() {
        let sliderBox = document.createElement("ul");
        sliderBox.className = "slider-box";
        let html = this.data.map((ele) => {
            return `<li class="slider-box-item"><img src=${ele}></li>`
        }).join("");
        sliderBox.innerHTML = html;

        let sliderControl = document.createElement("div");
        sliderControl.className = "slider-control";
        sliderControl.innerHTML = `
             <span class="prev"></span>
             <span class="next"></span>
        `

        let sliderNav = document.createElement("ol");
        sliderNav.className = "slider-nav";

        let html2 = this.data.map((ele, index) => {
            return `<li class="slider-nav-item"></li>`
        }).join("");
        sliderNav.innerHTML = html2;


        let slider = document.createElement("div");
        slider.className = "slider"
        slider.appendChild(sliderBox)
        slider.appendChild(sliderControl)
        slider.appendChild(sliderNav)

        this.slider = slider;
        this.sliderBox = sliderBox;
        this.sliderNav = sliderNav;
        this.sliderControl = sliderControl;
    }
    autoPlayer() {
        this.timer = setInterval(() => {
            this.next();
        }, 2000)
    }
    next() {
        this.index++;
        /*临界值检查*/
        if (this.index > (this.sliderBoxItemCount - 1)) {
            this.index = 0;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchSlider(this.index);
        // ------------------
        this.addCss(this.index)
    }
    prev() {
        this.index--;
        /*临界值检查*/
        if (this.index < 0) {
            this.index = this.sliderBoxItemCount - 1;
        }
        this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
        this.switchSlider(this.index);
        // ----------
        this.addCss(this.index)
    }
    addEventHandle() {
        /* 获取标签 */
        this.sliderControl.onclick = (e) => {
            if (e.target.className == "prev") {
                this.prev();
            } else if (e.target.className == "next") {
                this.next();
            }
        }
    }
    switchSlider(index) {
        // console.log(index);

        Array.from(this.sliderNav.children).forEach((ele) => {
            ele.className = "slider-nav-item"
        })
        this.sliderNav.children[index].className = "slider-nav-item active";

    }
    addMouseHandle() {
        /* 鼠标移入的时候 */
        this.slider.onmouseenter = () => {
            clearInterval(this.timer)
        }

        /* 鼠标移出的时候 */
        this.slider.onmouseleave = () => {
            this.autoPlayer();
        }
    }
    addMouseHandleWithItem() {
        Array.from(this.sliderNav.children).forEach((ele, index) => {
            ele.onclick = () => {
                /* 切换标签 */
                this.index = index;
                this.sliderBox.style.left = -this.index * this.sliderBoxItemWidth + "px";
                this.switchSlider(this.index);
                this.addCss(this.index)
            }
        })
    }

    addCss(index) {
        var res = index;
        switch (res) {
            case 0:
                $('.ban_wrap').css('background-color', 'rgb(252, 236, 218)')
                break;
            case 1:
                $('.ban_wrap').css('background-color', '#f1f1f1')
                break;
            case 2:
                $('.ban_wrap').css('background-color', 'rgb(126, 224, 253)')
                break;
            case 3:
                $('.ban_wrap').css('background-color', '#f1f1f1')
                break;
            case 4:
                $('.ban_wrap').css('background-color', 'rgb(255, 199, 44)')
                break;
            case 5:
                $('.ban_wrap').css('background-color', '#f1f1f1')
                break;
        }

    }
}


// $.getJSON("./picture.json", (json) => (new BannerManager(json)).init());