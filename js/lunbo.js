// 获取图片列表
const rolling = document.querySelector(".picture_box");
// 获取li列表
const lis = document.querySelectorAll(".on li");
// 获取按钮
const left = document.querySelector(".left");
const right = document.querySelector(".right");
// 克隆第一张图片,这张图片就是无缝衔接的关键
let cloneImg = rolling.firstElementChild.cloneNode();
// 添加到图片列表的最后
rolling.appendChild(cloneImg);

let index = 0; //图片的坐标

let lock = true; //设置节流

let timer = null; //设置定时器

// 右击事件
right.onclick = () => {
    // 判断锁的状态,如果是关闭就直接return
    if (!lock) return;
    // 移动位置
    index++;
    // 给下面去掉动画重新加上动画
    rolling.style.transition = ".5s ease";
    // 当坐标等于最后一张图片时
    if (index === rolling.children.length - 1) {
        // 迅速切换到第一张图片
        setTimeout(() => {
            rolling.style.left = 0;
            index = 0;
            changeLi(index);
            // 取消过渡动画,无缝衔接第一张图片
            rolling.style.transition = "none";
        }, 500);
    }
    rolling.style.left = `${-index * 666}px`;
    if(index < rolling.children.length - 1){
        changeLi(index);
    }
    // 关锁
    lock = false;
    // 500毫秒后开锁
    setTimeout(() => {
        lock = true;
    }, 500);
};

// 改变li的样式
function changeLi(index) {
    lis.forEach((li) => {
        if (li.classList.contains("active")) {
            li.classList.remove("active");
        }
    });
    lis[index].classList.add("active");
}

// 左击事件
left.onclick = () => {
    // 判断锁的状态,如果是关闭就直接return
    if (!lock) return;
    // 如果现在是第一张图片时
    if (index === 0) {
        // 切换到克隆的图片
        rolling.style.left = `${-(rolling.children.length - 1) * 700}px`;

        // 取消动画,瞬间过去
        rolling.style.transition = "none";
        setTimeout(() => {
            // 真正的最后一张图
            index = rolling.children.length - 2;
            changeLi(index);
            // 加上动画
            rolling.style.transition = ".5s ease";
            rolling.style.left = `${-index * 666}px`;
        });
    } else {
        index--;
        rolling.style.left = `${-index * 666}px`;
        changeLi(index);
    }
    // 关锁;
    lock = false;
    // 500毫秒后开锁
    setTimeout(() => {
        lock = true;
    }, 500);
};

// li点击事件
lis.forEach((li,idx) => {
    li.onclick = () => {
        index = idx
        rolling.style.left = `${-index * 666}px`;
        changeLi(index)
    }
})

// 轮播方法
function auto() {
    // left.click();
    right.click();
}
// 定时轮播
timer = setInterval(() => {
    auto();
}, 3000);

// 监听鼠标移入和移出事件
rolling.onmouseover = () => {
    console.log("移入");
    clearInterval(timer);
};

rolling.onmouseout = () => {
    console.log("移出");
    timer = setInterval(() => {
        auto();
    }, 3000);
};