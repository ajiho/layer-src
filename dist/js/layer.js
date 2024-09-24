/*!
 * layer-src v1.0.0 (undefined)
 * Copyright 2023-2024 
 * license MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.layer = factory(global.jQuery));
})(this, (function ($$1) { 'use strict';

  // 缓存常用字符
  const doms = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
  doms.html = $$1("html");

  // 动画类
  doms.anim = {
    0: "layer-anim-00",
    1: "layer-anim-01",
    2: "layer-anim-02",
    3: "layer-anim-03",
    4: "layer-anim-04",
    5: "layer-anim-05",
    6: "layer-anim-06",
    slideDown: "layer-anim-slide-down",
    slideLeft: "layer-anim-slide-left",
    slideUp: "layer-anim-slide-up",
    slideRight: "layer-anim-slide-right"
  };
  const win = $$1(window);

  // 一些常量
  const CONSTANTS = {
    SHADE_KEY: "LAYUI-LAYER-SHADE-KEY",
    RECORD_HEIGHT_KEY: "LAYUI_LAYER_CONTENT_RECORD_HEIGHT"
  };

  // 助手类+一些成员变量设置
  const ready = {
    config: {
      removeFocus: true
    },
    end: {},
    beforeEnd: {},
    events: {
      resize: {}
    },
    minStackIndex: 0,
    minStackArr: [],
    btn: ["确定", "取消"],
    // 五种原始层模式
    type: ["dialog", "page", "iframe", "loading", "tips"]
  };

  function detectIE() {
    let agent = navigator.userAgent.toLowerCase();
    return !!window.ActiveXObject || "ActiveXObject" in window ? (agent.match(/msie\s(\d+)/) || [])[1] || "11" : false;
  }
  var Util = {
    detectIE,
    // 获取节点的 style 属性值
    getStyle: function (node, name) {
      let style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
      return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](name);
    },
    // for ie6 恢复 select
    reselect: function () {
      $.each($("select"), function (index, value) {
        let sthis = $(this);
        if (!sthis.parents("." + doms[0])[0]) {
          sthis.attr("layer") == 1 && $("." + doms[0]).length < 1 && sthis.removeAttr("layer").show();
        }
        sthis = null;
      });
    },
    // 记录宽高坐标，用于还原
    record: function (layero) {
      if (!layero[0]) return window.console && console.error("index error");
      let type = layero.attr("type");
      let contentElem = layero.find(".layui-layer-content");
      let contentRecordHeightElem = type === ready.type[2] ? contentElem.children("iframe") : contentElem;
      let area = [layero[0].style.width || ready.getStyle(layero[0], "width"), layero[0].style.height || ready.getStyle(layero[0], "height"), layero.position().top, layero.position().left + parseFloat(layero.css("margin-left"))];
      layero.find(".layui-layer-max").addClass("layui-layer-maxmin");
      layero.attr({
        area: area
      });
      contentElem.data(CONSTANTS.RECORD_HEIGHT_KEY, this.getStyle(contentRecordHeightElem[0], "height"));
    },
    // 设置页面滚动条
    setScrollbar: function (index) {
      doms.html.css("overflow", "hidden").attr("layer-full", index);
    },
    // 恢复页面滚动条
    restScrollbar: function (index) {
      if (doms.html.attr("layer-full") == index) {
        doms.html[0].style[doms.html[0].style.removeProperty ? "removeProperty" : "removeAttribute"]("overflow");
        doms.html.removeAttr("layer-full");
      }
    },
    // 类似 Promise.resolve
    promiseLikeResolve: function (value) {
      let deferred = $.Deferred();
      if (value && typeof value.then === "function") {
        value.then(deferred.resolve, deferred.reject);
      } else {
        deferred.resolve(value);
      }
      return deferred.promise();
    },
    skin: function (type, cache) {
      return cache.skin ? " " + cache.skin + " " + cache.skin + "-" + type : "";
    }
  };

  const Class = function (setings) {
    console.log(setings);
    let that = this,
      creat = function () {
        that.creat();
      };
    that.index = ++layer.index;
    that.config.maxWidth = $(win).width() - 15 * 2; // 初始最大宽度：当前屏幕宽，左右留 15px 边距
    that.config = $.extend({}, that.config, ready.config, setings);
    document.body ? creat() : setTimeout(function () {
      creat();
    }, 30);
  };
  Class.pt = Class.prototype;

  // 默认配置
  Class.pt.config = {
    type: 0,
    shade: 0.3,
    fixed: true,
    move: doms[1],
    title: "信息",
    offset: "auto",
    area: "auto",
    closeBtn: 1,
    icon: -1,
    time: 0,
    // 0 表示不自动关闭
    zIndex: 19891014,
    maxWidth: 360,
    anim: 0,
    isOutAnim: true,
    // 退出动画
    minStack: true,
    // 最小化堆叠
    moveType: 1,
    resize: true,
    scrollbar: true,
    // 是否允许浏览器滚动条
    tips: 2
  };

  // 容器
  Class.pt.vessel = function (conType, callback) {
    let that = this,
      times = that.index,
      config = that.config;
    let zIndex = config.zIndex + times,
      titype = typeof config.title === "object";
    let ismax = config.maxmin && (config.type === 1 || config.type === 2);
    let titleHTML = config.title ? '<div class="layui-layer-title" style="' + (titype ? config.title[1] : "") + '">' + (titype ? config.title[0] : config.title) + "</div>" : "";
    config.zIndex = zIndex;
    callback([
    // 遮罩
    config.shade ? '<div class="' + doms.SHADE + '" id="' + doms.SHADE + times + '" times="' + times + '" style="' + ("z-index:" + (zIndex - 1) + "; ") + '"></div>' : "",
    // 主体
    '<div class="' + doms[0] + (" layui-layer-" + ready.type[config.type]) + ((config.type == 0 || config.type == 2) && !config.shade ? " layui-layer-border" : "") + " " + (config.skin || "") + '" id="' + doms[0] + times + '" type="' + ready.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? "object" : "string") + '" style="z-index: ' + zIndex + "; width:" + config.area[0] + ";height:" + config.area[1] + ";position:" + (config.fixed ? "fixed;" : "absolute;") + '">' + (conType && config.type != 2 ? "" : titleHTML) +
    // 内容区
    "<div" + (config.id ? ' id="' + config.id + '"' : "") + ' class="layui-layer-content' + (config.type == 0 && config.icon !== -1 ? " layui-layer-padding" : "") + (config.type == 3 ? " layui-layer-loading" + config.icon : "") + '">' +
    // 表情或图标
    function () {
      let face = ["layui-icon-tips", "layui-icon-success", "layui-icon-error", "layui-icon-question", "layui-icon-lock", "layui-icon-face-cry", "layui-icon-face-smile"];
      let additFaceClass;

      // 动画类
      let animClass = "layui-anim layui-anim-rotate layui-anim-loop";

      // 信息框表情
      if (config.type == 0 && config.icon !== -1) {
        // 加载（加载图标）
        if (config.icon == 16) {
          additFaceClass = "layui-icon layui-icon-loading " + animClass;
        }
        return '<i class="layui-layer-face layui-icon ' + (additFaceClass || face[config.icon] || face[0]) + '"></i>';
      }

      // 加载层图标
      if (config.type == 3) {
        let type = ["layui-icon-loading", "layui-icon-loading-1"];
        // 风格 2
        if (config.icon == 2) {
          return '<div class="layui-layer-loading-2 ' + animClass + '"></div>';
        }
        return '<i class="layui-layer-loading-icon layui-icon ' + (type[config.icon] || type[0]) + " " + animClass + '"></i>';
      }
      return "";
    }() + (config.type == 1 && conType ? "" : config.content || "") + "</div>" +
    // 右上角按钮
    '<div class="layui-layer-setwin">' + function () {
      let arr = [];

      // 最小化、最大化
      if (ismax) {
        arr.push('<span class="layui-layer-min"></span>');
        arr.push('<span class="layui-layer-max"></span>');
      }

      // 关闭按钮
      if (config.closeBtn) {
        arr.push('<span class="layui-icon layui-icon-close ' + [doms[7], doms[7] + (config.title ? config.closeBtn : config.type == 4 ? "1" : "2")].join(" ") + '"></span>');
      }
      return arr.join("");
    }() + "</div>" + (
    // 底部按钮
    config.btn ? function () {
      let button = "";
      typeof config.btn === "string" && (config.btn = [config.btn]);
      for (let i = 0, len = config.btn.length; i < len; i++) {
        button += '<a class="' + doms[6] + "" + i + '">' + config.btn[i] + "</a>";
      }
      return '<div class="' + function () {
        let className = [doms[6]];
        if (config.btnAlign) className.push(doms[6] + "-" + config.btnAlign);
        return className.join(" ");
      }() + '">' + button + "</div>";
    }() : "") + (config.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], titleHTML, $('<div class="' + doms.MOVE + '" id="' + doms.MOVE + '"></div>'));
    return that;
  };

  // 创建骨架
  Class.pt.creat = function () {
    let that = this;
    let config = that.config;
    let times = that.index;
    let content = config.content;
    let conType = typeof content === "object";
    let body = $("body");
    console.log("走到creat方法");
    let setAnim = function (layero) {
      console.log("qq");

      // anim 兼容旧版 shift
      if (config.shift) {
        config.anim = config.shift;
      }

      // 为兼容 jQuery3.0 的 css 动画影响元素尺寸计算
      if (doms.anim[config.anim]) {
        let animClass = "layer-anim " + doms.anim[config.anim];
        layero.addClass(animClass).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
          $(this).removeClass(animClass);
        });
      }
    };

    // 若 id 对应的弹层已经存在，则不重新创建
    if (config.id && $("." + doms[0]).find("#" + config.id)[0]) {
      return function () {
        let layero = $("#" + config.id).closest("." + doms[0]);
        let index = layero.attr("times");
        let options = layero.data("config");
        let elemShade = $("#" + doms.SHADE + index);
        let maxminStatus = layero.data("maxminStatus") || {};
        // 若弹层为最小化状态，则点击目标元素时，自动还原
        if (maxminStatus === "min") {
          layer.restore(index);
        } else if (options.hideOnClose) {
          elemShade.show();
          layero.show();
          console.log("qqxx");
          setAnim(layero);
          setTimeout(function () {
            elemShade.css({
              opacity: elemShade.data(CONSTANTS.SHADE_KEY)
            });
          }, 10);
        }
      }();
    }

    // 是否移除活动元素的焦点
    if (config.removeFocus && document.activeElement) {
      document.activeElement.blur(); // 将原始的聚焦节点失焦
    }

    // 初始化 area 属性
    if (typeof config.area === "string") {
      config.area = config.area === "auto" ? ["", ""] : [config.area, ""];
    }
    if (layer.ie == 6) {
      config.fixed = false;
    }
    switch (config.type) {
      case 0:
        config.btn = "btn" in config ? config.btn : ready.btn[0];
        layer.closeAll("dialog");
        break;
      case 2:
        config.content = conType ? config.content : [config.content || "", "auto"];
        config.content = '<iframe scrolling="' + (config.content[1] || "auto") + '" allowtransparency="true" id="' + doms[4] + "" + times + '" name="' + doms[4] + "" + times + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
        break;
      case 3:
        delete config.title;
        delete config.closeBtn;
        config.icon === -1 && config.icon === 0;
        layer.closeAll("loading");
        break;
      case 4:
        conType || (config.content = [config.content, "body"]);
        config.follow = config.content[1];
        config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
        delete config.title;
        config.tips = typeof config.tips === "object" ? config.tips : [config.tips, true];
        config.tipsMore || layer.closeAll("tips");
        break;
    }

    // 建立容器
    that.vessel(conType, function (html, titleHTML, moveElem) {
      body.append(html[0]);
      conType ? function () {
        config.type == 2 || config.type == 4 ? function () {
          $("body").append(html[1]);
        }() : function () {
          if (!content.parents("." + doms[0])[0]) {
            content.data("display", content.css("display")).show().addClass("layui-layer-wrap").wrap(html[1]);
            $("#" + doms[0] + times).find("." + doms[5]).before(titleHTML);
          }
        }();
      }() : body.append(html[1]);
      $("#" + doms.MOVE)[0] || body.append(ready.moveElem = moveElem);
      that.layero = $("#" + doms[0] + times);
      that.shadeo = $("#" + doms.SHADE + times);
      config.scrollbar || Util.setScrollbar(times);
    }).auto(times);

    // 遮罩
    that.shadeo.css({
      "background-color": config.shade[1] || "#000",
      opacity: config.shade[0] || config.shade,
      transition: config.shade[2] || ""
    });
    that.shadeo.data(CONSTANTS.SHADE_KEY, config.shade[0] || config.shade);
    config.type == 2 && layer.ie == 6 && that.layero.find("iframe").attr("src", content[0]);
    console.log(config.type);
    if (config.type == 4) {
      //tips层，调用tips的方法
      that.tips();
    } else {
      // 坐标自适应浏览器窗口尺寸
      that.offset();
      const zIndex = parseInt(Util.getStyle(document.getElementById(doms.MOVE), "z-index"));
      if (!zIndex) {
        that.layero.css("visibility", "hidden").offset().css("visibility", "visible");
      }
    }

    // 若是固定定位，则跟随 resize 事件来自适应坐标
    if (config.fixed) {
      if (!ready.events.resize[that.index]) {
        ready.events.resize[that.index] = function () {
          that.resize();
        };
        // 此处 resize 事件不会一直叠加，当关闭弹层时会移除该事件
        win.on("resize", ready.events.resize[that.index]);
      }
    }
    config.time <= 0 || setTimeout(function () {
      layer.close(that.index);
    }, config.time);
    that.move().callback();
    console.log("fff");
    setAnim(that.layero);

    // 记录配置信息
    that.layero.data("config", config);
  };

  // 当前实例的 resize 事件
  Class.pt.resize = function () {
    let that = this;
    let config = that.config;
    that.offset();
    (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(that.index);
    config.type == 4 && that.tips();
  };

  // 自适应
  Class.pt.auto = function (index) {
    let that = this,
      config = that.config,
      layero = $("#" + doms[0] + index);
    if (config.area[0] === "" && config.maxWidth > 0) {
      // 适配 ie7
      if (layer.ie && layer.ie < 8 && config.btn) {
        layero.width(layero.innerWidth());
      }
      layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
    }
    let area = [layero.innerWidth(), layero.innerHeight()];
    let titHeight = layero.find(doms[1]).outerHeight() || 0;
    let btnHeight = layero.find("." + doms[6]).outerHeight() || 0;
    let setHeight = function (elem) {
      elem = layero.find(elem);
      elem.height(area[1] - titHeight - btnHeight - 2 * (parseFloat(elem.css("padding-top")) | 0));
    };
    switch (config.type) {
      case 2:
        setHeight("iframe");
        break;
      default:
        if (config.area[1] === "") {
          if (config.maxHeight > 0 && layero.outerHeight() > config.maxHeight) {
            area[1] = config.maxHeight;
            setHeight("." + doms[5]);
          } else if (config.fixed && area[1] >= win.height()) {
            area[1] = win.height();
            setHeight("." + doms[5]);
          }
        } else {
          setHeight("." + doms[5]);
        }
        break;
    }
    return that;
  };

  // 计算坐标
  Class.pt.offset = function () {
    let that = this,
      config = that.config,
      layero = that.layero;
    let area = [layero.outerWidth(), layero.outerHeight()];
    let type = typeof config.offset === "object";
    that.offsetTop = (win.height() - area[1]) / 2;
    that.offsetLeft = (win.width() - area[0]) / 2;
    if (type) {
      that.offsetTop = config.offset[0];
      that.offsetLeft = config.offset[1] || that.offsetLeft;
    } else if (config.offset !== "auto") {
      if (config.offset === "t") {
        // 上
        that.offsetTop = 0;
      } else if (config.offset === "r") {
        // 右
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === "b") {
        // 下
        that.offsetTop = win.height() - area[1];
      } else if (config.offset === "l") {
        // 左
        that.offsetLeft = 0;
      } else if (config.offset === "lt") {
        // 左上
        that.offsetTop = 0;
        that.offsetLeft = 0;
      } else if (config.offset === "lb") {
        // 左下
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = 0;
      } else if (config.offset === "rt") {
        // 右上
        that.offsetTop = 0;
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === "rb") {
        // 右下
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = win.width() - area[0];
      } else {
        that.offsetTop = config.offset;
      }
    }
    if (!config.fixed) {
      that.offsetTop = /%$/.test(that.offsetTop) ? win.height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
      that.offsetLeft = /%$/.test(that.offsetLeft) ? win.width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
      that.offsetTop += win.scrollTop();
      that.offsetLeft += win.scrollLeft();
    }

    // 最小化窗口时的自适应
    if (layero.data("maxminStatus") === "min") {
      that.offsetTop = win.height() - (layero.find(doms[1]).outerHeight() || 0);
      that.offsetLeft = layero.css("left");
    }

    // 设置坐标
    layero.css({
      top: that.offsetTop,
      left: that.offsetLeft
    });
  };

  // Tips
  Class.pt.tips = function () {
    let that = this,
      config = that.config,
      layero = that.layero;
    let layArea = [layero.outerWidth(), layero.outerHeight()],
      follow = $(config.follow);
    if (!follow[0]) follow = $("body");
    let goal = {
        width: follow.outerWidth(),
        height: follow.outerHeight(),
        top: follow.offset().top,
        left: follow.offset().left
      },
      tipsG = layero.find(".layui-layer-TipsG");
    let guide = config.tips[0];
    config.tips[1] || tipsG.remove();
    goal.autoLeft = function () {
      if (goal.left + layArea[0] - win.width() > 0) {
        goal.tipLeft = goal.left + goal.width - layArea[0];
        tipsG.css({
          right: 12,
          left: "auto"
        });
      } else {
        goal.tipLeft = goal.left;
      }
    };

    // 辨别 tips 的方位
    // 21 为箭头大小 8*2 + 箭头相对父元素的top偏移 5
    goal.where = [function () {
      // 上
      goal.autoLeft();
      goal.tipTop = goal.top - layArea[1] - 10;
      tipsG.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", config.tips[1]);
    }, function () {
      // 右
      goal.tipLeft = goal.left + goal.width + 10;
      goal.tipTop = goal.top - (goal.height * 0.75 < 21 ? 21 - goal.height * 0.5 : 0);
      goal.tipTop = Math.max(goal.tipTop, 0);
      tipsG.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", config.tips[1]);
    }, function () {
      // 下
      goal.autoLeft();
      goal.tipTop = goal.top + goal.height + 10;
      tipsG.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", config.tips[1]);
    }, function () {
      // 左
      goal.tipLeft = goal.left - layArea[0] - 10;
      goal.tipTop = goal.top - (goal.height * 0.75 < 21 ? 21 - goal.height * 0.5 : 0);
      goal.tipTop = Math.max(goal.tipTop, 0);
      tipsG.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", config.tips[1]);
    }];
    goal.where[guide - 1]();

    /* 8*2为小三角形占据的空间 */
    if (guide === 1) {
      goal.top - (win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
    } else if (guide === 2) {
      win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal.where[3]();
    } else if (guide === 3) {
      goal.top - win.scrollTop() + goal.height + layArea[1] + 8 * 2 - win.height() > 0 && goal.where[0]();
    } else if (guide === 4) {
      layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]();
    }
    layero.find("." + doms[5]).css({
      "background-color": config.tips[1],
      "padding-right": config.closeBtn ? "30px" : ""
    });
    layero.css({
      left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0),
      top: goal.tipTop - (config.fixed ? win.scrollTop() : 0)
    });
  };

  // 拖拽层
  Class.pt.move = function () {
    let that = this;
    let config = that.config;
    let _DOC = $(document);
    let layero = that.layero;
    let DATA_NAME = ["LAY_MOVE_DICT", "LAY_RESIZE_DICT"];
    let moveElem = layero.find(config.move);
    let resizeElem = layero.find(".layui-layer-resize");

    // 给指定元素添加拖动光标
    if (config.move) moveElem.css("cursor", "move");

    // 按下拖动元素
    moveElem.on("mousedown", function (e) {
      if (e.button) {
        return;
      } // 不是左键不处理
      let othis = $(this);
      let dict = {};
      if (config.move) {
        dict.layero = layero;
        dict.config = config;
        dict.offset = [e.clientX - parseFloat(layero.css("left")), e.clientY - parseFloat(layero.css("top"))];
        othis.data(DATA_NAME[0], dict);
        ready.eventMoveElem = othis;
        ready.moveElem.css("cursor", "move").show();
      }
      e.preventDefault();
    });

    // 按下右下角拉伸
    resizeElem.on("mousedown", function (e) {
      let othis = $(this);
      let dict = {};
      if (config.resize) {
        dict.layero = layero;
        dict.config = config;
        dict.offset = [e.clientX, e.clientY];
        dict.index = that.index;
        dict.area = [layero.outerWidth(), layero.outerHeight()];
        othis.data(DATA_NAME[1], dict);
        ready.eventResizeElem = othis;
        ready.moveElem.css("cursor", "se-resize").show();
      }
      e.preventDefault();
    });

    // 拖动元素，避免多次调用实例造成事件叠加
    if (ready.docEvent) return that;
    _DOC.on("mousemove", function (e) {
      // 拖拽移动
      if (ready.eventMoveElem) {
        let dict = ready.eventMoveElem.data(DATA_NAME[0]) || {},
          layero = dict.layero,
          config = dict.config;
        let X = e.clientX - dict.offset[0];
        let Y = e.clientY - dict.offset[1];
        let fixed = layero.css("position") === "fixed";
        e.preventDefault();
        dict.stX = fixed ? 0 : win.scrollLeft();
        dict.stY = fixed ? 0 : win.scrollTop();

        // 控制元素不被拖出窗口外
        if (!config.moveOut) {
          let setRig = win.width() - layero.outerWidth() + dict.stX;
          let setBot = win.height() - layero.outerHeight() + dict.stY;
          X < dict.stX && (X = dict.stX);
          X > setRig && (X = setRig);
          Y < dict.stY && (Y = dict.stY);
          Y > setBot && (Y = setBot);
        }

        // 拖动时跟随鼠标位置
        layero.css({
          left: X,
          top: Y
        });
      }

      // Resize
      if (ready.eventResizeElem) {
        let dict = ready.eventResizeElem.data(DATA_NAME[1]) || {};
        let config = dict.config;
        let X = e.clientX - dict.offset[0];
        let Y = e.clientY - dict.offset[1];
        e.preventDefault();

        // 拉伸宽高
        layer.style(dict.index, {
          width: dict.area[0] + X,
          height: dict.area[1] + Y
        });
        config.resizing && config.resizing(dict.layero);
      }
    }).on("mouseup", function (e) {
      if (ready.eventMoveElem) {
        let dict = ready.eventMoveElem.data(DATA_NAME[0]) || {};
        let config = dict.config;
        ready.eventMoveElem.removeData(DATA_NAME[0]);
        delete ready.eventMoveElem;
        ready.moveElem.hide();
        config.moveEnd && config.moveEnd(dict.layero);
      }
      if (ready.eventResizeElem) {
        ready.eventResizeElem.removeData(DATA_NAME[1]);
        delete ready.eventResizeElem;
        ready.moveElem.hide();
      }
    });
    ready.docEvent = true; // 已给 document 执行全局事件
    return that;
  };
  Class.pt.btnLoading = function (btnElem, isLoading) {
    if (isLoading) {
      let loadingTpl = '<i class="layui-layer-btn-loading-icon layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';
      if (btnElem.find(".layui-layer-btn-loading-icon")[0]) return;
      btnElem.addClass("layui-layer-btn-is-loading").attr({
        disabled: ""
      }).prepend(loadingTpl);
    } else {
      btnElem.removeClass("layui-layer-btn-is-loading").removeAttr("disabled").find(".layui-layer-btn-loading-icon").remove();
    }
  };
  Class.pt.callback = function () {
    let that = this,
      layero = that.layero,
      config = that.config;
    that.openLayer();
    if (config.success) {
      if (config.type == 2) {
        layero.find("iframe").on("load", function () {
          config.success(layero, that.index, that);
        });
      } else {
        config.success(layero, that.index, that);
      }
    }
    layer.ie == 6 && that.IE6(layero);

    // 按钮
    layero.find("." + doms[6]).children("a").on("click", function () {
      let btnElem = $(this);
      let index = btnElem.index();
      if (btnElem.attr("disabled")) return;

      // 若为异步按钮
      if (config.btnAsync) {
        let btnCallback = index === 0 ? config.yes || config["btn1"] : config["btn" + (index + 1)];
        that.loading = function (isLoading) {
          that.btnLoading(btnElem, isLoading);
        };
        if (btnCallback) {
          Util.promiseLikeResolve(btnCallback.call(config, that.index, layero, that)).then(function (result) {
            if (result !== false) {
              layer.close(that.index);
            }
          }, function (reason) {
            reason !== undefined && window.console && window.console.error("layer error hint: " + reason);
          });
        } else {
          layer.close(that.index);
        }
      } else {
        // 普通按钮
        if (index === 0) {
          if (config.yes) {
            config.yes(that.index, layero, that);
          } else if (config["btn1"]) {
            config["btn1"](that.index, layero, that);
          } else {
            layer.close(that.index);
          }
        } else {
          let close = config["btn" + (index + 1)] && config["btn" + (index + 1)](that.index, layero, that);
          close === false || layer.close(that.index);
        }
      }
    });

    // 取消
    function cancel() {
      let close = config.cancel && config.cancel(that.index, layero, that);
      close === false || layer.close(that.index);
    }

    // 右上角关闭回调
    layero.find("." + doms[7]).on("click", cancel);

    // 点遮罩关闭
    if (config.shadeClose) {
      that.shadeo.on("click", function () {
        layer.close(that.index);
      });
    }

    // 最小化
    layero.find(".layui-layer-min").on("click", function () {
      let min = config.min && config.min(layero, that.index, that);
      min === false || layer.min(that.index, config);
    });

    // 全屏/还原
    layero.find(".layui-layer-max").on("click", function () {
      if ($(this).hasClass("layui-layer-maxmin")) {
        layer.restore(that.index);
        config.restore && config.restore(layero, that.index, that);
      } else {
        layer.full(that.index, config);
        setTimeout(function () {
          config.full && config.full(layero, that.index, that);
        }, 100);
      }
    });
    config.end && (ready.end[that.index] = config.end);
    config.beforeEnd && (ready.beforeEnd[that.index] = $.proxy(config.beforeEnd, config, layero, that.index, that));
  };
  Class.pt.IE6 = function (layero) {
    // 隐藏select
    $("select").each(function (index, value) {
      let sthis = $(this);
      if (!sthis.parents("." + doms[0])[0]) {
        sthis.css("display") === "none" || sthis.attr({
          layer: "1"
        }).hide();
      }
      sthis = null;
    });
  };

  // 需依赖原型的对外方法
  Class.pt.openLayer = function () {
    let that = this;

    // 置顶当前窗口
    layer.zIndex = that.config.zIndex;
    layer.setTop = function (layero) {
      let setZindex = function () {
        layer.zIndex++;
        layero.css("z-index", layer.zIndex + 1);
      };
      layer.zIndex = parseInt(layero[0].style.zIndex);
      layero.on("mousedown", setZindex);
      return layer.zIndex;
    };
  };

  doms.SHADE = "layui-layer-shade";
  doms.MOVE = "layui-layer-move";

  // 默认内置方法。
  var layer$1 = {
    v: "3.7.0",
    //判断ie
    ie: detectIE(),
    // 索引层
    index: 0,
    // 路径
    path: null,
    // 设置全局默认配置
    config(options, fn) {
      options = options || {};

      // 把传递进来的参数和默认配置ready.config里面的参数合并后赋值给ready.config和this.cache
      this.cache = ready.config = $$1.extend({}, ready.config, options);
      // console.log(this.cache,ready.config);

      // 从默认参数ready.config里取path如果没有就取layer对象上的path属性赋值给this.path
      this.path = ready.config.path || this.path;

      // console.log(this.path, ready.config.path);

      // console.log(options.extend);

      typeof options.extend === "string" && (options.extend = [options.extend]);

      // 如果设置了路径，则加载样式,这里不需要这样
      // if (ready.config.path) this.ready();

      if (!options.extend) return this; //如果选项不存在extend属性，就直接return

      // 加载 css
      // isLayui
      //   ? layui.addcss("modules/layer/" + options.extend)
      //   : ready.link("css/" + options.extend);

      return this;
    },
    // 核心方法
    open(options) {
      return new Class(options).index;
    },
    // 各种快捷引用
    alert(content, options, yes) {
      let type = typeof options === "function";
      if (type) yes = options;
      return this.open($$1.extend({
        content: content,
        yes: yes
      }, type ? {} : options));
    },
    confirm(content, options, yes, cancel) {
      let type = typeof options === "function";
      if (type) {
        cancel = yes;
        yes = options;
      }
      return this.open($$1.extend({
        content: content,
        btn: ready.btn,
        yes: yes,
        btn2: cancel
      }, type ? {} : options));
    },
    msg(content, options, end) {
      // 最常用提示层
      let type = typeof options === "function",
        rskin = ready.config.skin;
      let skin = (rskin ? rskin + " " + rskin + "-msg" : "") || "layui-layer-msg";
      let anim = doms.anim.length - 1;
      if (type) end = options;
      return this.open($$1.extend({
        content: content,
        time: 3000,
        shade: false,
        skin: skin,
        title: false,
        closeBtn: false,
        btn: false,
        resize: false,
        end: end,
        removeFocus: false
      }, type && !ready.config.skin ? {
        skin: skin + " layui-layer-hui",
        anim: anim
      } : function () {
        options = options || {};
        if (options.icon === -1 || options.icon === undefined && !ready.config.skin) {
          options.skin = skin + " " + (options.skin || "layui-layer-hui");
        }
        return options;
      }()));
    },
    load(icon, options) {
      return this.open($$1.extend({
        type: 3,
        icon: icon || 0,
        resize: false,
        shade: 0.01,
        removeFocus: false
      }, options));
    },
    tips(content, follow, options) {
      return this.open($$1.extend({
        type: 4,
        content: [content, follow],
        closeBtn: false,
        time: 3000,
        shade: false,
        resize: false,
        fixed: false,
        maxWidth: 260,
        removeFocus: false
      }, options));
    },
    // 获取子 iframe 的 DOM
    getChildFrame(selector, index) {
      index = index || $$1("." + doms[4]).attr("times");
      return $$1("#" + doms[0] + index).find("iframe").contents().find(selector);
    },
    // 得到当前 iframe 层的索引，子 iframe 时使用
    getFrameIndex(name) {
      return $$1("#" + name).parents("." + doms[4]).attr("times");
    },
    // iframe 层自适应宽高
    iframeAuto(index) {
      if (!index) return;
      let heg = this.getChildFrame("html", index).outerHeight();
      let layero = $$1("#" + doms[0] + index);
      let titHeight = layero.find(doms[1]).outerHeight() || 0;
      let btnHeight = layero.find("." + doms[6]).outerHeight() || 0;
      layero.css({
        height: heg + titHeight + btnHeight
      });
      layero.find("iframe").css({
        height: heg
      });
    },
    // 重置 iframe url
    iframeSrc(index, url) {
      $$1("#" + doms[0] + index).find("iframe").attr("src", url);
    },
    // 设定层的样式
    style(index, options, limit) {
      let layero = $$1("#" + doms[0] + index);
      let contentElem = layero.find(".layui-layer-content");
      let type = layero.attr("type");
      let titHeight = layero.find(doms[1]).outerHeight() || 0;
      let btnHeight = layero.find("." + doms[6]).outerHeight() || 0;
      layero.attr("minLeft");

      // loading 和 tips 层不允许更改
      if (type === ready.type[3] || type === ready.type[4]) {
        return;
      }
      if (!limit) {
        if (parseFloat(options.width) <= 260) {
          options.width = 260;
        }
        if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
          options.height = 64 + titHeight + btnHeight;
        }
      }
      layero.css(options);
      btnHeight = layero.find("." + doms[6]).outerHeight() || 0;
      if (type === ready.type[2]) {
        layero.find("iframe").css({
          height: (typeof options.height === "number" ? options.height : layero.height()) - titHeight - btnHeight
        });
      } else {
        contentElem.css({
          height: (typeof options.height === "number" ? options.height : layero.height()) - titHeight - btnHeight - parseFloat(contentElem.css("padding-top")) - parseFloat(contentElem.css("padding-bottom"))
        });
      }
    },
    // 最小化
    min(index, options) {
      let layero = $$1("#" + doms[0] + index);
      let maxminStatus = layero.data("maxminStatus");
      if (maxminStatus === "min") return; // 当前的状态是否已经是最小化
      if (maxminStatus === "max") this.restore(index); // 若当前为最大化，则先还原后再最小化

      layero.data("maxminStatus", "min");
      options = options || layero.data("config") || {};
      let shadeo = $$1("#" + doms.SHADE + index);
      let elemMin = layero.find(".layui-layer-min");
      let titHeight = layero.find(doms[1]).outerHeight() || 0;
      let minLeft = layero.attr("minLeft"); // 最小化时的横坐标
      let hasMinLeft = typeof minLeft === "string"; // 是否已经赋值过最小化坐标
      let left = hasMinLeft ? minLeft : 181 * ready.minStackIndex + "px";
      let position = layero.css("position");
      let minWidth = 180; // 最小化时的宽度
      let settings = {
        width: minWidth,
        height: titHeight,
        position: "fixed",
        overflow: "hidden"
      };
      Util.record(layero); // 记录当前尺寸、坐标，用于还原

      // 简易最小化补位
      if (ready.minStackArr.length > 0) {
        left = ready.minStackArr[0];
        ready.minStackArr.shift();
      }

      // left 是否超出边界
      if (parseFloat(left) + minWidth > win.width()) {
        left = win.width() - minWidth - function () {
          ready.minStackArr.edgeIndex = ready.minStackArr.edgeIndex || 0;
          return ready.minStackArr.edgeIndex += 3;
        }();
        if (left < 0) left = 0;
      }

      // 是否堆叠在左下角
      if (options.minStack) {
        settings.left = left;
        settings.top = win.height() - titHeight;
        hasMinLeft || ready.minStackIndex++; // 若未赋值过最小化坐标，则最小化操作索引自增
        layero.attr("minLeft", left);
      }
      layero.attr("position", position);
      this.style(index, settings, true);
      elemMin.hide();
      layero.attr("type") === "page" && layero.find(doms[4]).hide();
      Util.restScrollbar(index);

      // 隐藏遮罩
      shadeo.hide();
    },
    // 还原
    restore(index) {
      let layero = $$1("#" + doms[0] + index);
      let shadeo = $$1("#" + doms.SHADE + index);
      let contentElem = layero.find(".layui-layer-content");
      let area = layero.attr("area").split(",");
      let type = layero.attr("type");
      let options = layero.data("config") || {};
      let contentRecordHeight = contentElem.data(CONSTANTS.RECORD_HEIGHT_KEY);
      layero.removeData("maxminStatus"); // 移除最大最小状态

      // 恢复原来尺寸
      this.style(index, {
        width: area[0],
        // 数值或百分比
        height: area[1],
        top: parseFloat(area[2]),
        left: parseFloat(area[3]),
        position: layero.attr("position"),
        overflow: "visible"
      }, true);
      layero.find(".layui-layer-max").removeClass("layui-layer-maxmin");
      layero.find(".layui-layer-min").show();
      type === "page" && layero.find(doms[4]).show();

      // 恢复页面滚动条弹层打开时的状态
      options.scrollbar ? Util.restScrollbar(index) : Util.setScrollbar(index);

      // #1604
      if (contentRecordHeight !== undefined) {
        contentElem.removeData(CONSTANTS.RECORD_HEIGHT_KEY);
        let contentRecordHeightElem = type === ready.type[2] ? contentElem.children("iframe") : contentElem;
        contentRecordHeightElem.css({
          height: contentRecordHeight
        });
      }

      // 恢复遮罩
      shadeo.show();
      // ready.events.resize[index](); // ?
    },
    // 全屏（最大化）
    full(index) {
      let layero = $$1("#" + doms[0] + index);
      let maxminStatus = layero.data("maxminStatus");
      if (maxminStatus === "max") return; // 检查当前的状态是否已经是最大化
      if (maxminStatus === "min") this.restore(index); // 若当前为最小化，则先还原后再最大化

      layero.data("maxminStatus", "max");
      Util.record(layero); // 记录当前尺寸、坐标

      if (!doms.html.attr("layer-full")) {
        Util.setScrollbar(index);
      }
      setTimeout(function () {
        let isfix = layero.css("position") === "fixed";
        this.style(index, {
          top: isfix ? 0 : win.scrollTop(),
          left: isfix ? 0 : win.scrollLeft(),
          width: "100%",
          height: "100%"
        }, true);
        layero.find(".layui-layer-min").hide();
      }, 100);
    },
    // 改变 title
    title(name, index) {
      let title = $$1("#" + doms[0] + (index || this.index)).find(doms[1]);
      title.html(name);
    },
    // 关闭 layer 总方法
    close(index, callback) {
      let layero = function () {
        let closest = $$1("." + doms[0]).children("#" + index).closest("." + doms[0]);
        return closest[0] ? (index = closest.attr("times"), closest) : $$1("#" + doms[0] + index);
      }();
      let type = layero.attr("type");
      let options = layero.data("config") || {};
      let hideOnClose = options.id && options.hideOnClose; // 是否关闭时移除弹层容器

      if (!layero[0]) return;
      let executor = () => {
        // 关闭动画
        let closeAnim = {
          slideDown: "layer-anim-slide-down-out",
          slideLeft: "layer-anim-slide-left-out",
          slideUp: "layer-anim-slide-up-out",
          slideRight: "layer-anim-slide-right-out"
        }[options.anim] || "layer-anim-close";

        // 移除主容器
        let remove = () => {
          let WRAP = "layui-layer-wrap";

          // 是否关闭时隐藏弹层容器
          if (hideOnClose) {
            layero.removeClass("layer-anim " + closeAnim);
            return layero.hide();
          }

          // 是否为页面捕获层
          if (type === ready.type[1] && layero.attr("conType") === "object") {
            layero.children(":not(." + doms[5] + ")").remove();
            let wrap = layero.find("." + WRAP);
            for (let i = 0; i < 2; i++) {
              wrap.unwrap();
            }
            wrap.css("display", wrap.data("display")).removeClass(WRAP);
          } else {
            // 低版本 IE 回收 iframe
            if (type === ready.type[2]) {
              try {
                let iframe = $$1("#" + doms[4] + index)[0];
                iframe.contentWindow.document.write("");
                iframe.contentWindow.close();
                layero.find("." + doms[5])[0].removeChild(iframe);
              } catch (e) {}
            }
            layero[0].innerHTML = "";
            layero.remove();
          }
          typeof ready.end[index] === "function" && ready.end[index]();
          delete ready.end[index];
          typeof callback === "function" && callback();

          // 移除 reisze 事件
          if (ready.events.resize[index]) {
            win.off("resize", ready.events.resize[index]);
            delete ready.events.resize[index];
          }
        };
        // 移除遮罩
        let shadeo = $$1("#" + doms.SHADE + index);
        if (this.ie && this.ie < 10 || !options.isOutAnim) {
          shadeo[hideOnClose ? "hide" : "remove"]();
        } else {
          shadeo.css({
            opacity: 0
          });
          setTimeout(function () {
            shadeo[hideOnClose ? "hide" : "remove"]();
          }, 350);
        }

        // 是否允许关闭动画
        if (options.isOutAnim) {
          layero.addClass("layer-anim " + closeAnim);
        }
        this.ie == 6 && Util.reselect();
        Util.restScrollbar(index);

        // 记住被关闭层的最小化堆叠坐标
        if (typeof layero.attr("minLeft") === "string") {
          ready.minStackIndex--;
          ready.minStackArr.push(layero.attr("minLeft"));
        }
        if (this.ie && this.ie < 10 || !options.isOutAnim) {
          remove();
        } else {
          setTimeout(function () {
            remove();
          }, 200);
        }
      };
      if (!hideOnClose && typeof ready.beforeEnd[index] === "function") {
        Util.promiseLikeResolve(ready.beforeEnd[index]()).then(function (result) {
          if (result !== false) {
            delete ready.beforeEnd[index];
            executor();
          }
        }, function (reason) {
          reason !== undefined && window.console && window.console.error("layer error hint: " + reason);
        });
      } else {
        delete ready.beforeEnd[index];
        executor();
      }
    },
    // 关闭所有层
    closeAll(type, callback) {
      if (typeof type === "function") {
        callback = type;
        type = null;
      }
      let domsElem = $$1("." + doms[0]);
      $$1.each(domsElem, function (_index) {
        let othis = $$1(this);
        let is = type ? othis.attr("type") === type : 1;
        is && this.close(othis.attr("times"), _index === domsElem.length - 1 ? callback : null);
        is = null;
      });
      if (domsElem.length === 0) typeof callback === "function" && callback();
    },
    // 根据弹层类型关闭最近打开的层
    closeLast(type, callback) {
      let layerIndexList = [];
      let isArrayType = $$1.isArray(type);
      $$1(typeof type === "string" ? ".layui-layer-" + type : ".layui-layer").each(function (i, el) {
        let layero = $$1(el);
        let shouldSkip = isArrayType && type.indexOf(layero.attr("type")) === -1 || layero.css("display") === "none";
        if (shouldSkip) return true;
        layerIndexList.push(Number(layero.attr("times")));
      });
      if (layerIndexList.length > 0) {
        let layerIndexMax = Math.max.apply(null, layerIndexList);
        this.close(layerIndexMax, callback);
      }
    },
    // 仿系统 prompt
    prompt(options, yes) {
      let style = "",
        placeholder = "";
      options = options || {};
      if (typeof options === "function") yes = options;
      if (options.area) {
        let area = options.area;
        style = 'style="width: ' + area[0] + "; height: " + area[1] + ';"';
        delete options.area;
      }
      if (options.placeholder) {
        placeholder = ' placeholder="' + options.placeholder + '"';
      }
      let prompt,
        content = options.formType == 2 ? '<textarea class="layui-layer-input"' + style + placeholder + "></textarea>" : function () {
          return '<input type="' + (options.formType == 1 ? "password" : "text") + '" class="layui-layer-input"' + placeholder + ">";
        }();
      let success = options.success;
      delete options.success;
      return this.open($$1.extend({
        type: 1,
        btn: ["确定", "取消"],
        content: content,
        skin: "layui-layer-prompt" + Util.skin("prompt", this.cache),
        maxWidth: win.width(),
        success(layero) {
          prompt = layero.find(".layui-layer-input");
          prompt.val(options.value || "").focus();
          typeof success === "function" && success(layero);
        },
        resize: false,
        yes(index) {
          let value = prompt.val();
          if (value.length > (options.maxlength || 500)) {
            this.tips("最多输入" + (options.maxlength || 500) + "个字符", prompt, {
              tips: 1
            });
          } else {
            yes && yes(value, index, prompt);
          }
        }
      }, options));
    },
    // tab 层
    tab(options) {
      options = options || {};
      let tab = options.tab || {};
      let THIS = "layui-this";
      let success = options.success;
      delete options.success;
      return this.open($$1.extend({
        type: 1,
        skin: "layui-layer-tab" + Util.skin("tab", this.cache),
        resize: false,
        title: function () {
          let len = tab.length,
            ii = 1,
            str = "";
          if (len > 0) {
            str = '<span class="' + THIS + '">' + tab[0].title + "</span>";
            for (; ii < len; ii++) {
              str += "<span>" + tab[ii].title + "</span>";
            }
          }
          return str;
        }(),
        content: '<ul class="layui-layer-tabmain">' + function () {
          let len = tab.length,
            ii = 1,
            str = "";
          if (len > 0) {
            str = '<li class="layui-layer-tabli ' + THIS + '">' + (tab[0].content || "no content") + "</li>";
            for (; ii < len; ii++) {
              str += '<li class="layui-layer-tabli">' + (tab[ii].content || "no  content") + "</li>";
            }
          }
          return str;
        }() + "</ul>",
        success(layero) {
          let btn = layero.find(".layui-layer-title").children();
          let main = layero.find(".layui-layer-tabmain").children();
          btn.on("mousedown", function (e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            let othis = $$1(this),
              index = othis.index();
            othis.addClass(THIS).siblings().removeClass(THIS);
            main.eq(index).show().siblings().hide();
            typeof options.change === "function" && options.change(index);
          });
          typeof success === "function" && success(layero);
        }
      }, options));
    },
    // 图片层
    photos(options, loop, key) {
      let dict = {};

      // 默认属性
      options = $$1.extend(true, {
        toolbar: true,
        footer: true
      }, options);
      if (!options.photos) return;

      // 若 photos 并非选择器或 jQuery 对象，则为普通 object
      let isObject = !(typeof options.photos === "string" || options.photos instanceof $$1);
      let photos = isObject ? options.photos : {};
      let data = photos.data || [];
      let start = photos.start || 0;
      let success = options.success;
      dict.imgIndex = (start | 0) + 1;
      options.img = options.img || "img";
      delete options.success;

      // 若 options.photos 不是一个对象
      if (!isObject) {
        // 页面直接获取
        let parent = $$1(options.photos),
          pushData = function () {
            data = [];
            parent.find(options.img).each(function (index) {
              let othis = $$1(this);
              othis.attr("layer-index", index);
              data.push({
                alt: othis.attr("alt"),
                pid: othis.attr("layer-pid"),
                src: othis.attr("lay-src") || othis.attr("layer-src") || othis.attr("src"),
                thumb: othis.attr("src")
              });
            });
          };
        pushData();
        if (data.length === 0) return;
        loop || parent.on("click", options.img, function () {
          pushData();
          let othis = $$1(this),
            index = othis.attr("layer-index");
          this.photos($$1.extend(options, {
            photos: {
              start: index,
              data: data,
              tab: options.tab
            },
            full: options.full
          }), true);
        });

        // 不直接弹出
        if (!loop) return;
      } else if (data.length === 0) {
        return this.msg("没有图片");
      }

      // 上一张
      dict.imgprev = function (key) {
        dict.imgIndex--;
        if (dict.imgIndex < 1) {
          dict.imgIndex = data.length;
        }
        dict.tabimg(key);
      };

      // 下一张
      dict.imgnext = function (key, errorMsg) {
        dict.imgIndex++;
        if (dict.imgIndex > data.length) {
          dict.imgIndex = 1;
          if (errorMsg) {
            return;
          }
        }
        dict.tabimg(key);
      };

      // 方向键
      dict.keyup = function (event) {
        if (!dict.end) {
          let code = event.keyCode;
          event.preventDefault();
          if (code === 37) {
            dict.imgprev(true);
          } else if (code === 39) {
            dict.imgnext(true);
          } else if (code === 27) {
            this.close(dict.index);
          }
        }
      };

      // 切换
      dict.tabimg = function (key) {
        if (data.length <= 1) return;
        photos.start = dict.imgIndex - 1;
        this.close(dict.index);
        return this.photos(options, true, key);
      };
      dict.isNumber = function (n) {
        return typeof n === "number" && !isNaN(n);
      };
      dict.image = {};
      dict.getTransform = function (opts) {
        let transforms = [];
        let rotate = opts.rotate;
        let scaleX = opts.scaleX;
        let scale = opts.scale;
        if (dict.isNumber(rotate) && rotate !== 0) {
          transforms.push("rotate(" + rotate + "deg)");
        }
        if (dict.isNumber(scaleX) && scaleX !== 1) {
          transforms.push("scaleX(" + scaleX + ")");
        }
        if (dict.isNumber(scale)) {
          transforms.push("scale(" + scale + ")");
        }
        return transforms.length ? transforms.join(" ") : "none";
      };

      // 一些动作
      dict.event = function (layero, index, that) {
        // 上一张
        dict.main.find(".layui-layer-photos-prev").on("click", function (event) {
          event.preventDefault();
          dict.imgprev(true);
        });

        // 下一张
        dict.main.find(".layui-layer-photos-next").on("click", function (event) {
          event.preventDefault();
          dict.imgnext(true);
        });
        $$1(document).on("keyup", dict.keyup);

        // 头部工具栏事件
        layero.off("click").on("click", "*[toolbar-event]", function () {
          let othis = $$1(this);
          let event = othis.attr("toolbar-event");
          switch (event) {
            case "rotate":
              dict.image.rotate = ((dict.image.rotate || 0) + Number(othis.attr("data-option"))) % 360;
              dict.imgElem.css({
                transform: dict.getTransform(dict.image)
              });
              break;
            case "scalex":
              dict.image.scaleX = dict.image.scaleX === -1 ? 1 : -1;
              dict.imgElem.css({
                transform: dict.getTransform(dict.image)
              });
              break;
            case "zoom":
              let ratio = Number(othis.attr("data-option"));
              dict.image.scale = (dict.image.scale || 1) + ratio;
              // 缩小状态最小值
              if (ratio < 0 && dict.image.scale < 0 - ratio) {
                dict.image.scale = 0 - ratio;
              }
              dict.imgElem.css({
                transform: dict.getTransform(dict.image)
              });
              break;
            case "reset":
              dict.image.scaleX = 1;
              dict.image.scale = 1;
              dict.image.rotate = 0;
              dict.imgElem.css({
                transform: "none"
              });
              break;
            case "close":
              this.close(index);
              break;
          }
          that.offset();
          that.auto(index);
        });

        // 鼠标滚轮缩放图片事件
        dict.main.on("mousewheel DOMMouseScroll", function (e) {
          let delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
          let zoomElem = dict.main.find('[toolbar-event="zoom"]');
          if (delta > 0) {
            zoomElem.eq(0).trigger("click");
          } else {
            zoomElem.eq(1).trigger("click");
          }
          e.preventDefault();
        });
      };

      // 图片预加载
      function loadImage(url, callback, error) {
        let img = new Image();
        img.src = url;
        if (img.complete) {
          return callback(img);
        }
        img.onload = function () {
          img.onload = null;
          callback(img);
        };
        img.onerror = function (e) {
          img.onerror = null;
          error(e);
        };
      }
      dict.loadi = this.load(1, {
        shade: "shade" in options ? false : [0.9, undefined, "unset"],
        scrollbar: false
      });
      loadImage(data[start].src, function (img) {
        this.close(dict.loadi);
        let alt = data[start].alt || "";

        // 切换图片时不出现动画
        if (key) options.anim = -1;

        // 弹出图片层
        dict.index = this.open($$1.extend({
          type: 1,
          id: "layui-layer-photos",
          area: function () {
            let imgarea = [img.width, img.height];
            let winarea = [$$1(window).width() - 100, $$1(window).height() - 100];

            // 若实际图片的宽或者高比 屏幕大（那么进行缩放）
            if (!options.full && (imgarea[0] > winarea[0] || imgarea[1] > winarea[1])) {
              let wh = [imgarea[0] / winarea[0], imgarea[1] / winarea[1]]; // 取宽度缩放比例、高度缩放比例
              if (wh[0] > wh[1]) {
                // 取缩放比例最大的进行缩放
                imgarea[0] = imgarea[0] / wh[0];
                imgarea[1] = imgarea[1] / wh[0];
              } else if (wh[0] < wh[1]) {
                imgarea[0] = imgarea[0] / wh[1];
                imgarea[1] = imgarea[1] / wh[1];
              }
            }
            return [imgarea[0] + "px", imgarea[1] + "px"];
          }(),
          title: false,
          shade: [0.9, undefined, "unset"],
          shadeClose: true,
          closeBtn: false,
          move: ".layer-layer-photos-main img",
          moveType: 1,
          scrollbar: false,
          moveOut: true,
          anim: 5,
          isOutAnim: false,
          skin: "layui-layer-photos" + Util.skin("photos", this.cache),
          content: '<div class="layer-layer-photos-main">' + '<img src="' + data[start].src + '" alt="' + alt + '" layer-pid="' + (data[start].pid || "") + '">' + function () {
            let arr = ['<div class="layui-layer-photos-pointer">'];

            // 左右箭头翻页
            if (data.length > 1) {
              arr.push(['<div class="layer-layer-photos-page">', '<span class="layui-icon layui-icon-left layui-layer-photos-prev"></span>', '<span class="layui-icon layui-icon-right layui-layer-photos-next"></span>', "</div>"].join(""));
            }

            // 头部工具栏
            if (options.toolbar) {
              arr.push(['<div class="layui-layer-photos-toolbar layui-layer-photos-header">', '<span toolbar-event="rotate" data-option="90" title="旋转"><i class="layui-icon layui-icon-refresh"></i></span>', '<span toolbar-event="scalex" title="变换"><i class="layui-icon layui-icon-slider"></i></span>', '<span toolbar-event="zoom" data-option="0.1" title="放大"><i class="layui-icon layui-icon-add-circle"></i></span>', '<span toolbar-event="zoom" data-option="-0.1" title="缩小"><i class="layui-icon layui-icon-reduce-circle"></i></span>', '<span toolbar-event="reset" title="还原"><i class="layui-icon layui-icon-refresh-1"></i></span>', '<span toolbar-event="close" title="关闭"><i class="layui-icon layui-icon-close"></i></span>', "</div>"].join(""));
            }

            // 底部栏
            if (options.footer) {
              arr.push(['<div class="layui-layer-photos-toolbar layui-layer-photos-footer">', "<h3>" + alt + "</h3>", "<em>" + dict.imgIndex + " / " + data.length + "</em>", '<a href="' + data[start].src + '" target="_blank">查看原图</a>', "</div>"].join(""));
            }
            arr.push("</div>");
            return arr.join("");
          }() + "</div>",
          success(layero, index, that) {
            dict.main = layero.find(".layer-layer-photos-main");
            dict.footer = layero.find(".layui-layer-photos-footer");
            dict.imgElem = dict.main.children("img");
            dict.event(layero, index, that);
            options.tab && options.tab(data[start], layero);
            typeof success === "function" && success(layero);
          },
          end() {
            dict.end = true;
            $$1(document).off("keyup", dict.keyup);
          }
        }, options));
      }, function () {
        this.close(dict.loadi);
        this.msg("当前图片地址异常，<br>是否继续查看下一张？", {
          time: 30000,
          btn: ["下一张", "不看了"],
          yes() {
            data.length > 1 && dict.imgnext(true, true);
          }
        });
      });
    }
  };

  return layer$1;

}));
//# sourceMappingURL=layer.js.map
