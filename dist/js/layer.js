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

  var Classes = {
    // 表情
    faceTips: "layui-icon-tips",
    faceSuccess: "layui-icon-success",
    faceError: "layui-icon-error",
    faceQuestion: "layui-icon-question",
    faceLock: "layui-icon-lock",
    faceCry: "layui-icon-face-cry",
    faceSmile: "layui-icon-face-smile",
    layuiLayer: "layui-layer",
    // 标题
    layerTitle: "layui-layer-title",
    layerMain: "layui-layer-main",
    layerIFrame: "layui-layer-iframe",
    layerContent: "layui-layer-content",
    layerBtn: "layui-layer-btn",
    layerClose: "layui-layer-close",
    //动画
    layerAnim: "layer-anim",
    layerAnim0: "layer-anim-00",
    layerAnim1: "layer-anim-01",
    layerAnim2: "layer-anim-02",
    layerAnim3: "layer-anim-03",
    layerAnim4: "layer-anim-04",
    layerAnim5: "layer-anim-05",
    layerAnim6: "layer-anim-06",
    animSlideDown: "layer-anim-slide-down",
    animSlideLeft: "layer-anim-slide-left",
    animSlideUp: "layer-anim-slide-up",
    animSlideRight: "layer-anim-slide-right",
    // 退出动画
    animSlideDownOut: "layer-anim-slide-down-out",
    animSlideLeftOut: "layer-anim-slide-left-out",
    animSlideUpOut: "layer-anim-slide-up-out",
    animSlideRightOut: "layer-anim-slide-right-out",
    // 关闭动画
    animClose: "layer-anim-close",
    shade: "layui-layer-shade",
    move: "layui-layer-move",
    layerWrap: "layui-layer-wrap",
    // 边框
    layerBorder: "layui-layer-border",
    // 边距
    layerPadding: "layui-layer-padding",
    layerLoading: "layui-layer-loading",
    // layui的动画类
    layuiAnim: "layui-anim",
    layuiAnimRotate: "layui-anim-rotate",
    layuiAnimLoop: "layui-anim-loop",
    layerTipsG: "layui-layer-TipsG",
    layerTipsB: "layui-layer-TipsB",
    layerTipsT: "layui-layer-TipsT",
    layerTipsL: "layui-layer-TipsL",
    layerTipsR: "layui-layer-TipsR",
    //调整尺寸的类
    layerResize: "layui-layer-resize",
    // 加载图标
    iconLoading: "layui-icon-loading",
    iconLoading1: "layui-icon-loading-1",
    iconLoading2: "layui-icon-loading-2",
    layerMin: "layui-layer-min",
    layerMax: "layui-layer-max",
    layerMaxMin: "layui-layer-maxmin"
  };

  var DataKey = {
    SHADE_KEY: "LAYUI-LAYER-SHADE-KEY",
    RECORD_HEIGHT_KEY: "LAYUI_LAYER_CONTENT_RECORD_HEIGHT",
    // 状态
    MAX_MIN_STATUS: "maxminStatus"
  };

  // 一些默认参数
  var Defaults = {
    /*  0 dialog 信息框（默认），同时只能存在一个层
      1 page 页面层，可同时存在多个层
      2 iframe 内联框架层，可同时存在多个层
      3 loading 加载层，同时只能存在一个层
      4 tips 贴士层，可配置同时存在多个层 */
    type: 0,
    // 弹层的遮罩。 支持以下写法 number|array 0:不显示遮罩层
    shade: 0.3,
    // 弹层是否固定定位，即始终显示在页面可视区域
    fixed: true,
    // 绑定弹层的拖拽元素。 默认为触发弹层的标题栏进行拖拽。也可以设置 move: false 禁止拖拽
    move: `.${Classes.layerTitle}`,
    //string、array、boolean，如果是false，则不显示标题栏
    title: "信息",
    // 弹层内容 字符串 jq对象 数组
    // content: null,
    // 弹层的偏移坐标
    offset: "auto",
    // 设置弹层的宽高  array string  area: '520px' 宽度固定，高度自适应  area: 'auto' 宽度和高度均自适应
    area: "auto",
    // 是否开启标题栏的关闭图标，或设置关闭图标风格
    closeBtn: 1,
    // 提示图标。 信息框和加载层的私有参数
    icon: -1,
    // 弹层自动关闭所需的毫秒数 0 表示不自动关闭
    time: 0,
    // 弹层的初始层叠顺序值
    zIndex: 19891014,
    // number 弹层的最大宽度。当 area 属性值为默认的 auto' 时有效
    maxWidth: 360,
    // number 弹层的最大高度。当 area 属设置高度自适应时有效
    // maxHeight: null,
    // 弹层的出场动画
    anim: 0,
    // 是否开启弹层关闭时的动画。
    isOutAnim: true,
    // 最小化堆叠
    minStack: true,
    //
    moveType: 1,
    // 是否允许拖拽弹层右下角拉伸尺寸。 该属性对加载层和 tips 层无效。
    resize: true,
    // 打开弹层时，是否允许浏览器出现滚动条。
    scrollbar: true,
    // 设置 tips 层的吸附位置和背景色，tips 层的私有属性
    tips: 2
    // 关闭弹层时，是否将弹层设置为隐藏状态（而非移除），当再次打开，直接显示原来的弹层。 若设为 true，则必须同时设置 id 属性方可有效。
    // hideOnClose: false,
    // 是否允许同时存在多个 tips 层，即不销毁上一个 tips。
    // tipsMore: false,
  };

  var Html = {
    iframe: `<iframe scrolling="%s" allowtransparency="true" id="%s" name="%s" onload="this.className='';" class="layui-layer-load" frameborder="0" src="%s"></iframe>`,
    // 遮罩层
    shade: `<div class="%s" id="%s" times="%s" style="z-index: %s;"></div>`,
    // 主体包裹层
    mainWrap: [`<div class="%s %s %s %s" 
    id="%s" 
    type="%s" 
    times="%s" 
    showtime="%s" 
    contype="%s" 
    style="z-index:%s;width:%s;height:%s;position:%s;">`, "</div>"],
    // title区域
    title: `<div class="layui-layer-title" style="%s">%s</div>`,
    // 内容区
    content: [`<div id="%s" class="layui-layer-content %s %s">`, `</div>`],
    //
    tipsG: `<i class="layui-layer-TipsG"></i>`,
    // 表情图标
    faceIcon: `<i class="layui-layer-face layui-icon %s"></i>`,
    // 信息框加载图标
    dialogLoadIcon: `<i class="layui-layer-face layui-icon layui-icon-loading %s"></i>`,
    // 加载图标
    loadIcon: `<i class="layui-layer-loading-icon layui-icon %s %s"></i>`,
    // 右上角按钮
    setWin: [`<div class="layui-layer-setwin">`, `</div>`],
    //最小化按钮
    minBtn: `<span class="layui-layer-min"></span>`,
    maxBtn: `<span class="layui-layer-max"></span>`,
    // 关闭按钮
    closeBtn: `<span class="layui-icon layui-icon-close %s %s"></span>`,
    // 底部按钮区域
    btnWrap: [`<div class="layui-layer-btn %s">`, `</div>`],
    // 底部单个按钮
    btn: `<a class="layui-layer-btn%s">%s</a>`,
    // 可拖动的元素
    resize: `<span class="layui-layer-resize"></span>`,
    // 拖拽元素
    move: `<div class="%s" id="%s"></div>`
  };

  /**
   * 一些不会变的表映射数据集合
   */

  // 弹出层类型
  const TYPE = {
    DIALOG: 0,
    PAGE: 1,
    IFRAME: 2,
    LOADING: 3,
    TIPS: 4
  };

  // 弹出层对应的名称
  const TYPE_NAME = {
    [TYPE.DIALOG]: "dialog",
    [TYPE.PAGE]: "page",
    [TYPE.IFRAME]: "iframe",
    [TYPE.LOADING]: "loading",
    [TYPE.TIPS]: "tips"
  };

  // 表情
  const FACE = {
    TIPS: 0,
    SUCCESS: 1,
    ERROR: 2,
    QUESTION: 3,
    LOCK: 4,
    CRY: 5,
    SMILE: 6,
    LOADING: 16,
    NONE: -1
  };

  // load层的图标
  const LOADING_ICON = {
    BALL_SPIN: 0,
    BALL_CLIP_ROTATE_GRAY: 1,
    BALL_CLIP_ROTATE_BLUE: 2
  };

  // 提示层的方位
  const TIPS_DIRECTION = {
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFT: 4
  };
  var MAP = {
    TYPE,
    TYPE_NAME,
    FACE,
    LOADING_ICON,
    TIPS_DIRECTION,
    FACE
  };

  const VERSION = "0.0.1";
  var Constants = {
    CLASSES: Classes,
    DATAKEY: DataKey,
    DEFAULTS: Defaults,
    HTML: Html,
    VERSION,
    MAP: MAP
  };

  var Util = {
    getLayeroByIndex(index) {
      return $$1(`#${Constants.CLASSES.layuiLayer}${index}`);
    },
    getShadeoByIndex(index) {
      return $$1(`#${Constants.CLASSES.shade}${index}`);
    },
    // 获取节点的 style 属性值
    getStyle(node, name) {
      let style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
      return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](name);
    },
    // for ie6 恢复 select
    reselect() {
      $$1.each($$1("select"), function (index, value) {
        let sthis = $$1(this);
        if (!sthis.parents(`.${Constants.CLASSES.layuiLayer}`)[0]) {
          sthis.attr("layer") == 1 && $$1(`.${Constants.CLASSES.layuiLayer}`).length < 1 && sthis.removeAttr("layer").show();
        }
        sthis = null;
      });
    },
    // 记录宽高坐标，用于还原
    record(layero) {
      if (!layero[0]) return window.console && console.error("index error");
      let type = layero.attr("type");
      let contentElem = layero.find(".layui-layer-content");
      let contentRecordHeightElem = type === MAP.TYPE_NAME[MAP.TYPE.IFRAME] ? contentElem.children("iframe") : contentElem;
      let area = [layero[0].style.width || this.getStyle(layero[0], "width"), layero[0].style.height || this.getStyle(layero[0], "height"), layero.position().top, layero.position().left + parseFloat(layero.css("margin-left"))];
      layero.find(".layui-layer-max").addClass("layui-layer-maxmin");
      layero.attr({
        area: area
      });
      contentElem.data(Constants.DATAKEY.RECORD_HEIGHT_KEY, this.getStyle(contentRecordHeightElem[0], "height"));
    },
    // 设置页面滚动条
    setScrollbar(index) {
      $$1("html").css("overflow", "hidden").attr("layer-full", index);
    },
    // 恢复页面滚动条
    restScrollbar: function (index) {
      const $html = $$1("html");
      if ($html.attr("layer-full") == index) {
        $html[0].style[$html[0].style.removeProperty ? "removeProperty" : "removeAttribute"]("overflow");
        $html.removeAttr("layer-full");
      }
    },
    // 类似 Promise.resolve
    promiseLikeResolve(value) {
      let deferred = $$1.Deferred();
      if (value && typeof value.then === "function") {
        value.then(deferred.resolve, deferred.reject);
      } else {
        deferred.resolve(value);
      }
      return deferred.promise();
    },
    skin(type, config) {
      const {
        skin
      } = config;

      // 如果有定义 skin，则返回带有皮肤类名的字符串
      if (skin) {
        const skinClass = `${skin} ${skin}-${type}`;
        return ` ${skinClass}`;
      }

      // 否则返回空字符串
      return "";
    },
    sprintf(_str, ...args) {
      let flag = true;
      let i = 0;
      const str = _str.replace(/%s/g, () => {
        const arg = args[i++];
        if (typeof arg === "undefined") {
          flag = false;
          return "";
        }
        return arg;
      });
      return flag ? str : "";
    }
  };

  const shared = {
    // 最新弹出层的层叠顺序
    zIndex: 0,
    // 最新弹出层的索引
    index: 0,
    // 配置,该配置项的作用是可以通过layer.config(options)方法来设置全局的默认配置
    config: {
      //是否移除弹层触发元素的焦点，避免按回车键时重复弹出
      removeFocus: true
    },
    end: {},
    beforeEnd: {},
    events: {
      resize: {}
    },
    minStackIndex: 0,
    minStackArr: [],
    btn: ["确定", "取消"]
  };

  const Store = {
    // 最新弹出层的层叠顺序
    zIndex: 0,
    // 最新弹出层的索引
    index: 0,
    // 配置,该配置项的作用是可以通过layer.config(options)方法来设置全局的默认配置
    config: {
      //是否移除弹层触发元素的焦点，避免按回车键时重复弹出
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

  // 缓存常用字符
  const doms$1 = ["layui-layer",
  //0
  ".layui-layer-title",
  //1
  ".layui-layer-main",
  //2
  ".layui-layer-dialog",
  //3
  "layui-layer-iframe",
  //4
  "layui-layer-content",
  //5
  "layui-layer-btn",
  //6
  "layui-layer-close" //7
  ];
  // 动画类
  doms$1.anim = {
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
  doms$1.html = $$1("html");
  doms$1.SHADE = "layui-layer-shade";
  doms$1.MOVE = "layui-layer-move";
  doms$1.anim.length - 1;

  // console.log(doms.anim);
  // console.log(animlen);

  const Class = function (setings) {
    let that = this,
      creat = function () {
        that.creat();
      };
    ++Store.index;
    that.index = Store.index;
    that.config.maxWidth = $$1(window).width() - 15 * 2; // 初始最大宽度：当前屏幕宽，左右留 15px 边距
    that.config = $$1.extend({}, that.config, Store.config, setings);
    document.body ? creat() : setTimeout(function () {
      creat();
    }, 30);
  };
  Class.pt = Class.prototype;

  // 默认配置
  Class.pt.config = Constants.DEFAULTS;

  // 容器
  Class.pt.vessel = function (conType, callback) {
    let that = this;
    let times = that.index;
    let config = that.config;
    let zIndex = config.zIndex + times;
    let titype = typeof config.title === "object";
    let ismax = config.maxmin && (config.type === 1 || config.type === 2);
    let titleHTML = config.title ? '<div class="layui-layer-title" style="' + (titype ? config.title[1] : "") + '">' + (titype ? config.title[0] : config.title) + "</div>" : "";
    config.zIndex = zIndex;
    callback([
    // 遮罩
    config.shade ? '<div class="' + doms$1.SHADE + '" id="' + doms$1.SHADE + times + '" times="' + times + '" style="' + ("z-index:" + (zIndex - 1) + "; ") + '"></div>' : "",
    // 主体
    '<div class="' + doms$1[0] + (" layui-layer-" + Store.type[config.type]) + ((config.type == 0 || config.type == 2) && !config.shade ? " layui-layer-border" : "") + " " + (config.skin || "") + '" id="' + doms$1[0] + times + '" type="' + Store.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? "object" : "string") + '" style="z-index: ' + zIndex + "; width:" + config.area[0] + ";height:" + config.area[1] + ";position:" + (config.fixed ? "fixed;" : "absolute;") + '">' + (conType && config.type != 2 ? "" : titleHTML) +
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
          console.log("icon=16");
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
        arr.push('<span class="layui-icon layui-icon-close ' + [doms$1[7], doms$1[7] + (config.title ? config.closeBtn : config.type == 4 ? "1" : "2")].join(" ") + '"></span>');
      }
      return arr.join("");
    }() + "</div>" + (
    // 底部按钮
    config.btn ? function () {
      let button = "";
      typeof config.btn === "string" && (config.btn = [config.btn]);
      for (let i = 0, len = config.btn.length; i < len; i++) {
        button += '<a class="' + doms$1[6] + "" + i + '">' + config.btn[i] + "</a>";
      }
      return '<div class="' + function () {
        let className = [doms$1[6]];
        if (config.btnAlign) className.push(doms$1[6] + "-" + config.btnAlign);
        return className.join(" ");
      }() + '">' + button + "</div>";
    }() : "") + (config.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], titleHTML, $$1('<div class="' + doms$1.MOVE + '" id="' + doms$1.MOVE + '"></div>'));
    return that;
  };

  // 创建骨架
  Class.pt.creat = function () {
    let that = this;
    let config = that.config;
    let times = that.index;
    let content = config.content;
    let conType = typeof content === "object";
    let body = $$1("body");
    let setAnim = function (layero) {
      // anim 兼容旧版 shift
      if (config.shift) {
        config.anim = config.shift;
      }

      // 为兼容 jQuery3.0 的 css 动画影响元素尺寸计算
      if (doms$1.anim[config.anim]) {
        let animClass = "layer-anim " + doms$1.anim[config.anim];
        layero.addClass(animClass).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
          $$1(this).removeClass(animClass);
        });
      }
    };

    // 若 id 对应的弹层已经存在，则不重新创建
    if (config.id && $$1("." + doms$1[0]).find("#" + config.id)[0]) {
      return function () {
        let layero = $$1("#" + config.id).closest("." + doms$1[0]);
        let index = layero.attr("times");
        let options = layero.data("config");
        let elemShade = $$1("#" + doms$1.SHADE + index);
        let maxminStatus = layero.data("maxminStatus") || {};
        // 若弹层为最小化状态，则点击目标元素时，自动还原
        if (maxminStatus === "min") {
          layer.restore(index);
        } else if (options.hideOnClose) {
          elemShade.show();
          layero.show();
          setAnim(layero);
          setTimeout(function () {
            elemShade.css({
              opacity: elemShade.data(Constants.DATAKEY.SHADE_KEY)
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
        config.btn = "btn" in config ? config.btn : Store.btn[0];
        layer.closeAll("dialog");
        break;
      case 2:
        config.content = conType ? config.content : [config.content || "", "auto"];
        config.content = '<iframe scrolling="' + (config.content[1] || "auto") + '" allowtransparency="true" id="' + doms$1[4] + "" + times + '" name="' + doms$1[4] + "" + times + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
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
      body.append(html[0]); //往body加入了遮罩层
      conType // 判断content选项是对象
      ? function () {
        config.type == 2 || config.type == 4 ? function () {
          $$1("body").append(html[1]);
        }() : function () {
          if (!content.parents("." + doms$1[0])[0]) {
            content.data("display", content.css("display")).show().addClass("layui-layer-wrap").wrap(html[1]);
            $$1("#" + doms$1[0] + times).find("." + doms$1[5]).before(titleHTML);
          }
        }();
      }() : body.append(html[1]);
      $$1("#" + doms$1.MOVE)[0] || body.append(Store.moveElem = moveElem);
      that.layero = $$1("#" + doms$1[0] + times);
      that.shadeo = $$1("#" + doms$1.SHADE + times);
      config.scrollbar || Util.setScrollbar(times);
    }).auto(times);

    // 遮罩
    that.shadeo.css({
      "background-color": config.shade[1] || "#000",
      opacity: config.shade[0] || config.shade,
      transition: config.shade[2] || ""
    });
    that.shadeo.data(Constants.DATAKEY.SHADE_KEY, config.shade[0] || config.shade);
    config.type == 2 && layer.ie == 6 && that.layero.find("iframe").attr("src", content[0]);
    if (config.type == 4) {
      //tips层，调用tips的方法
      that.tips();
    } else {
      // 坐标自适应浏览器窗口尺寸
      that.offset();
      const zIndex = parseInt(Util.getStyle(document.getElementById(doms$1.MOVE), "z-index"));
      if (!zIndex) {
        that.layero.css("visibility", "hidden").offset().css("visibility", "visible");
      }
    }

    // 若是固定定位，则跟随 resize 事件来自适应坐标
    if (config.fixed) {
      if (!Store.events.resize[that.index]) {
        Store.events.resize[that.index] = function () {
          that.resize();
        };
        // 此处 resize 事件不会一直叠加，当关闭弹层时会移除该事件
        $$1(window).on("resize", Store.events.resize[that.index]);
      }
    }
    config.time <= 0 || setTimeout(function () {
      layer.close(that.index);
    }, config.time);
    that.move().callback();
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
      layero = $$1("#" + doms$1[0] + index);
    if (config.area[0] === "" && config.maxWidth > 0) {
      // 适配 ie7
      if (layer.ie && layer.ie < 8 && config.btn) {
        layero.width(layero.innerWidth());
      }
      layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
    }
    let area = [layero.innerWidth(), layero.innerHeight()];
    let titHeight = layero.find(doms$1[1]).outerHeight() || 0;
    let btnHeight = layero.find("." + doms$1[6]).outerHeight() || 0;
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
            setHeight("." + doms$1[5]);
          } else if (config.fixed && area[1] >= $$1(window).height()) {
            area[1] = $$1(window).height();
            setHeight("." + doms$1[5]);
          }
        } else {
          setHeight("." + doms$1[5]);
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
    that.offsetTop = ($$1(window).height() - area[1]) / 2;
    that.offsetLeft = ($$1(window).width() - area[0]) / 2;
    if (type) {
      that.offsetTop = config.offset[0];
      that.offsetLeft = config.offset[1] || that.offsetLeft;
    } else if (config.offset !== "auto") {
      if (config.offset === "t") {
        // 上
        that.offsetTop = 0;
      } else if (config.offset === "r") {
        // 右
        that.offsetLeft = $$1(window).width() - area[0];
      } else if (config.offset === "b") {
        // 下
        that.offsetTop = $$1(window).height() - area[1];
      } else if (config.offset === "l") {
        // 左
        that.offsetLeft = 0;
      } else if (config.offset === "lt") {
        // 左上
        that.offsetTop = 0;
        that.offsetLeft = 0;
      } else if (config.offset === "lb") {
        // 左下
        that.offsetTop = $$1(window).height() - area[1];
        that.offsetLeft = 0;
      } else if (config.offset === "rt") {
        // 右上
        that.offsetTop = 0;
        that.offsetLeft = $$1(window).width() - area[0];
      } else if (config.offset === "rb") {
        // 右下
        that.offsetTop = $$1(window).height() - area[1];
        that.offsetLeft = $$1(window).width() - area[0];
      } else {
        that.offsetTop = config.offset;
      }
    }
    if (!config.fixed) {
      that.offsetTop = /%$/.test(that.offsetTop) ? $$1(window).height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
      that.offsetLeft = /%$/.test(that.offsetLeft) ? $$1(window).width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
      that.offsetTop += $$1(window).scrollTop();
      that.offsetLeft += $$1(window).scrollLeft();
    }

    // 最小化窗口时的自适应
    if (layero.data("maxminStatus") === "min") {
      that.offsetTop = $$1(window).height() - (layero.find(doms$1[1]).outerHeight() || 0);
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
      follow = $$1(config.follow);
    if (!follow[0]) follow = $$1("body");
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
      if (goal.left + layArea[0] - $$1(window).width() > 0) {
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
      goal.top - ($$1(window).scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
    } else if (guide === 2) {
      $$1(window).width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal.where[3]();
    } else if (guide === 3) {
      goal.top - $$1(window).scrollTop() + goal.height + layArea[1] + 8 * 2 - $$1(window).height() > 0 && goal.where[0]();
    } else if (guide === 4) {
      layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]();
    }
    layero.find("." + doms$1[5]).css({
      "background-color": config.tips[1],
      "padding-right": config.closeBtn ? "30px" : ""
    });
    layero.css({
      left: goal.tipLeft - (config.fixed ? $$1(window).scrollLeft() : 0),
      top: goal.tipTop - (config.fixed ? $$1(window).scrollTop() : 0)
    });
  };

  // 拖拽层
  Class.pt.move = function () {
    let that = this;
    let config = that.config;
    let _DOC = $$1(document);
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
      let othis = $$1(this);
      let dict = {};
      if (config.move) {
        dict.layero = layero;
        dict.config = config;
        dict.offset = [e.clientX - parseFloat(layero.css("left")), e.clientY - parseFloat(layero.css("top"))];
        othis.data(DATA_NAME[0], dict);
        Store.eventMoveElem = othis;
        Store.moveElem.css("cursor", "move").show();
      }
      e.preventDefault();
    });

    // 按下右下角拉伸
    resizeElem.on("mousedown", function (e) {
      let othis = $$1(this);
      let dict = {};
      if (config.resize) {
        dict.layero = layero;
        dict.config = config;
        dict.offset = [e.clientX, e.clientY];
        dict.index = that.index;
        dict.area = [layero.outerWidth(), layero.outerHeight()];
        othis.data(DATA_NAME[1], dict);
        Store.eventResizeElem = othis;
        Store.moveElem.css("cursor", "se-resize").show();
      }
      e.preventDefault();
    });

    // 拖动元素，避免多次调用实例造成事件叠加
    if (Store.docEvent) return that;
    _DOC.on("mousemove", function (e) {
      // 拖拽移动
      if (Store.eventMoveElem) {
        let dict = Store.eventMoveElem.data(DATA_NAME[0]) || {},
          layero = dict.layero,
          config = dict.config;
        let X = e.clientX - dict.offset[0];
        let Y = e.clientY - dict.offset[1];
        let fixed = layero.css("position") === "fixed";
        e.preventDefault();
        dict.stX = fixed ? 0 : $$1(window).scrollLeft();
        dict.stY = fixed ? 0 : $$1(window).scrollTop();

        // 控制元素不被拖出窗口外
        if (!config.moveOut) {
          let setRig = $$1(window).width() - layero.outerWidth() + dict.stX;
          let setBot = $$1(window).height() - layero.outerHeight() + dict.stY;
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
      if (Store.eventResizeElem) {
        let dict = Store.eventResizeElem.data(DATA_NAME[1]) || {};
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
      if (Store.eventMoveElem) {
        let dict = Store.eventMoveElem.data(DATA_NAME[0]) || {};
        let config = dict.config;
        Store.eventMoveElem.removeData(DATA_NAME[0]);
        delete Store.eventMoveElem;
        Store.moveElem.hide();
        config.moveEnd && config.moveEnd(dict.layero);
      }
      if (Store.eventResizeElem) {
        Store.eventResizeElem.removeData(DATA_NAME[1]);
        delete Store.eventResizeElem;
        Store.moveElem.hide();
      }
    });
    Store.docEvent = true; // 已给 document 执行全局事件
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
    function executeSuccess() {
      if (config.success) {
        config.success(layero, that.index, that);
      }
    }
    if (config.type === 2) {
      layero.find("iframe").on("load", executeSuccess);
    } else {
      executeSuccess();
    }
    layer.ie === 6 && that.IE6(layero);

    // 按钮事件绑定
    handleButtonEvents(layero, config, that);

    // 右上角关闭回调
    layero.find("." + doms$1[7]).on("click", function () {
      handleCancel(config, that);
    });

    // 点击遮罩关闭
    if (config.shadeClose) {
      that.shadeo.on("click", function () {
        layer.close(that.index);
      });
    }

    // 最小化
    layero.find(".layui-layer-min").on("click", function () {
      handleMinimize(config, layero, that);
    });

    // 全屏/还原
    layero.find(".layui-layer-max").on("click", function () {
      handleMaximize(config, layero, that);
    });
    config.end && (Store.end[that.index] = config.end);
    config.beforeEnd && (Store.beforeEnd[that.index] = $$1.proxy(config.beforeEnd, config, layero, that.index, that));
  };

  // 处理按钮点击事件
  function handleButtonEvents(layero, config, that) {
    layero.find("." + doms$1[6]).children("a").on("click", function () {
      let btnElem = $$1(this);
      let index = btnElem.index();
      if (btnElem.attr("disabled")) return;
      if (config.btnAsync) {
        handleAsyncButton(btnElem, config, index, that);
      } else {
        handleNormalButton(btnElem, config, index, that);
      }
    });
  }

  // 处理普通按钮
  function handleNormalButton(btnElem, config, index, that) {
    if (index === 0) {
      (config.yes || config["btn1"] || function () {
        layer.close(that.index);
      })(that.index, that.layero, that);
    } else {
      let close = config["btn" + (index + 1)] && config["btn" + (index + 1)](that.index, that.layero, that);
      if (close !== false) {
        layer.close(that.index);
      }
    }
  }

  // 处理异步按钮
  function handleAsyncButton(btnElem, config, index, that) {
    let btnCallback = index === 0 ? config.yes || config["btn1"] : config["btn" + (index + 1)];
    that.loading = function (isLoading) {
      console.log("我被执行了");
      that.btnLoading(btnElem, isLoading);
    };
    if (btnCallback) {
      Util.promiseLikeResolve(btnCallback.call(config, that.index, that.layero, that)).then(function (result) {
        if (result !== false) {
          layer.close(that.index);
        }
      }, function (reason) {
        reason !== undefined && console.error("layer error hint: " + reason);
      });
    } else {
      layer.close(that.index);
    }
  }

  // 处理取消按钮
  function handleCancel(config, that) {
    let close = config.cancel && config.cancel(that.index, that.layero, that);
    close === false || layer.close(that.index);
  }

  // 处理最小化按钮
  function handleMinimize(config, layero, that) {
    let min = config.min && config.min(layero, that.index, that);
    min === false || layer.min(that.index, config);
  }

  // 处理最大化按钮
  function handleMaximize(config, layero, that) {
    let maxButton = layero.find(".layui-layer-max");
    if (maxButton.hasClass("layui-layer-maxmin")) {
      layer.restore(that.index);
      config.restore && config.restore(layero, that.index, that);
    } else {
      layer.full(that.index, config);
      setTimeout(function () {
        config.full && config.full(layero, that.index, that);
      }, 100);
    }
  }
  Class.pt.IE6 = function (layero) {
    // 隐藏select
    $$1("select").each(function (index, value) {
      let sthis = $$1(this);
      if (!sthis.parents("." + doms$1[0])[0]) {
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

  class HTMLGenerator {
    // 索引
    constructor(config, index) {
      console.log("HTMLGenerator");
      this.config = config;
      this.index = index;
      //计算索引值
      this.zIndex = this.config.zIndex + this.index;
    }

    // 获取遮罩层的html
    getShadeHTML() {
      let shadeHTML = "";
      if (this.config.shade) {
        shadeHTML = Util.sprintf(Constants.HTML.shade, Constants.CLASSES.shade, `${Constants.CLASSES.shade}${this.index}`, this.index, this.zIndex - 1);
      }
      return shadeHTML;
    }

    // 获取容器的html字符串
    getContainerHTML() {
      // 加入主体开始标签
      const html = [this.#getMainWrapBeginHTML()];

      // 加入title
      html.push(this.getTtitleHTML());

      // 加入内容区开头标签
      html.push(this.#getContentBeginHTML());

      // 表情图标(这里整一个方法拆分出去，不然这一个方法太长了)
      html.push(this.#getIconHtml());

      // 加入正在的主体内容
      html.push(this.#getContentHTML());

      // 加入内容区结尾
      html.push(Constants.HTML.content[1]);

      // 加入右操作区域开头
      html.push(Constants.HTML.setWin[0]);

      // 最小化最大化按钮
      html.push(this.#getMinMaxBtnHTML());

      // 关闭按钮
      html.push(this.#getCloseBtnHTML());

      // 加入右操作区域结尾
      html.push(Constants.HTML.setWin[1]);

      //加入底部按钮区域
      html.push(this.#getBottomBtnHTHML());

      // 控制拖动大小的
      if (this.config.resize) {
        html.push(Constants.HTML.resize);
      }

      //加入主体尾部
      html.push(Constants.HTML.mainWrap[1]);
      return html.join("");
    }

    // 获取容器的开始标记
    #getMainWrapBeginHTML() {
      const borderClass = [MAP.TYPE.DIALOG, MAP.TYPE.IFRAME].includes(this.config.type) && !this.config.shade ? Constants.CLASSES.layerBorder : "";
      const layerType = MAP.TYPE_NAME[this.config.type];
      return Util.sprintf(Constants.HTML.mainWrap[0], Constants.CLASSES.layuiLayer, `layui-layer-${layerType}`, borderClass, this.config.skin || "", `${Constants.CLASSES.layuiLayer}${this.index}`,
      //id
      layerType,
      //type
      this.index,
      //次数
      this.config.time,
      //时间
      typeof this.config.content === "object" ? "object" : "string",
      //类型
      this.zIndex, this.config.area[0], this.config.area[1], this.config.fixed ? "fixed;" : "absolute;");
    }
    getTtitleHTML() {
      // title选项的类型判断
      const titleType = Array.isArray(this.config.title);
      // 加入title
      let titleHTML = "";
      if (this.config.title) {
        const titleStyle = titleType ? this.config.title[1] : "";
        const titleText = titleType ? this.config.title[0] : this.config.title;
        titleHTML = Util.sprintf(Constants.HTML.title, titleStyle, titleText);
      }
      return typeof this.config.content === "object" && this.config.type != MAP.TYPE.IFRAME ? "" : titleHTML;
    }
    #getContentBeginHTML() {
      // 是信息框且设置了图标就添加一点边距
      const paddingClass = this.config.type == MAP.TYPE.DIALOG && this.config.icon !== -1 ? Constants.CLASSES.layerPadding : "";
      const loadingClass = this.config.type == MAP.TYPE.LOADING ? `${Constants.CLASSES.layerLoading}${this.config.icon}` : "";
      return Util.sprintf(Constants.HTML.content[0], this.config.id ? this.config.id : "",
      //id
      paddingClass,
      //边距
      loadingClass // 加载图标
      );
    }
    #getIconHtml() {
      // 动画基础类
      const animClass = [Constants.CLASSES.layuiAnim, Constants.CLASSES.layuiAnimRotate, Constants.CLASSES.layuiAnimLoop].join(" ");

      //若为信息框，支持传入 0-6 的可选值
      if (this.config.type === MAP.TYPE.DIALOG && this.config.icon !== -1) {
        return this.#getFaceIcon(animClass);
      }
      // 若为加载层，支持传入 0-2 的可选值
      if (this.config.type === MAP.TYPE.LOADING) {
        return this.#getLoadingIcon(animClass);
      }
      return "";
    }
    #getContentHTML() {
      const isPageType = this.config.type === MAP.TYPE.PAGE;

      // 如果是 PAGE 类型并且 conType 存在，返回空字符串
      if (isPageType && typeof this.config.content === "object") {
        return "";
      }

      // 如果 content 存在，返回 content，否则返回空字符串
      return this.config.content ? this.config.content : "";
    }
    #getBottomBtnHTHML() {
      const html = [];
      //加入底部按钮区域
      if (this.config.btn) {
        const btnAlignClass = this.config.btnAlign ? `${Constants.CLASSES.layerBtn}-${this.config.btnAlign}` : "";
        html.push(Util.sprintf(Constants.HTML.btnWrap[0], btnAlignClass));

        //加入按钮
        html.push(this.#getButtonHTML());
        html.push(Constants.HTML.btnWrap[1]);
      }
      return html.join(" ");
    }
    #getCloseBtnHTML() {
      let html = "";
      if (this.config.closeBtn) {
        let closeButton;
        if (this.config.title) {
          closeButton = this.config.closeBtn;
        } else if (this.config.type === MAP.TYPE.TIPS) {
          closeButton = "1";
        } else {
          closeButton = "2";
        }
        html = Util.sprintf(Constants.HTML.closeBtn, Constants.CLASSES.layerClose, `${Constants.CLASSES.layerClose}${closeButton}`);
      }
      return html;
    }
    #getMinMaxBtnHTML() {
      const html = [];
      // 当 this.config.maxmin 为 true，并且 this.config.type 的值是 1 或 2 时，ismax 的值为 true,否则，ismax 的值为 false

      let ismax = this.config.maxmin && [MAP.TYPE.PAGE, MAP.TYPE.IFRAME].includes(this.config.type);
      if (ismax) {
        html.push(Constants.HTML.minBtn);
        html.push(Constants.HTML.maxBtn);
      }
      return html.join(" ");
    }
    #getButtonHTML() {
      if (!this.config.btn) return "";
      const buttonHtml = [];

      // 如果 `config.btn` 是字符串，将其转换为数组
      if (typeof this.config.btn === "string") {
        this.config.btn = [this.config.btn];
      }
      console.log(this.config.btn);

      // 遍历按钮数组，生成按钮的 HTML 字符串
      this.config.btn.forEach((btnLabel, i) => {
        buttonHtml.push(Util.sprintf(Constants.HTML.btn, i, btnLabel));
      });
      return buttonHtml.join(" ");
    }
    #getFaceIcon(animClass) {
      const faceClassNameMap = {
        [MAP.FACE.TIPS]: Constants.CLASSES.faceTips,
        [MAP.FACE.SUCCESS]: Constants.CLASSES.faceSuccess,
        [MAP.FACE.ERROR]: Constants.CLASSES.faceError,
        [MAP.FACE.QUESTION]: Constants.CLASSES.faceQuestion,
        [MAP.FACE.LOCK]: Constants.CLASSES.faceLock,
        [MAP.FACE.CRY]: Constants.CLASSES.faceCry,
        [MAP.FACE.SMILE]: Constants.CLASSES.faceSmile
      };

      // 加载图标
      if (this.config.icon === MAP.FACE.LOADING) {
        return Util.sprintf(Constants.HTML.dialogLoadIcon, animClass);
      }
      const faceClassName = faceClassNameMap[this.config.icon] || faceClassNameMap[MAP.FACE.TIPS];
      return Util.sprintf(Constants.HTML.faceIcon, faceClassName);
    }

    // 获取加载层图标
    #getLoadingIcon(animClass) {
      const loadingIconsMap = {
        [MAP.LOADING_ICON.BALL_SPIN]: Constants.CLASSES.iconLoading,
        [MAP.LOADING_ICON.BALL_CLIP_ROTATE_GRAY]: Constants.CLASSES.iconLoading1,
        [MAP.LOADING_ICON.BALL_CLIP_ROTATE_BLUE]: Constants.CLASSES.iconLoading2
      };
      if (this.config.icon === 2) {
        return Util.sprintf(`<div class="%s "%s"></div>`, loadingIconsMap[MAP.LOADING_ICON.BALL_CLIP_ROTATE_BLUE], animClass);
      }
      const iconClass = loadingIconsMap[this.config.icon] || loadingIconsMap[MAP.LOADING_ICON.BALL_SPIN];
      return Util.sprintf(Constants.HTML.loadIcon, iconClass, animClass);
    }
  }

  // tips定位的逻辑单独抽离成一个类
  class TipsLocation {
    tipLeft = 0;
    tipTop = 0;
    constructor(follow, config, layero) {
      this.follow = follow;
      this.config = config;
      this.layero = layero;

      // 成员变量
      this.width = follow.outerWidth();
      this.height = follow.outerHeight();
      this.top = follow.offset().top;
      this.left = follow.offset().left;

      // 背景色
      this.tipColor = config.tips[1];
      this.layeroouterHeight = layero.outerHeight();
      this.layeroOuterWidth = layero.outerWidth();
      // 方位
      this.guide = config.tips[0];
    }

    // 更新箭头类
    #updateArrow(position) {
      const arrowClass = {
        T: Constants.CLASSES.layerTipsT,
        R: Constants.CLASSES.layerTipsR,
        B: Constants.CLASSES.layerTipsB,
        L: Constants.CLASSES.layerTipsL
      };

      // 边框的方位
      const borderPosition = position === "T" || position === "B" ? "right" : "bottom";
      this.layero.find(`.${Constants.CLASSES.layerTipsG}`).removeClass(Object.values(arrowClass).join(" ")).addClass(arrowClass[position]).css(`border-${borderPosition}-color`, this.tipColor);
    }
    #autoAdjustLeft() {
      this.tipLeft = this.left + this.layeroOuterWidth > $$1(window).width() ? this.left + this.width - this.layeroOuterWidth : this.left;
    }
    // Public API
    // 设置箭头位置
    setupArrowPosition(guide) {
      // 基于导向的箭头位置
      const arrowPositions = {
        [MAP.TIPS_DIRECTION.TOP]: () => {
          this.#autoAdjustLeft();
          this.tipTop = this.top - this.layeroouterHeight - 10;
          this.#updateArrow("T");
        },
        [MAP.TIPS_DIRECTION.RIGHT]: () => {
          this.tipLeft = this.left + this.width + 10;
          this.tipTop = Math.max(this.top - (this.height * 0.75 < 21 ? 21 - this.height * 0.5 : 0), 0);
          this.#updateArrow("R");
        },
        [MAP.TIPS_DIRECTION.BOTTOM]: () => {
          this.#autoAdjustLeft();
          this.tipTop = this.top + this.height + 10;
          this.#updateArrow("B");
        },
        [MAP.TIPS_DIRECTION.LEFT]: () => {
          this.tipLeft = this.left - this.layeroOuterWidth - 10;
          this.tipTop = Math.max(this.top - (this.height * 0.75 < 21 ? 21 - this.height * 0.5 : 0), 0);
          this.#updateArrow("L");
        }
      };
      arrowPositions[guide || this.guide](); // 应用初始箭头位置
    }

    // 溢出的情况调整
    overflowAdjustment() {
      // 调整溢流或屏幕边缘情况
      const windowHeight = $$1(window).height();
      const windowWidth = $$1(window).width();
      const scrollTop = $$1(window).scrollTop();
      // 8*2为小三角形占据的空间
      const triangle = 2 * 8;
      const overflowAdjustments = {
        [MAP.TIPS_DIRECTION.TOP]: () => {
          if (this.top - (scrollTop + this.layeroouterHeight + triangle) < 0) {
            this.setupArrowPosition(3);
          }
        },
        [MAP.TIPS_DIRECTION.RIGHT]: () => {
          if (windowWidth - (this.left + this.width + this.layeroOuterWidth + triangle) < 0) {
            this.setupArrowPosition(4);
          }
        },
        [MAP.TIPS_DIRECTION.BOTTOM]: () => {
          if (this.top + this.height + this.layeroouterHeight + triangle - windowHeight > 0) {
            this.setupArrowPosition(1);
          }
        },
        [MAP.TIPS_DIRECTION.LEFT]: () => {
          if (this.layeroOuterWidth + triangle > this.left) {
            this.setupArrowPosition(2);
          }
        }
      };
      overflowAdjustments[this.guide]();
    }
    updatePosition() {
      this.layero.css({
        left: this.tipLeft - (this.config.fixed ? $$1(window).scrollLeft() : 0),
        top: this.tipTop - (this.config.fixed ? $$1(window).scrollTop() : 0)
      });
    }
  }

  class EventBinder {
    // 传递的参数为容器实例
    constructor(container) {
      // 容器对象
      this.container = container;
      // layer对象
      this.layer = this.container.layer;
      // 配置
      this.config = this.container.config;
      // layer弹出层的jq对象
      this.layero = this.container.layero;
      this.index = this.container.index;

      // 遮罩层
      this.shadeo = this.container.shadeo;
      this.bind();
    }
    bind() {
      console.log("EventBinder");

      // 置顶当前窗口
      shared.zIndex = this.config.zIndex;
      const executeSuccess = () => {
        if (this.config.success) {
          this.config.success(this.layero, this.index, this.container);
        }
      };
      if (this.config.type === MAP.TYPE.IFRAME) {
        this.layero.find("iframe").on("load", executeSuccess);
      } else {
        executeSuccess();
      }

      // 按钮事件绑定
      this.handleButtonEvents();

      // 右上角关闭按钮
      this.winClose();

      // 遮罩层点击关闭处理
      this.shadeClose();

      // 最小化
      this.winMin();

      // 全屏/还原
      this.fullscreenToggle();

      // 弹层被关闭且销毁后的回调函数
      if (this.config.end) {
        shared.end[this.index] = this.config.end;
      }

      // 弹层被关闭前的回调函数。如果返回 false 或者 Promise.reject，将会取消关闭操作
      if (this.config.beforeEnd) {
        shared.beforeEnd[this.index] = this.config.beforeEnd.bind(this.config, this.layero, this.index, this.container);
      }
    }
    handleButtonEvents() {
      let that = this;
      this.layero.find(`.${Constants.CLASSES.layerBtn}`).children("a").on("click", function () {
        const btnElem = $(this);

        // 按钮的索引层
        const btnIndex = btnElem.index();
        if (btnElem.attr("disabled")) return;
        if (that.config.btnAsync) {
          console.log("异步按钮");
          that.handleAsyncButton(btnElem, btnIndex);
        } else {
          that.handleNormalButton(btnIndex);
        }
      });
    }
    handleNormalButton(btnIndex) {
      //第一个按钮
      if (btnIndex === 0) {
        // 定义关闭层的默认函数
        const defaultClose = () => {
          this.layer.close(this.index);
        };

        // 获取优先执行的函数
        const yesCallback = this.config.yes || this.config[`btn${btnIndex + 1}`] || defaultClose;

        // 执行获取的回调函数
        yesCallback(this.index, this.layero, this.container);
      } else {
        // 获取对应的按钮回调函数
        const btnCallback = this.config[`btn${btnIndex + 1}`];

        // 如果回调函数存在，则执行
        let close;
        if (btnCallback) {
          close = btnCallback(this.index, this.layero, this.container);
        }

        // 如果回调函数的返回值不是 false，则关闭弹出层
        if (close !== false) {
          this.layer.close(this.index);
        }
      }
    }
    handleAsyncButton(btnElem, btnIndex) {
      let btnCallback;
      if (btnIndex === 0) {
        // 如果是第一个按钮，优先使用 config.yes，否则使用 config["btn1"]
        btnCallback = this.config.yes || this.config[`btn${btnIndex + 1}`];
      } else {
        // 其他按钮按顺序获取
        btnCallback = this.config[`btn${btnIndex + 1}`];
      }

      // 给成员变量赋值
      this.container.$btnElem = btnElem;
      if (btnCallback) {
        Util.promiseLikeResolve(btnCallback.call(this.config, this.index, this.layero, this.container)).then(result => {
          if (result !== false) {
            this.layer.close(this.index);
          }
        }, reason => {
          reason !== undefined && console.error("layer error hint: " + reason);
        });
      } else {
        this.layer.close(this.index);
      }
    }
    winClose() {
      this.layero.find(`.${Constants.CLASSES.layerClose}`).on("click", () => {
        let cancelCallback = this.config.cancel && this.config.cancel(this.index, this.layero, this.container);
        if (cancelCallback !== false) {
          this.layer.close(this.index);
        }
      });
    }
    shadeClose() {
      // 点击遮罩关闭
      if (this.config.shadeClose) {
        this.shadeo.on("click", () => {
          this.layer.close(this.index);
        });
      }
    }
    winMin() {
      this.layero.find(`.${Constants.CLASSES.layerMin}`).on("click", () => {
        let callback = this.config.min && this.config.min(this.layero, this.index, this.container);
        if (callback !== false) {
          this.layer.min(this.index, this.config);
        }
      });
    }
    fullscreenToggle() {
      this.layero.find(`.${Constants.CLASSES.layerMax}`).on("click", () => {
        const maxButton = this.layero.find(`.${Constants.CLASSES.layerMax}`);
        if (maxButton.hasClass(Constants.CLASSES.layerMaxMin)) {
          this.layer.restore(this.index);
          this.config.restore && this.config.restore(this.layero, this.index, this.container);
        } else {
          this.layer.full(this.index, this.config);
          setTimeout(() => {
            this.config.full && this.config.full(this.layero, this.index, this.container);
          }, 100);
        }
      });
    }
  }

  class Container {
    //成员变量
    config;
    // 弹层dom的jq对象
    layero;
    // 遮罩层jq对象
    shadeo;
    // 弹层的外部宽度(包括填充、边框和可选边距)
    layeroOuterWidth;
    // 外部高度
    layeroouterHeight;
    // 保存当前实例的index

    index;

    // 拖拽的元素
    $moveEl;

    // 当前被点击的按钮的dom对象,例如，信息框底部的按钮
    $btnElem;
    constructor(options, layer) {
      // 最新的索引自增
      ++shared.index;
      this.index = shared.index;

      // layer对象
      this.layer = layer;
      // 合并配置
      this.config = $$1.extend({}, Constants.DEFAULTS, shared.config, {
        maxWidth: $$1(window).width() - 15 * 2
      }, options);

      // body是否准备完毕,完毕直接调用，没有就延迟30毫秒
      this.initContainer();
    }

    //创建容器
    initContainer() {
      // 若 id 对应的弹层已经存在，则不重新创建 layui-layer
      if (this.config.id && $$1(`.${Constants.CLASSES.layuiLayer}`).find(`#${this.config.id}`)[0]) {
        console.log("没有创建");
      }

      // 是否移除活动元素的焦点
      if (this.config.removeFocus && document.activeElement) {
        document.activeElement.blur(); // 将原始的聚焦节点失焦
      }
      this.initAreaOption();
      this.adjustLayerSettings();

      // 使用类来生成字符串
      const htmlGenerator = new HTMLGenerator(this.config, this.index);
      const html = htmlGenerator.getContainerHTML();

      // 加入遮罩层
      $$1("body").append(htmlGenerator.getShadeHTML());
      console.log(this.config.content);

      // 判断content选项是对象
      if (typeof this.config.content === "object") {
        if (this.config.type == MAP.TYPE.IFRAME || this.config.type == MAP.TYPE.TIPS) {
          $$1("body").append(html);
        } else {
          if (!this.config.content.parents(`.${Constants.CLASSES.layuiLayer}`)[0]) {
            this.config.content.data("display", this.config.content.css("display")).show().addClass(Constants.CLASSES.layerWrap).wrap(html);
            $$1(`#${Constants.CLASSES.layuiLayer}${this.index}`).find(`.${Constants.CLASSES.layerContent}`).before(htmlGenerator.getTtitleHTML());
          }
        }
      } else {
        $$1("body").append(html);
      }
      this.$moveEl = $$1(Util.sprintf(Constants.HTML.move, Constants.CLASSES.move, Constants.CLASSES.move));
      $$1(`#${Constants.CLASSES.move}`)[0] || $$1("body").append(this.$moveEl);

      // 保存为成员变量,方便后续使用
      this.layero = Util.getLayeroByIndex(this.index);
      this.shadeo = Util.getShadeoByIndex(this.index);
      this.layeroOuterWidth = this.layero.outerWidth();
      this.layeroouterHeight = this.layero.outerHeight();
      this.config.scrollbar || Util.setScrollbar(this.index);

      // 设置弹出框的高度
      this.auto();

      //遮罩
      this.shadeoHandle();
      if (this.config.type == MAP.TYPE.TIPS) {
        //tips层，调用tips的方法
        this.tips();
      } else {
        // 坐标自适应浏览器窗口尺寸
        this.offset();

        // 获取拖拽层的元素堆叠索引
        const movezIndex = parseInt(Util.getStyle(document.getElementById(Constants.CLASSES.move), "z-index"));
        if (!movezIndex) {
          this.layero.css("visibility", "hidden").offset().css("visibility", "visible");
        }
      }

      //若是固定定位，则跟随 resize 事件来自适应坐标
      if (this.config.fixed) {
        if (!shared.events.resize[this.index]) {
          //如果当前实例对应的resize事件没有设置

          shared.events.resize[this.index] = () => {
            // 调用 offset 方法
            this.offset();

            // 判断 area 是否为百分比格式，如果是则调用 auto 方法
            const isPercentage = this.config.area.some(area => /^\d+%$/.test(area));
            if (isPercentage) this.auto(this.index);

            // 如果类型为 4，调用 tips 方法
            if (this.config.type === MAP.TYPE.TIPS) this.tips();
          };

          // 此处 resize 事件不会一直叠加，当关闭弹层时会移除该事件
          $$1(window).on("resize", shared.events.resize[this.index]);
        }
      }
      this.config.time <= 0 || setTimeout(() => {
        this.layer.close(this.index);
      }, this.config.time);

      // 拖拽处理
      this.move();

      // 事件绑定,这里用类的方式来实现，比较友好
      new EventBinder(this);

      // 设置动画
      this.setAnim(this.layero);

      // 记录配置信息
      this.layero.data("config", this.config);
    }

    // 设置动画
    setAnim(layero) {
      // anim 兼容旧版 shift
      if (this.config.shift) {
        this.config.anim = this.config.shift;
      }
      const animationClassMap = {
        0: Constants.CLASSES.layerAnim0,
        1: Constants.CLASSES.layerAnim1,
        2: Constants.CLASSES.layerAnim2,
        3: Constants.CLASSES.layerAnim3,
        4: Constants.CLASSES.layerAnim4,
        5: Constants.CLASSES.layerAnim5,
        6: Constants.CLASSES.layerAnim6,
        slideDown: Constants.CLASSES.animSlideDown,
        slideLeft: Constants.CLASSES.animSlideLeft,
        slideUp: Constants.CLASSES.animSlideUp,
        slideRight: Constants.CLASSES.animSlideRight
      };
      const animationClass = animationClassMap[this.config.anim];
      if (!animationClass) return;

      // 为兼容 jQuery3.0 的 css 动画影响元素尺寸计算
      const animationFullClass = `${Constants.CLASSES.layerAnim} ${animationClass}`;
      layero.addClass(animationFullClass).one("animationend", () => {
        layero.removeClass(animationFullClass);
      });
    }

    // 设置弹出框的高度和宽度(弹出框的位置)
    auto() {
      if (this.config.area[0] === "" && this.config.maxWidth > 0) {
        this.layeroOuterWidth > this.config.maxWidth && this.layero.width(this.config.maxWidth);
      }
      const layeroInnerHeight = this.layero.innerHeight();
      if (this.config.type === MAP.TYPE.IFRAME) {
        this.setHeight("iframe");
      } else {
        if (this.config.area[1] === "") {
          if (this.config.maxHeight > 0 && this.layero.outerHeight() > this.config.maxHeight) {
            layeroInnerHeight = this.config.maxHeight;
            this.setHeight(`.${Constants.CLASSES.layerContent}`);
          } else if (this.config.fixed && layeroInnerHeight >= $$1(window).height()) {
            layeroInnerHeight = $$1(window).height();
            this.setHeight(`.${Constants.CLASSES.layerContent}`);
          }
        } else {
          this.setHeight(`.${Constants.CLASSES.layerContent}`);
        }
      }
    }
    setHeight(selector) {
      //标题的高度
      const titHeight = this.layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      // 按钮的高度
      const btnHeight = this.layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;
      const elem = this.layero.find(selector);
      const elempaddingTop = parseFloat(elem.css("padding-top")) | 0;
      elem.height(this.layero.innerHeight() - titHeight - btnHeight - 2 * elempaddingTop);
    }

    // 根据不同的弹出层类型处理一些设置
    adjustLayerSettings() {
      const typeMap = {
        // dialog
        [MAP.TYPE.DIALOG]: () => {
          this.config.btn = "btn" in this.config ? this.config.btn : shared.btn[0];
          this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.DIALOG]);
        },
        // iframe
        [MAP.TYPE.IFRAME]: () => {
          // console.log("www");
          // 转换成数组
          this.config.content = Array.isArray(this.config.content) ? this.config.content : [this.config.content || "", "auto"];

          //重新赋值的操作

          // layui-layer-iframe
          this.config.content = Util.sprintf(Constants.HTML.iframe, this.config.content[1] || "auto", Constants.CLASSES.layerIFrame, Constants.CLASSES.layerIFrame, this.config.content[0]);
        },
        // loading
        [MAP.TYPE.LOADING]: () => {
          delete this.config.title;
          delete this.config.closeBtn;
          this.config.icon === -1 && this.config.icon === 0;
          this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.LOADING]);
        },
        // tips
        [MAP.TYPE.TIPS]: () => {
          this.config.content = Array.isArray(this.config.content) ? this.config.content : [this.config.content, "body"];
          this.config.follow = this.config.content[1];
          this.config.content = `${this.config.content[0]}${Constants.HTML.tipsG}`;
          delete this.config.title;
          this.config.tips = Array.isArray(this.config.tips) ? this.config.tips : [this.config.tips, true];
          //是否允许同时存在多个 tips 层，即不销毁上一个 tips
          this.config.tipsMore || this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.TIPS]);
        }
      };

      // 调用switch
      typeMap[this.config.type] && typeMap[this.config.type]();
    }

    // 初始化area属性
    initAreaOption() {
      // 初始化 area 属性
      if (typeof this.config.area === "string") {
        this.config.area = this.config.area === "auto" ? ["", ""] : [this.config.area, ""];
      }
    }

    // 拖拽层
    move() {
      let that = this;
      let DATA_NAME = ["LAY_MOVE_DICT", "LAY_RESIZE_DICT"];
      let moveElem = this.layero.find(this.config.move);
      let resizeElem = this.layero.find(`.${Constants.CLASSES.layerResize}`);

      // 给指定元素添加拖动光标
      if (this.config.move) moveElem.css("cursor", "move");

      // 按下拖动元素
      moveElem.on("mousedown", function (event) {
        if (event.button) {
          return;
        } // 不是左键不处理
        let othis = $$1(this);
        let dict = {};
        console.log("mousedown");
        if (that.config.move) {
          dict.layero = that.layero;
          dict.config = that.config;
          dict.offset = [event.clientX - parseFloat(that.layero.css("left")), event.clientY - parseFloat(that.layero.css("top"))];
          othis.data(DATA_NAME[0], dict);
          // 把拖拽元素的实例绑定到eventMoveElem
          shared.eventMoveElem = othis;
          that.$moveEl.css("cursor", "move").show();
        }
        event.preventDefault();
      });

      // 按下右下角拉伸
      resizeElem.on("mousedown", function (event) {
        const $this = $$1(this);
        if (that.config.resize) {
          // 把数据绑定到拖动元素上
          $this.data(DATA_NAME[1], {
            layero: that.layero,
            config: that.config,
            offset: [event.clientX, event.clientY],
            index: that.index,
            area: [that.layeroOuterWidth, that.layeroouterHeight]
          });
          shared.eventResizeElem = $this;
          that.$moveEl.css("cursor", "se-resize").show();
        }
        event.preventDefault();
      });

      // 拖动元素，避免多次调用实例造成事件叠加
      if (shared.docEvent) return;
      $$1(document).on("mousemove", function (event) {
        // 拖拽移动，如果eventMoveElem有值,说明拖拽的dom已经被鼠标左键按下过
        if (shared.eventMoveElem) {
          // 从拖动元素中把存储的数据取出来
          let dict = shared.eventMoveElem.data(DATA_NAME[0]) || {};
          let layero = dict.layero;
          let config = dict.config;
          let X = event.clientX - dict.offset[0];
          let Y = event.clientY - dict.offset[1];
          let fixed = layero.css("position") === "fixed";
          event.preventDefault();
          dict.stX = fixed ? 0 : $$1(window).scrollLeft();
          dict.stY = fixed ? 0 : $$1(window).scrollTop();
          // 控制元素不被拖出窗口外
          if (!config.moveOut) {
            let setRig = $$1(window).width() - layero.outerWidth() + dict.stX;
            let setBot = $$1(window).height() - layero.outerHeight() + dict.stY;
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
        if (shared.eventResizeElem) {
          let dict = shared.eventResizeElem.data(DATA_NAME[1]) || {};
          let config = dict.config;
          let X = event.clientX - dict.offset[0];
          let Y = event.clientY - dict.offset[1];
          event.preventDefault();

          // 拉伸宽高
          that.layer.style(dict.index, {
            width: dict.area[0] + X,
            height: dict.area[1] + Y
          });
          config.resizing && config.resizing(dict.layero);
        }
      });

      // 左键放开
      $$1(document).on("mouseup", function () {
        if (shared.eventMoveElem) {
          let dict = shared.eventMoveElem.data(DATA_NAME[0]) || {};
          let config = dict.config;
          shared.eventMoveElem.removeData(DATA_NAME[0]);
          delete shared.eventMoveElem;
          that.$moveEl.hide();
          config.moveEnd && config.moveEnd(dict.layero);
        }
        if (shared.eventResizeElem) {
          shared.eventResizeElem.removeData(DATA_NAME[1]);
          delete shared.eventResizeElem;
          that.$moveEl.hide();
        }
      });
      shared.docEvent = true; // 已给 document 执行全局事件
    }
    tips() {
      const follow = $$1(this.config.follow)[0] ? $$1(this.config.follow) : $$1("body");

      //follow, config, layero
      const tipsLocation = new TipsLocation(follow, this.config, this.layero);

      // 初始化箭头位置
      tipsLocation.setupArrowPosition();

      // 调整溢流或屏幕边缘情况
      tipsLocation.overflowAdjustment();

      // 更新位置
      tipsLocation.updatePosition();

      // 更新内容的样式
      this.layero.find(`.${Constants.CLASSES.layerContent}`).css({
        "background-color": this.config.tips[1],
        "padding-right": this.config.closeBtn ? "30px" : ""
      });
    }

    // 遮罩处理
    shadeoHandle() {
      // 遮罩
      this.shadeo.css({
        "background-color": this.config.shade[1] || "#000",
        opacity: this.config.shade[0] || this.config.shade,
        transition: this.config.shade[2] || ""
      });
      this.shadeo.data(Constants.DATAKEY.SHADE_KEY, this.config.shade[0] || this.config.shade);
    }

    // 给按钮前方添加loading效果
    loading(isLoading) {
      if (isLoading) {
        let loadingTpl = '<i class="layui-layer-btn-loading-icon layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';
        if (this.$btnElem.find(".layui-layer-btn-loading-icon")[0]) return;
        this.$btnElem.addClass("layui-layer-btn-is-loading").attr({
          disabled: ""
        }).prepend(loadingTpl);
      } else {
        this.$btnElem.removeClass("layui-layer-btn-is-loading").removeAttr("disabled").find(".layui-layer-btn-loading-icon").remove();
      }
    }

    //==============公开api===================
    // 计算坐标
    offset() {
      let that = this,
        config = that.config,
        layero = that.layero;
      let area = [layero.outerWidth(), layero.outerHeight()];
      let type = typeof config.offset === "object";
      that.offsetTop = ($$1(window).height() - area[1]) / 2;
      that.offsetLeft = ($$1(window).width() - area[0]) / 2;
      if (type) {
        that.offsetTop = config.offset[0];
        that.offsetLeft = config.offset[1] || that.offsetLeft;
      } else if (config.offset !== "auto") {
        if (config.offset === "t") {
          // 上
          that.offsetTop = 0;
        } else if (config.offset === "r") {
          // 右
          that.offsetLeft = $$1(window).width() - area[0];
        } else if (config.offset === "b") {
          // 下
          that.offsetTop = $$1(window).height() - area[1];
        } else if (config.offset === "l") {
          // 左
          that.offsetLeft = 0;
        } else if (config.offset === "lt") {
          // 左上
          that.offsetTop = 0;
          that.offsetLeft = 0;
        } else if (config.offset === "lb") {
          // 左下
          that.offsetTop = $$1(window).height() - area[1];
          that.offsetLeft = 0;
        } else if (config.offset === "rt") {
          // 右上
          that.offsetTop = 0;
          that.offsetLeft = $$1(window).width() - area[0];
        } else if (config.offset === "rb") {
          // 右下
          that.offsetTop = $$1(window).height() - area[1];
          that.offsetLeft = $$1(window).width() - area[0];
        } else {
          that.offsetTop = config.offset;
        }
      }
      if (!config.fixed) {
        that.offsetTop = /%$/.test(that.offsetTop) ? $$1(window).height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
        that.offsetLeft = /%$/.test(that.offsetLeft) ? $$1(window).width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
        that.offsetTop += $$1(window).scrollTop();
        that.offsetLeft += $$1(window).scrollLeft();
      }

      // 最小化窗口时的自适应
      if (layero.data("maxminStatus") === "min") {
        that.offsetTop = $$1(window).height() - (layero.find(doms[1]).outerHeight() || 0);
        that.offsetLeft = layero.css("left");
      }

      // 设置坐标
      layero.css({
        top: that.offsetTop,
        left: that.offsetLeft
      });
    }
    offset2() {
      const {
        config,
        layero
      } = this;
      const windowHeight = $$1(window).height();
      const windowWidth = $$1(window).width();
      let offsetTop = (windowHeight - this.layeroouterHeight) / 2;
      let offsetLeft = (windowWidth - this.layeroOuterWidth) / 2;
      const applyOffset = (top, left) => {
        offsetTop = typeof top !== "undefined" ? top : offsetTop;
        offsetLeft = typeof left !== "undefined" ? left : offsetLeft;
      };

      // 检查偏移量是否为数组（自定义定位）
      if (Array.isArray(config.offset)) {
        applyOffset(config.offset[0], config.offset[1]);
      } else if (config.offset !== "auto") {
        const offsetMap = {
          t: () => applyOffset(0),
          r: () => applyOffset(undefined, windowWidth - this.layeroOuterWidth),
          b: () => applyOffset(windowHeight - this.layeroouterHeight),
          l: () => applyOffset(undefined, 0),
          lt: () => applyOffset(0, 0),
          lb: () => applyOffset(windowHeight - this.layeroouterHeight, 0),
          rt: () => applyOffset(0, windowWidth - this.layeroOuterWidth),
          rb: () => applyOffset(windowHeight - this.layeroouterHeight, windowWidth - this.layeroOuterWidth)
        };

        // 应用地图的偏移量，或使用自定义值
        if (offsetMap[config.offset]) {
          offsetMap[config.offset]();
        } else {
          offsetTop = config.offset;
        }
      }

      // 处理非固定定位并转换百分比值
      const calculateOffset = (value, dimension, scroll) => {
        return /%$/.test(value) ? dimension * parseFloat(value) / 100 + scroll : parseFloat(value);
      };
      if (!config.fixed) {
        offsetTop = calculateOffset(offsetTop, windowHeight, $$1(window).scrollTop());
        offsetLeft = calculateOffset(offsetLeft, windowWidth, $$1(window).scrollLeft());
      }

      // 处理最小化的窗口调整
      if (layero.data("maxminStatus") === "min") {
        const titleOuterHeight = layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
        offsetTop = windowHeight - titleOuterHeight;
        offsetLeft = layero.css("left");
      }

      // 设置最终的CSS定位
      layero.css({
        top: offsetTop,
        left: offsetLeft
      });
    }
  }

  class Closer {
    constructor(index, callback) {
      this.index = index;
      this.callback = callback;
      this.layero = this.getLayero();
      this.type = this.layero.attr("type");
      this.options = this.layero.data("config") || {};
      this.hideOnClose = this.options.id && this.options.hideOnClose;
    }

    // 获取层对象
    getLayero() {
      const closest = $(`.${Constants.CLASSES.layuiLayer}`).children(`#${this.index}`).closest(`.${Constants.CLASSES.layuiLayer}`);
      return closest[0] ? closest : $(`#${Constants.CLASSES.layuiLayer}${this.index}`);
    }

    // 执行关闭操作
    execute() {
      if (!this.layero[0]) return;
      if (!this.hideOnClose && typeof shared.beforeEnd[this.index] === "function") {
        Util.promiseLikeResolve(shared.beforeEnd[this.index]()).then(result => {
          if (result !== false) {
            delete shared.beforeEnd[this.index];
            this.executeClose();
          }
        }, reason => {
          reason !== undefined && window.console && window.console.error("layer error hint: " + reason);
        });
      } else {
        delete shared.beforeEnd[this.index];
        this.executeClose();
      }
    }

    // 执行关闭细节
    executeClose() {
      this.closeShade();
      this.removeLayer();
      Util.restScrollbar(this.index);
      this.callback && this.callback();
    }

    // 关闭遮罩
    closeShade() {
      let shadeo = $(`#${Constants.CLASSES.shade}${this.index}`);
      if (!this.options.isOutAnim) {
        shadeo[this.hideOnClose ? "hide" : "remove"]();
      } else {
        shadeo.css({
          opacity: 0
        });
        setTimeout(() => shadeo[this.hideOnClose ? "hide" : "remove"](), 350);
      }
    }

    // 移除层及相关事件
    removeLayer() {
      const closeAnim = {
        slideDown: Constants.CLASSES.animSlideDownOut,
        slideLeft: Constants.CLASSES.animSlideLeftOut,
        slideUp: Constants.CLASSES.animSlideUpOut,
        slideRight: Constants.CLASSES.animSlideRightOut
      }[this.options.anim] || Constants.CLASSES.animClose;
      const closeAnimfullClass = `${Constants.CLASSES.layerAnim} ${closeAnim}`;
      const remove = () => {
        if (this.hideOnClose) {
          this.layero.removeClass(closeAnimfullClass);
          return this.layero.hide();
        }

        // 页面捕获层
        if (this.type === MAP.TYPE_NAME[MAP.TYPE.PAGE] && this.layero.attr("conType") === "object") {
          this.layero.children(`:not(.${Constants.CLASSES.layerContent})`).remove();
          let wrap = this.layero.find(`.${Constants.CLASSES.layerWrap}`);
          for (let i = 0; i < 2; i++) {
            wrap.unwrap();
          }
          wrap.css("display", wrap.data("display")).removeClass(Constants.CLASSES.layerWrap);
        } else {
          // 低版本 IE 回收 iframe
          if (this.type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]) {
            try {
              let iframe = $(`#${Constants.CLASSES.layerIFrame}${this.index}`)[0];
              iframe.contentWindow.document.write("");
              iframe.contentWindow.close();
              this.layero.find(`.${Constants.CLASSES.layerContent}`)[0].removeChild(iframe);
            } catch (e) {}
          }
          this.layero[0].innerHTML = "";
          this.layero.remove();
        }
        typeof shared.end[this.index] === "function" && shared.end[this.index]();
        delete shared.end[this.index];

        // 移除 resize 事件
        if (shared.events.resize[this.index]) {
          $(window).off("resize", shared.events.resize[this.index]);
          delete shared.events.resize[this.index];
        }
      };

      // 是否允许关闭动画
      if (this.options.isOutAnim) {
        this.layero.addClass(closeAnimfullClass);
        setTimeout(() => remove(), 200);
      } else {
        remove();
      }
    }
  }

  // 默认内置方法。
  var layer$1 = {
    v: Constants.VERSION,
    //获取最新弹出层的层叠顺序
    zIndex: shared.zIndex,
    // 索引层
    index: shared.index,
    // 设置全局默认配置
    config(options = {}) {
      shared.config = $$1.extend({}, shared.config, options);
      typeof options.extend === "string" && (options.extend = [options.extend]);
      if (!options.extend) return this; //如果选项不存在extend属性，就直接return

      return this;
    },
    // 核心方法
    open(options) {
      return new Container(options, this).index;
      // return new Class(options).index;
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
        btn: shared.btn,
        yes: yes,
        btn2: cancel
      }, type ? {} : options));
    },
    msg(content, options, end) {
      // 最常用提示层
      let type = typeof options === "function";
      // 源皮肤
      let rskin = shared.config.skin;
      const skin = rskin ? `${rskin} ${rskin}-msg` : "layui-layer-msg";
      let anim = Constants.CLASSES.layerAnim5;
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
      }, type && !shared.config.skin ? {
        skin: skin + " layui-layer-hui",
        anim: anim
      } : function () {
        options = options || {};
        if (options.icon === -1 || options.icon === undefined && !shared.config.skin) {
          options.skin = skin + " " + (options.skin || "layui-layer-hui");
        }
        return options;
      }()));
    },
    style(index, options, limit) {
      let layero = Util.getLayeroByIndex(index);
      let contentElem = layero.find(`.${Constants.CLASSES.layerContent}`);
      let type = layero.attr("type");
      let titHeight = layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      let btnHeight = layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;

      // loading 和 tips 层不允许更改
      if (type === MAP.TYPE_NAME[MAP.TYPE.LOADING] || type === MAP.TYPE_NAME[MAP.TYPE.TIPS]) {
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
      btnHeight = layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;
      if (type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]) {
        layero.find("iframe").css({
          height: (typeof options.height === "number" ? options.height : layero.height()) - titHeight - btnHeight
        });
      } else {
        contentElem.css({
          height: (typeof options.height === "number" ? options.height : layero.height()) - titHeight - btnHeight - parseFloat(contentElem.css("padding-top")) - parseFloat(contentElem.css("padding-bottom"))
        });
      }
    },
    // 给层设置标题
    title(name, index) {
      const $title = $$1(`#${Constants.CLASSES.layuiLayer}${index || Layer.index}`).find(`.${Constants.CLASSES.layerTitle}`);
      $title.html(name);
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
    close(index, callback) {
      new Closer(index, callback).execute();
    },
    closeAll(type, callback) {
      let that = this;
      if (typeof type === "function") {
        callback = type;
        type = null;
      }
      let domsElem = $$1(`.${Constants.CLASSES.layuiLayer}`);
      $$1.each(domsElem, function (_index) {
        let othis = $$1(this);
        let is = type ? othis.attr("type") === type : 1;
        is && that.close(othis.attr("times"), _index === domsElem.length - 1 ? callback : null);
        is = null;
      });
      if (domsElem.length === 0) typeof callback === "function" && callback();
    },
    closeLast(type, callback) {
      const layerIndexList = [];
      const isArrayType = Array.isArray(type);
      const selector = typeof type === "string" ? `.layui-layer-${type}` : `.${Constants.CLASSES.layuiLayer}`;
      $$1(selector).each(function (i, el) {
        const layero = $$1(el);
        const isHidden = layero.css("display") === "none";
        const isInvalidType = isArrayType && !type.includes(layero.attr("type"));
        if (isHidden || isInvalidType) {
          return true; // 跳过当前循环
        }
        const layerIndex = Number(layero.attr("times"));
        layerIndexList.push(layerIndex);
      });
      if (layerIndexList.length > 0) {
        const layerIndexMax = Math.max.apply(null, layerIndexList);
        this.close(layerIndexMax, callback);
      }
    },
    // 获取子 iframe 的 DOM
    getChildFrame(selector, index) {
      index = index || $$1(`.${Constants.CLASSES.layerIFrame}`).attr("times");
      return Util.getLayeroByIndex(index).find("iframe").contents().find(selector);
    },
    // 得到当前 iframe 层的索引，子 iframe 时使用
    getFrameIndex(name) {
      return $$1("#" + name).parents(`.${Constants.CLASSES.layerIFrame}`).attr("times");
    },
    // iframe 层自适应宽高
    iframeAuto(index) {
      if (!index) return;
      let heg = this.getChildFrame("html", index).outerHeight();
      let layero = Util.getLayeroByIndex(index);

      // .layui-layer-title
      let titHeight = layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      // layui-layer-btn
      let btnHeight = layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;
      layero.css({
        height: heg + titHeight + btnHeight
      });
      layero.find("iframe").css({
        height: heg
      });
    },
    // 重置 iframe url
    iframeSrc(index, url) {
      Util.getLayeroByIndex(index).find("iframe").attr("src", url);
    },
    // 最小化
    min(index, options) {
      let layero = Util.getLayeroByIndex(index);
      let maxminStatus = layero.data(Constants.DATAKEY.MAX_MIN_STATUS);
      if (maxminStatus === "min") return; // 当前的状态是否已经是最小化
      if (maxminStatus === "max") this.restore(index); // 若当前为最大化，则先还原后再最小化

      layero.data(Constants.DATAKEY.MAX_MIN_STATUS, "min");
      options = options || layero.data("config") || {};
      let shadeo = $$1(`#${Constants.CLASSES.shade}${index}`);
      let elemMin = layero.find(".layui-layer-min");

      //.layui-layer-title
      let titHeight = layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      let minLeft = layero.attr("minLeft"); // 最小化时的横坐标
      let hasMinLeft = typeof minLeft === "string"; // 是否已经赋值过最小化坐标
      let left = hasMinLeft ? minLeft : 181 * shared.minStackIndex + "px";
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
      if (shared.minStackArr.length > 0) {
        left = shared.minStackArr[0];
        shared.minStackArr.shift();
      }

      // left 是否超出边界
      if (parseFloat(left) + minWidth > $$1(window).width()) {
        left = $$1(window).width() - minWidth - function () {
          shared.minStackArr.edgeIndex = shared.minStackArr.edgeIndex || 0;
          return shared.minStackArr.edgeIndex += 3;
        }();
        if (left < 0) left = 0;
      }

      // 是否堆叠在左下角
      if (options.minStack) {
        settings.left = left;
        settings.top = $$1(window).height() - titHeight;
        hasMinLeft || shared.minStackIndex++; // 若未赋值过最小化坐标，则最小化操作索引自增
        layero.attr("minLeft", left);
      }
      layero.attr("position", position);
      this.style(index, settings, true);
      elemMin.hide();
      // layui-layer-iframe
      layero.attr("type") === "page" && layero.find(Constants.CLASSES.layerIFrame).hide();
      Util.restScrollbar(index);

      // 隐藏遮罩
      shadeo.hide();
    },
    // 还原
    restore(index) {
      let layero = Util.getLayeroByIndex(index);
      let shadeo = Util.getShadeoByIndex(index);
      let contentElem = layero.find(`.${Constants.CLASSES.layerContent}`);
      let area = layero.attr("area").split(",");
      let type = layero.attr("type");
      let options = layero.data("config") || {};
      let contentRecordHeight = contentElem.data(Constants.DATAKEY.RECORD_HEIGHT_KEY);
      layero.removeData(Constants.DATAKEY.MAX_MIN_STATUS); // 移除最大最小状态

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
      //layui-layer-iframe
      type === "page" && layero.find(Constants.CLASSES.layerIFrame).show();

      // 恢复页面滚动条弹层打开时的状态
      options.scrollbar ? Util.restScrollbar(index) : Util.setScrollbar(index);

      // #1604
      if (contentRecordHeight !== undefined) {
        contentElem.removeData(Constants.DATAKEY.RECORD_HEIGHT_KEY);
        let contentRecordHeightElem = type === MAP.TYPE_NAME[MAP.TYPE.IFRAME] ? contentElem.children("iframe") : contentElem;
        contentRecordHeightElem.css({
          height: contentRecordHeight
        });
      }

      // 恢复遮罩
      shadeo.show();
      // shared.events.resize[index](); // ?
    },
    // 全屏（最大化）
    full(index) {
      let layero = Util.getLayeroByIndex(index);
      let maxminStatus = layero.data(Constants.DATAKEY.MAX_MIN_STATUS);
      if (maxminStatus === "max") return; // 检查当前的状态是否已经是最大化
      if (maxminStatus === "min") this.restore(index); // 若当前为最小化，则先还原后再最大化

      layero.data(Constants.DATAKEY.MAX_MIN_STATUS, "max");
      Util.record(layero); // 记录当前尺寸、坐标

      if (!$$1("html").attr("layer-full")) {
        Util.setScrollbar(index);
      }
      setTimeout(() => {
        let isfix = layero.css("position") === "fixed";
        this.style(index, {
          top: isfix ? 0 : $$1(window).scrollTop(),
          left: isfix ? 0 : $$1(window).scrollLeft(),
          width: "100%",
          height: "100%"
        }, true);
        layero.find(".layui-layer-min").hide();
      }, 100);
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
        skin: "layui-layer-prompt" + Util.skin("prompt", shared.config),
        maxWidth: $$1(window).width(),
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
    // 窗口置顶
    setTop(layero) {
      shared.zIndex = parseInt(layero[0].style.zIndex);
      layero.on("mousedown", function () {
        shared.zIndex++;
        layero.css("z-index", shared.zIndex + 1);
      });
      return shared.zIndex;
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
        skin: "layui-layer-tab" + Util.skin("tab", shared.config),
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
      let _that = this;
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
              _that.close(index);
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
        _that.close(dict.loadi);
        let alt = data[start].alt || "";

        // 切换图片时不出现动画
        if (key) options.anim = -1;

        // 弹出图片层
        dict.index = _that.open($$1.extend({
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
          skin: "layui-layer-photos" + Util.skin("photos", shared.config),
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
