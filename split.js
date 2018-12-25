/**
 * name:   monitorSplitWindows.js
 * route:   /static/js/control/ui
 * author:  luozhubang
 * date:    2016-10-26
 * function: 监听窗口拖动事件，依赖于/static/js/control/ui/DynamicWindow.js,
 *
 */
$(function() {
    //鼠标横向、竖向操作对象
    var thisTransverseObject, thisVerticalObject, thisParentObject;
    //文档对象
    var doc = document;
    //横向分割栏
    var transverseLabels = $(".hj-wrap").find(".hj-transverse-split-label");
    //竖向分割栏
    var verticalLabels = $(".hj-wrap").find(".hj-vertical-split-label");
    var parentDrag = $(".hj-wrap").find(".arrow");
    // var length = $(".hj-wrap").length;
    // if (length > 0) {
    //     for (var i = 0; i < length; i++) {
    //         //console.log($($(".hj-wrap")[i]));
    //         var width = $($(".hj-wrap")[i])[0].offsetWidth;
    //         // console.log("width :", width);
    //         // console.log("width :", $($(".hj-wrap")[i]));
    //         var hjDivNums = $($(".hj-wrap")[i]).children(".hj-transverse-split-div");
    //         // var defaultWidth = Math.floor(100 / hjDivNums.length);
    //         var defaultWidth = Math.floor(width / hjDivNums.length);
    //         $($(".hj-wrap")[i])
    //             .children(".hj-transverse-split-div")
    //             .width(defaultWidth + "px");
    //         // .width(defaultWidth + "%");
    //     }
    // }

    function setWidth(type){
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
        }else{
            // var transverseParentDivs = $(".hj-transverse-split-div")
            var transverseDivs = $(".hj-transverse-split-div")
            var widthLength = transverseDivs.length
            for (var i = 0; i < widthLength; i++) {
                // console.log($(verticalsDivs[i]));
                var width = $(transverseDivs[i]).width();
                var parentWidth = $(transverseDivs[i])
                    .parent()
                    .width();
                var rate = (width / parentWidth) * 100 + "%";
                $(transverseDivs[i]).css({ width: rate });
            }
        } 
    }
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
                // console.log("parentHeight :", parentHeight);
            }
        } else {
            var verticalsDivs = $(".hj-vertical-split-div");
          var heightLength = verticalsDivs.length;
          for (var i = 0; i < heightLength; i++) {
            // console.log($(verticalsDivs[i]));
            var height = $(verticalsDivs[i]).height();
            var parentHeight = $(verticalsDivs[i])
              .parent()
              .height();
              console.log("height", height);
            console.log("parentHeight", parentHeight);
            var rate = (height / parentHeight) * 100 + "%";
            $(verticalsDivs[i]).css({ height: rate });
          }
            // var verticalsDivs = $(".verticals").children(".hj-vertical-split-div");
            // var lengths = verticalsDivs.length;
            // for (var i = 0; i < lengths; i++) {
            //     // console.log($(verticalsDivs[i]));
            //     var height = $(verticalsDivs[i]).height();
            //     var parentHeight = $(verticalsDivs[i])
            //         .parent()
            //         .height();
            //         console.log('height',height)
            //         console.log('parentHeight',parentHeight)
            //     var rate = (height / parentHeight) * 100 + "%";
            //     $(verticalsDivs[i]).css({ height: rate });
            //     // console.log("height :", height);
            //     // console.log("parentHeight :", parentHeight);
            //     // console.log("rate :", rate);
            //     // console.log("$(verticalsDivs[i]) :", $(verticalsDivs[i]));
            //     // console.log("$(verticalsDivs[i]).parent() :", $(verticalsDivs[i]).parent());
            //     // console.log("width :", width);
            // }
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
    //竖向分隔栏绑定事件
    parentDrag.bind("mousedown", function(e) {
        //console.log("mousedown");
        thisParentObject = new PointerObject();
        thisParentObject.transverseDragging = true; //鼠标可横向拖动
        thisParentObject.verticalDragging = true; //鼠标可竖向拖动
        thisParentObject.el = this;
        thisParentObject.clickY = e.pageY; //记录鼠标竖向初始位置
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
                        // console.log("e.pageX", e.pageX);
                        // $(thisTransverseObject.el).offset({ left: e.pageX });
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
                        // console.log("e.pageX", e.pageX);
                        // $(thisTransverseObject.el).offset({ left: e.pageX });
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
                        // console.log("e.pageX", e.pageY);
                        // $(thisVerticalObject.el).offset({ top: e.pageY });
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
                        // console.log("e.pageX", e.pageY);
                        // $(thisVerticalObject.el).offset({ top: e.pageY });
                    }
                }
                $(thisVerticalObject.el).height(2);
            }
        }
        //鼠标竖向拖动
        if (thisParentObject != null) {
            if (thisParentObject.verticalDragging) {
                var changeDistance = 0;
                if (thisParentObject.clickY >= e.pageY) {
                    //鼠标向上移动
                    changeDistance = Number(thisParentObject.clickY) - Number(e.pageY);
                    // console.log("向上移动 changeDistance", changeDistance);
                    if (
                        $(thisParentObject.el)
                        .parent()
                        .height() -
                        changeDistance <
                        50
                    ) {} else {
                        $(thisParentObject.el)
                            .parent()
                            .height(
                                $(thisParentObject.el)
                                .parent()
                                .height() - changeDistance
                            );
                        thisParentObject.clickY = e.pageY;
                        $(thisParentObject.el).offset({ bottom: e.pageY });
                    }
                } else {
                    //鼠标向下移动
                    changeDistance = Number(e.pageY) - Number(thisParentObject.clickY);

                    // if (
                    //     $(thisParentObject.el)
                    //     .parent()
                    //     .height() -
                    //     changeDistance <
                    //     40
                    // ) {} else {
                    // console.log("向下移动 changeDistance", changeDistance);
                    $(thisParentObject.el)
                        .parent()
                        .height(
                            $(thisParentObject.el)
                            .parent()
                            .height() + changeDistance
                        );
                    thisParentObject.clickY = e.pageY;
                    $(thisParentObject.el).offset({ bottom: e.pageY });
                    // }
                }
                $(thisParentObject.el).height(10);
            }
            // if (thisParentObject.transverseDragging) {
            //     var changeDistance = 0;
            //     if (thisParentObject.clickX >= e.pageX) {
            //         //鼠标向左移动
            //         changeDistance = Number(thisParentObject.clickX) - Number(e.pageX);
            //         if (
            //             $(thisParentObject.el)
            //             .parent()
            //             .width() -
            //             changeDistance <
            //             20
            //         ) {} else {
            //             $(thisParentObject.el)
            //                 .parent()
            //                 .width(
            //                     $(thisParentObject.el)
            //                     .prev()
            //                     .width() - changeDistance
            //                 );
            //             $(thisParentObject.el)
            //                 .parent()
            //                 .width(
            //                     $(thisParentObject.el)
            //                     .parent()
            //                     .width() + changeDistance
            //                 );
            //             thisParentObject.clickX = e.pageX;
            //             $(thisParentObject.el).offset({ left: e.pageX - 4 });
            //         }
            //     } else {
            //         //鼠标向右移动
            //         changeDistance = Number(e.pageX) - Number(thisParentObject.clickX);
            //         if (
            //             $(thisParentObject.el)
            //             .parent()
            //             .width() -
            //             changeDistance <
            //             20
            //         ) {} else {
            //             $(thisParentObject.el)
            //                 .parent()
            //                 .width(
            //                     $(thisParentObject.el)
            //                     .parent()
            //                     .width() + changeDistance
            //                 );
            //             $(thisParentObject.el)
            //                 .parent()
            //                 .width(
            //                     $(thisParentObject.el)
            //                     .parent()
            //                     .width() - changeDistance
            //                 );
            //             thisParentObject.clickX = e.pageX;
            //             $(thisParentObject.el).offset({ left: e.pageX - 4 });
            //         }
            //     }
            //     $(thisParentObject.el).width(10);
            // }
        }
    };

    $(doc).mouseup(function(e) {
        setHeight("setHeight");
        setWidth("setWidth");
        if (thisTransverseObject != null) {
            thisTransverseObject.transverseDragging = false;
            thisTransverseObject = null;
        }
        if (thisVerticalObject != null) {
            thisVerticalObject.verticalDragging = false;
            thisVerticalObject = null;
        }
        if (thisParentObject != null) {
            thisParentObject.verticalDragging = false;
            thisParentObject = null;
        }

        e.cancelBubble = true;
    });
});