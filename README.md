
![](https://upload-images.jianshu.io/upload_images/12890819-b26f439121646da3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 1. 需求

实现父 div 里面 左右，上下动态分割 div，并上下改变父 div 的高度，并且宽和高都是按百分比（如图） 。

![](https://upload-images.jianshu.io/upload_images/12890819-afc3e32ece5f4c2b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 2. 实现原理

## 2.1 父布局

```
<div class='hj-wrap'>
        <div class="arrow"></div>
    </div>
```

- 首先一个父 div 为 hj-wrap，相对定位 。
- 一个改变父 div 高度的 arrow，用于上下拖动 , 不能占有位置，所以要绝对定位，并定位到最右下角。
- 上下拖动的 arrow，当上拖动时，arrow 的父 div 的高度变小，当下拖动时，arrow 的父 div 的高度变大。

# 2.2 横向布局

```
<div class='hj-wrap'>
        <div class="hj-transverse-split-div">
            横 向
            <label class="hj-transverse-split-label"></label>
        </div>
        <div class="hj-transverse-split-div">横 向 2
            <label class="hj-transverse-split-label"></label>
        </div>
        <div class="hj-transverse-split-div">横 向 3
            <label class="hj-transverse-split-label"></label>
        </div>
        <div class="hj-transverse-split-div">横 向 4
            <label class="hj-transverse-split-label"></label>
        </div>
        <div class="hj-transverse-split-div">横 向 5
        </div>
        <div class="arrow"></div>
    </div>
```
 
- 每一个横向的 div 为 hj-transverse-split-div 并相对定位，里面有一个拖动改变左右的 label 为 hj-transverse-split-label ，不能占有位置，所以要绝对定位，并定位到最右边并高为 100%，最后一个横向的 div 不用 hj-transverse-split-label 。
- 拖动改变左右的 label 时，向左时，label 的父 div 的宽变小，label 的父 div 相邻的 右边的 div 宽度变大。

# 2.3 竖向布局

```
<div class='hj-wrap verticals'>
        <div class="hj-vertical-split-div">上
            <label class="hj-vertical-split-label"></label>
        </div>
        <div class="hj-vertical-split-div">中
            <label class="hj-vertical-split-label"></label>
        </div>
        <div class="hj-vertical-split-div">下</div>
        <div class="arrow"></div>
    </div>
```
 
- 每一个横向的 div 为 hj-vertical-split-div 并相对定位，里面有一个拖动改变左右的 label 为 hj-vertical-split-label ，不能占有位置，所以要绝对定位，并定位到最下边并宽为 100%，最后一个竖向的 div 不用再放 hj-vertical-split-label 的 label 。
- 拖动改变上下的 label 时，向上时，label 的父 div 的高度变小，label 的父 div 相邻的下边的 div 高度变大。

# 3. js 实现

代码：

```
/**
 * name:   split.js
 * author:  biaochen
 * date:    2018-12-26
 *
 */
$(function() {
    //鼠标横向、竖向、和改变父高度的上下 操作对象
    var thisTransverseObject, thisVerticalObject, thisArrowObject;
    //文档对象
    var doc = document;
    //横向分割栏
    var transverseLabels = $(".hj-wrap").find(".hj-transverse-split-label");
    //竖向分割栏
    var verticalLabels = $(".hj-wrap").find(".hj-vertical-split-label");
    // 改变父高度的 箭头 div
    var parentArrow = $(".hj-wrap").find(".arrow");

    // 设置宽
    function setWidth(type) {
        if (type === "init") {
            var length = $(".hj-wrap").length;
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    var width = $($(".hj-wrap")[i])[0].offsetWidth;
                    var hjDivNums = $($(".hj-wrap")[i]).children(".hj-transverse-split-div");
                    // var defaultWidth = Math.floor(100 / hjDivNums.length);
                    var defaultWidth = Math.floor(width / hjDivNums.length);
                    $($(".hj-wrap")[i])
                        .children(".hj-transverse-split-div")
                        .width(defaultWidth + "px");
                    // .width(defaultWidth + "%");
                }
            }
        } else {
            // 设置百分比
            var transverseDivs = $(".hj-transverse-split-div")
            var widthLength = transverseDivs.length
            for (var i = 0; i < widthLength; i++) {
                var width = $(transverseDivs[i]).width();
                var parentWidth = $(transverseDivs[i])
                    .parent()
                    .width();
                var rate = (width / parentWidth) * 100 + "%";
                $(transverseDivs[i]).css({ width: rate });
            }
        }
    }

    // 设置高
    function setHeight(type) {
        if (type === "init") {
            var verticalsParentDivs = $(".verticals");
            var parentLengths = verticalsParentDivs.length;
            for (var i = 0; i < parentLengths; i++) {
                var parentHeight = $(verticalsParentDivs[i]).height();
                var childrenNum = $(verticalsParentDivs[i]).children(
                    ".hj-vertical-split-div"
                ).length;
                var defaultHeight = Math.floor(parentHeight / childrenNum);
                // var rate = Math.floor((height / parentHeight)* 100)  + '%'
                var defaultHeight = Math.floor(100 / childrenNum);
                $(verticalsParentDivs[i])
                    .children(".hj-vertical-split-div")
                    .height(defaultHeight + "%");
                // .height(defaultHeight + "px");
            }
        } else {
            // 设置百分比
            var verticalsDivs = $(".hj-vertical-split-div");
            var heightLength = verticalsDivs.length;
            for (var i = 0; i < heightLength; i++) {
                var height = $(verticalsDivs[i]).height();
                var parentHeight = $(verticalsDivs[i])
                    .parent()
                    .height();
                var rate = (height / parentHeight) * 100 + "%";
                $(verticalsDivs[i]).css({ height: rate });
            }
        }
    }

    setWidth('init')
    setHeight("init");

    //定义一个对象
    function PointerObject() {
        this.el = null; //当前鼠标选择的对象
        this.clickX = 0; //鼠标横向初始位置
        this.clickY = 0; //鼠标竖向初始位置
        this.transverseDragging = false; //判断鼠标可否横向拖动
        this.verticalDragging = false; //判断鼠标可否竖向拖动
    }
    //横向分隔栏绑定事件
    transverseLabels.bind("mousedown", function(e) {
        thisTransverseObject = new PointerObject();
        thisTransverseObject.transverseDragging = true; //鼠标可横向拖动
        thisTransverseObject.el = this;
        thisTransverseObject.clickX = e.pageX; //记录鼠标横向初始位置
    });

    //竖向分隔栏绑定事件
    verticalLabels.bind("mousedown", function(e) {
        //console.log("mousedown");
        thisVerticalObject = new PointerObject();
        thisVerticalObject.verticalDragging = true; //鼠标可竖向拖动
        thisVerticalObject.el = this;
        thisVerticalObject.clickY = e.pageY; //记录鼠标竖向初始位置
    });
    //上下绑定事件
    parentArrow.bind("mousedown", function(e) {
        //console.log("mousedown");
        thisArrowObject = new PointerObject();
        // thisArrowObject.transverseDragging = true; //鼠标可横向拖动
        thisArrowObject.verticalDragging = true; //鼠标可竖向拖动
        thisArrowObject.el = this;
        thisArrowObject.clickY = e.pageY; //记录鼠标竖向初始位置
    });

    doc.onmousemove = function(e) {
        //鼠标横向拖动
        if (thisTransverseObject != null) {
            if (thisTransverseObject.transverseDragging) {
                var changeDistance = 0;
                if (thisTransverseObject.clickX >= e.pageX) {
                    //鼠标向左移动
                    changeDistance =
                        Number(thisTransverseObject.clickX) - Number(e.pageX);
                    if (
                        $(thisTransverseObject.el)
                        .parent()
                        .width() -
                        changeDistance <
                        20
                    ) {} else {
                        $(thisTransverseObject.el)
                            .parent()
                            .width(
                                $(thisTransverseObject.el)
                                .parent()
                                .width() - changeDistance
                            );
                        $(thisTransverseObject.el)
                            .parent()
                            .next()
                            .width(
                                $(thisTransverseObject.el)
                                .parent()
                                .next()
                                .width() + changeDistance
                            );
                        thisTransverseObject.clickX = e.pageX;
                        $(thisTransverseObject.el).offset({ left: e.pageX });
                    }
                } else {
                    //鼠标向右移动
                    changeDistance =
                        Number(e.pageX) - Number(thisTransverseObject.clickX);
                    if (
                        $(thisTransverseObject.el)
                        .parent()
                        .next()
                        .width() -
                        changeDistance <
                        20
                    ) {} else {
                        $(thisTransverseObject.el)
                            .parent()
                            .width(
                                $(thisTransverseObject.el)
                                .parent()
                                .width() + changeDistance
                            );
                        $(thisTransverseObject.el)
                            .parent()
                            .next()
                            .width(
                                $(thisTransverseObject.el)
                                .parent()
                                .next()
                                .width() - changeDistance
                            );
                        thisTransverseObject.clickX = e.pageX;
                        $(thisTransverseObject.el).offset({ left: e.pageX });
                    }
                }
                $(thisTransverseObject.el).width(2);
            }
        }
        //鼠标竖向拖动
        if (thisVerticalObject != null) {
            if (thisVerticalObject.verticalDragging) {
                var changeDistance = 0;
                if (thisVerticalObject.clickY >= e.pageY) {
                    //鼠标向上移动
                    changeDistance = Number(thisVerticalObject.clickY) - Number(e.pageY);
                    if (
                        $(thisVerticalObject.el)
                        .parent()
                        .height() -
                        changeDistance <
                        20
                    ) {} else {
                        $(thisVerticalObject.el)
                            .parent()
                            .height(
                                $(thisVerticalObject.el)
                                .parent()
                                .height() - changeDistance
                            );
                        $(thisVerticalObject.el)
                            .parent()
                            .next()
                            .height(
                                $(thisVerticalObject.el)
                                .parent()
                                .next()
                                .height() + changeDistance
                            );
                        thisVerticalObject.clickY = e.pageY;
                        $(thisVerticalObject.el).offset({ top: e.pageY });
                    }
                } else {
                    //鼠标向下移动
                    changeDistance = Number(e.pageY) - Number(thisVerticalObject.clickY);
                    if (
                        $(thisVerticalObject.el)
                        .parent()
                        .next()
                        .height() -
                        changeDistance <
                        20
                    ) {} else {
                        $(thisVerticalObject.el)
                            .parent()
                            .height(
                                $(thisVerticalObject.el)
                                .parent()
                                .height() + changeDistance
                            );
                        $(thisVerticalObject.el)
                            .parent()
                            .next()
                            .height(
                                $(thisVerticalObject.el)
                                .parent()
                                .next()
                                .height() - changeDistance
                            );
                        thisVerticalObject.clickY = e.pageY;
                        $(thisVerticalObject.el).offset({ top: e.pageY });
                    }
                }
                $(thisVerticalObject.el).height(2);
            }
        }
        // 改变父的 高度
        if (thisArrowObject != null) {
            //鼠标竖向拖动
            if (thisArrowObject.verticalDragging) {
                var changeDistance = 0;
                if (thisArrowObject.clickY >= e.pageY) {
                    //鼠标向上移动
                    changeDistance = Number(thisArrowObject.clickY) - Number(e.pageY);
                    if (
                        $(thisArrowObject.el)
                        .parent()
                        .height() -
                        changeDistance <
                        50
                    ) {} else {
                        $(thisArrowObject.el)
                            .parent()
                            .height(
                                $(thisArrowObject.el)
                                .parent()
                                .height() - changeDistance
                            );
                        thisArrowObject.clickY = e.pageY;
                        $(thisArrowObject.el).offset({ bottom: e.pageY });
                    }
                } else {
                    //鼠标向下移动
                    changeDistance = Number(e.pageY) - Number(thisArrowObject.clickY);
                    $(thisArrowObject.el)
                        .parent()
                        .height(
                            $(thisArrowObject.el)
                            .parent()
                            .height() + changeDistance
                        );
                    thisArrowObject.clickY = e.pageY;
                    $(thisArrowObject.el).offset({ bottom: e.pageY });
                }
                $(thisArrowObject.el).height(10);
            }
        }
    };

    $(doc).mouseup(function(e) {
        setHeight("setHeight");
        setWidth("setWidth");
        // 鼠标弹起时设置不能拖动
        if (thisTransverseObject != null) {
            thisTransverseObject.transverseDragging = false;
            thisTransverseObject = null;
        }
        if (thisVerticalObject != null) {
            thisVerticalObject.verticalDragging = false;
            thisVerticalObject = null;
        }
        if (thisArrowObject != null) {
            thisArrowObject.verticalDragging = false;
            thisArrowObject = null;
        }

        e.cancelBubble = true;
    });
});
```

# 4. 完整代码与效果

效果图：

![split.gif](https://upload-images.jianshu.io/upload_images/12890819-6a8ad52065c229c4.gif?imageMogr2/auto-orient/strip)

项目地址：[https://github.com/biaochenxuying/split](https://github.com/biaochenxuying/split)
效果体验地址：[ https://biaochenxuying.github.io/split/index.html](https://biaochenxuying.github.io/split/index.html)

初始代码是从网上来的，不过网上的并不完整，父 div 的高也不能改变，并且孩子的宽高并不是百分比的，布局也并不合理，所以修改成这样子。

# 5. 最后 

![](https://upload-images.jianshu.io/upload_images/12890819-f8665293cc8d0dcf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 微信公众号：**BiaoChenXuYing**
> 分享 前端、后端开发等相关的技术文章，热点资源，随想随感，全栈程序员的成长之路。

关注公众号并回复 **福利** 便免费送你视频资源，绝对干货。

福利详情请点击：  [免费资源分享--Python、Java、Linux、Go、node、vue、react、javaScript](https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&mid=2247483711&idx=1&sn=1ffb576159805e92fc57f5f1120fce3a&chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&token=1560489745&lang=zh_CN#rd)

![BiaoChenXuYing](https://upload-images.jianshu.io/upload_images/12890819-091ccce387e2ea34.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


