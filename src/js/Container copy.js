import $ from "jquery";
import Constants from "./constants/index";
import Util from "./util";
// import { closeAll } from "./methods/index";
// import closeAll from "./util/closeAll";
// import style from "./util/style";
// import close from "./util/close";

import { shared } from "./shared";

import HTMLGenerator from "./HTMLGenerator";
import TipsLocation from "./TipsLocation";

class Container {
  //成员变量
  config = {
    // 最大宽度
    maxWidth: $(window).width() - 15 * 2, // 初始最大宽度：当前屏幕宽，左右留 15px 边距,
  };
  // 弹层dom的jq对象
  layero;
  // 遮罩层jq对象
  shadeo;
  // 弹层的外部宽度(包括填充、边框和可选边距)
  layeroOuterWidth;
  // 外部高度
  layeroouterHeight;

  

  constructor(options, layer) {
    ++shared.index;

    // layer对象
    this.layer = layer;
    // 合并配置
    this.config = $.extend({}, Constants.DEFAULTS, shared.config, options);
    // body是否准备完毕,完毕直接调用，没有就延迟30毫秒
    this.initContainer();
  }

  // 设置动画
  setAnim(layero) {
    // anim 兼容旧版 shift
    if (this.config.shift) {
      this.config.anim = this.config.shift;
    }

    const animMap = {
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
      slideRight: "layer-anim-slide-right",
    };
    const anim = animMap[this.config.anim];
    if (!anim) return;

    // 为兼容 jQuery3.0 的 css 动画影响元素尺寸计算
    let animClass = `${Constants.CLASSES.layerAnim} ${anim}`;
    layero
      .addClass(animClass)
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $(this).removeClass(animClass);
        }
      );
  }

  // 设置弹出框的高度和宽度(弹出框的位置)
  auto() {
    if (this.config.area[0] === "" && this.config.maxWidth > 0) {
      this.layeroOuterWidth > this.config.maxWidth &&
        this.layero.width(this.config.maxWidth);
    }

    const layeroInnerHeight = this.layero.innerHeight();

    if (this.config.type === Constants.TYPE.IFRAME) {
      this.setHeight("iframe");
    } else {
      if (this.config.area[1] === "") {
        if (
          this.config.maxHeight > 0 &&
          this.layero.outerHeight() > this.config.maxHeight
        ) {
          layeroInnerHeight = this.config.maxHeight;
          this.setHeight(`.${Constants.CLASSES.layerContent}`);
        } else if (
          this.config.fixed &&
          layeroInnerHeight >= $(window).height()
        ) {
          layeroInnerHeight = $(window).height();
          this.setHeight(`.${Constants.CLASSES.layerContent}`);
        }
      } else {
        this.setHeight(`.${Constants.CLASSES.layerContent}`);
      }
    }
  }

  setHeight(selector) {
    //标题的高度
    const titHeight =
      this.layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
    // 按钮的高度
    const btnHeight =
      this.layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;

    const elem = this.layero.find(selector);

    const elempaddingTop = parseFloat(elem.css("padding-top")) | 0;

    elem.height(
      this.layero.innerHeight() - titHeight - btnHeight - 2 * elempaddingTop
    );
  }

  // 根据不同的弹出层类型处理一些设置
  adjustLayerSettings() {
    const typeMap = {
      // dialog
      [Constants.TYPE.DIALOG]: () => {
        this.config.btn = "btn" in this.config ? this.config.btn : shared.btn[0];
        closeAll("dialog");
      },
      // iframe
      [Constants.TYPE.IFRAME]: () => {
        // console.log("www");
        // 转换成数组
        this.config.content = Array.isArray(this.config.content)
          ? this.config.content
          : [this.config.content || "", "auto"];

        //重新赋值的操作

        // layui-layer-iframe
        this.config.content = Util.sprintf(
          Constants.HTML.iframe,
          this.config.content[1] || "auto",
          Constants.CLASSES.layerIFrame,
          Constants.CLASSES.layerIFrame,
          this.config.content[0]
        );
      },
      // loading
      [Constants.TYPE.LOADING]: () => {
        delete this.config.title;
        delete this.config.closeBtn;
        this.config.icon === -1 && this.config.icon === 0;
        closeAll("loading");
      },
      // tips
      [Constants.TYPE.TIPS]: () => {
        this.config.content = Array.isArray(this.config.content)
          ? this.config.content
          : [this.config.content, "body"];

        this.config.follow = this.config.content[1];
        this.config.content = `${this.config.content[0]}${Constants.HTML.tipsG}`;
        delete this.config.title;
        this.config.tips = Array.isArray(this.config.tips)
          ? this.config.tips
          : [this.config.tips, true];
        //是否允许同时存在多个 tips 层，即不销毁上一个 tips
        this.config.tipsMore || closeAll("tips");
      },
    };

    // 调用switch
    typeMap[this.config.type] && typeMap[this.config.type]();
  }

  // 初始化area属性
  initAreaOption() {
    // 初始化 area 属性
    if (typeof this.config.area === "string") {
      this.config.area =
        this.config.area === "auto" ? ["", ""] : [this.config.area, ""];
    }
  }

  //创建容器
  initContainer() {
    // 若 id 对应的弹层已经存在，则不重新创建 layui-layer
    if (
      this.config.id &&
      $(`.${Constants.CLASSES.layuiLayer}`).find(`#${this.config.id}`)[0]
    ) {
      console.log("没有创建");
    }

    // 是否移除活动元素的焦点
    if (this.config.removeFocus && document.activeElement) {
      document.activeElement.blur(); // 将原始的聚焦节点失焦
    }

    this.initAreaOption();

    this.adjustLayerSettings();

    // 使用类来生成字符串
    const htmlGenerator = new HTMLGenerator(this.config);
    const html = htmlGenerator.getContainerHTML();

    const $moveEl2 = $(
      `<div class="${Constants.CLASSES.move}" id="${Constants.CLASSES.move}"></div>`
    );

    // 加入遮罩层
    $("body").append(htmlGenerator.getShadeHTML());

    // 判断content选项是对象
    if (typeof this.config.content === "object") {
      if (
        this.config.type == Constants.TYPE.IFRAME ||
        this.config.type == Constants.TYPE.TIPS
      ) {
        $("body").append(html);
      } else {
        //layui-layer
        if (!this.content.parents(`.${Constants.CLASSES.layuiLayer}`)[0]) {
          this.content
            .data("display", this.content.css("display"))
            .show()
            .addClass("layui-layer-wrap")
            .wrap(html);

          $(`#${Constants.CLASSES.layuiLayer}${shared.index}`)
            .find(`.${Constants.CLASSES.layerContent}`)
            .before(titleHTML);
        }
      }
    } else {
      $("body").append(html);
    }

    shared.moveElem = $moveEl2;
    $(`#${Constants.CLASSES.move}`)[0] || $("body").append($moveEl2);

    // 保存为成员变量,方便后续使用
    this.layero = Util.getLayeroByIndex(shared.index);
    this.shadeo = Util.getShadeoByIndex(shared.index);

    this.layeroOuterWidth = this.layero.outerWidth();
    this.layeroouterHeight = this.layero.outerHeight();

    this.config.scrollbar || Util.setScrollbar(shared.index);

    // 设置弹出框的高度
    this.auto();

    //遮罩
    this.shadeoHandle();

    if (this.config.type == Constants.TYPE.TIPS) {
      //tips层，调用tips的方法
      this.tips();
    } else {
      // 坐标自适应浏览器窗口尺寸
      this.offset();

      // 获取拖拽层的元素堆叠索引
      const movezIndex = parseInt(
        Util.getStyle(
          document.getElementById(Constants.CLASSES.move),
          "z-index"
        )
      );

      if (!movezIndex) {
        this.layero
          .css("visibility", "hidden")
          .offset()
          .css("visibility", "visible");
      }
    }

    console.log(this.config);

    //若是固定定位，则跟随 resize 事件来自适应坐标
    if (this.config.fixed) {
      if (!shared.events.resize[shared.index]) {
        //如果当前实例对应的resize事件没有设置

        shared.events.resize[shared.index] = () => {
          this.resize();
        };

        // 此处 resize 事件不会一直叠加，当关闭弹层时会移除该事件
        $(window).on("resize", shared.events.resize[shared.index]);
      }
    }

    this.config.time <= 0 ||
      setTimeout(function () {
        close(shared.index);
      }, this.config.time);

    // 拖拽处理
    this.move();

    // 事件绑定
    this.bindingEvent();

    // 设置动画
    this.setAnim(this.layero);

    // 记录配置信息
    this.layero.data("config", this.config);
  }

  resize() {
    // 调用 offset 方法
    this.offset();

    // 判断 area 是否为百分比格式，如果是则调用 auto 方法
    const isPercentage = this.config.area.some((area) => /^\d+%$/.test(area));
    if (isPercentage) this.auto(shared.index);

    // 如果类型为 4，调用 tips 方法
    if (this.config.type === Constants.TYPE.TIPS) this.tips();
  }

  bindingEvent() {
    // 置顶当前窗口
    shared.zIndex = this.config.zIndex;
    this.openSuccessCallback();
    // 按钮
    this.btnCallback();
  }

  btnLoading(btnElem, isLoading) {
    if (isLoading) {
      let loadingTpl =
        '<i class="layui-layer-btn-loading-icon layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';
      if (btnElem.find(".layui-layer-btn-loading-icon")[0]) return;
      btnElem
        .addClass("layui-layer-btn-is-loading")
        .attr({ disabled: "" })
        .prepend(loadingTpl);
    } else {
      btnElem
        .removeClass("layui-layer-btn-is-loading")
        .removeAttr("disabled")
        .find(".layui-layer-btn-loading-icon")
        .remove();
    }
  }

  // 异步按钮处理
  btnAsyncHandle(btnElem) {
    let index = btnElem.index();

    let btnCallback =
      index === 0
        ? this.config.yes || this.config["btn1"]
        : this.config[`${btn}${index + 1}`];

    this.btnLoading(btnElem, isLoading);

    //如果有设置回调
    if (btnCallback) {
      Util.promiseLikeResolve(
        btnCallback.call(this.config, shared.index, this.layero, this)
      ).then(
        function (result) {
          if (result !== false) {
            close(shared.index);
          }
        },
        function (reason) {
          reason !== undefined &&
            window.console &&
            window.console.error("layer error hint: " + reason);
        }
      );
    } else {
      close(shared.index);
    }
  }

  // 普通按钮处理
  normalButtonHandle(btnElem) {
    let index = btnElem.index();

    console.log(index);

    // 普通按钮
    if (index === 0) {
      if (this.config.yes) {
        this.config.yes(shared.index, this.layero, this);
      } else if (this.config["btn1"]) {
        console.log("难道进入这里了?");

        this.config["btn1"](shared.index, this.layero, this);
      } else {
        close(shared.index);
      }
    } else {
      console.log(this.config);

      if (
        this.config[`btn${index + 1}`] &&
        this.config[`btn${index + 1}`](shared.index, this.layero, this)
      ) {
        close(shared.index);
      }
    }
  }

  btnCallback() {
    let that = this;

    this.layero
      .find(`.${Constants.CLASSES.layerBtn}`)
      .children("a")
      .on("click", function () {
        let btnElem = $(this);
        if (btnElem.attr("disabled")) return; // 如果禁止点击则直接返回
        // 若为异步按钮
        if (that.config.btnAsync) {
          that.btnAsyncHandle(btnElem);
        } else {
          that.normalButtonHandle(btnElem);
        }
      });
  }

  openSuccessCallback() {
    if (this.config.success) {
      //打开弹层成功后的回调函数
      if (this.config.type == 2) {
        this.layero.find("iframe").on("load", () => {
          this.config.success(this.layero, shared.index, this);
        });
      } else {
        this.config.success(this.layero, shared.index, this);
      }
    }
  }

  // 拖拽层
  move() {
    console.log("move");

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
      let othis = $(this);
      let dict = {};

      console.log("mousedown");

      if (that.config.move) {
        dict.layero = that.layero;
        dict.config = that.config;
        dict.offset = [
          event.clientX - parseFloat(that.layero.css("left")),
          event.clientY - parseFloat(that.layero.css("top")),
        ];

        othis.data(DATA_NAME[0], dict);
        // 把拖拽元素的实例绑定到eventMoveElem
        shared.eventMoveElem = othis;
        shared.moveElem.css("cursor", "move").show();
      }

      event.preventDefault();
    });

    // 按下右下角拉伸
    resizeElem.on("mousedown", function (event) {
      let othis = $(this);
      let dict = {};

      if (that.config.resize) {
        dict.layero = that.layero;
        dict.config = that.config;
        dict.offset = [event.clientX, event.clientY];
        dict.index = shared.index;
        dict.area = [that.layeroOuterWidth, that.layeroouterHeight];

        othis.data(DATA_NAME[1], dict);
        shared.eventResizeElem = othis;
        shared.moveElem.css("cursor", "se-resize").show();
      }

      event.preventDefault();
    });

    // 拖动元素，避免多次调用实例造成事件叠加
    if (shared.docEvent) return;
    $(document).on("mousemove", function (event) {
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

        dict.stX = fixed ? 0 : $(window).scrollLeft();
        dict.stY = fixed ? 0 : $(window).scrollTop();
        // 控制元素不被拖出窗口外
        if (!config.moveOut) {
          let setRig = $(window).width() - layero.outerWidth() + dict.stX;
          let setBot = $(window).height() - layero.outerHeight() + dict.stY;
          X < dict.stX && (X = dict.stX);
          X > setRig && (X = setRig);
          Y < dict.stY && (Y = dict.stY);
          Y > setBot && (Y = setBot);
        }
        // 拖动时跟随鼠标位置
        layero.css({
          left: X,
          top: Y,
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
        style(dict.index, {
          width: dict.area[0] + X,
          height: dict.area[1] + Y,
        });

        config.resizing && config.resizing(dict.layero);
      }
    });

    // 左键放开
    $(document).on("mouseup", function () {
      if (shared.eventMoveElem) {
        let dict = shared.eventMoveElem.data(DATA_NAME[0]) || {};
        let config = dict.config;

        shared.eventMoveElem.removeData(DATA_NAME[0]);
        delete shared.eventMoveElem;
        shared.moveElem.hide();
        config.moveEnd && config.moveEnd(dict.layero);
      }
      if (shared.eventResizeElem) {
        shared.eventResizeElem.removeData(DATA_NAME[1]);
        delete shared.eventResizeElem;
        shared.moveElem.hide();
      }
    });

    shared.docEvent = true; // 已给 document 执行全局事件
  }

  // 计算坐标
  offset() {
    const { config, layero } = this;
    const windowHeight = $(window).height();
    const windowWidth = $(window).width();
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
        rb: () =>
          applyOffset(
            windowHeight - this.layeroouterHeight,
            windowWidth - this.layeroOuterWidth
          ),
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
      return /%$/.test(value)
        ? (dimension * parseFloat(value)) / 100 + scroll
        : parseFloat(value);
    };

    if (!config.fixed) {
      offsetTop = calculateOffset(
        offsetTop,
        windowHeight,
        $(window).scrollTop()
      );
      offsetLeft = calculateOffset(
        offsetLeft,
        windowWidth,
        $(window).scrollLeft()
      );
    }

    // 处理最小化的窗口调整
    if (layero.data("maxminStatus") === "min") {
      const titleOuterHeight =
        layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      offsetTop = windowHeight - titleOuterHeight;
      offsetLeft = layero.css("left");
    }

    // 设置最终的CSS定位
    layero.css({
      top: offsetTop,
      left: offsetLeft,
    });
  }

  tips() {
    const follow = $(this.config.follow)[0] ? $(this.config.follow) : $("body");

    //follow, config, layero
    const tipsLocation = new TipsLocation(follow, this.config, this.layero);

    tipsLocation.setupArrowPosition();

    // 调整溢流或屏幕边缘情况
    tipsLocation.overflowAdjustment();

    // 更新位置
    tipsLocation.updatePosition();

    // 更新内容的样式
    this.layero.find(`.${Constants.CLASSES.layerContent}`).css({
      "background-color": this.config.tips[1],
      "padding-right": this.config.closeBtn ? "30px" : "",
    });
  }

  // 遮罩处理
  shadeoHandle() {
    // 遮罩
    this.shadeo.css({
      "background-color": this.config.shade[1] || "#000",
      opacity: this.config.shade[0] || this.config.shade,
      transition: this.config.shade[2] || "",
    });
    this.shadeo.data(
      Constants.DATAKEY.SHADE_KEY,
      this.config.shade[0] || this.config.shade
    );
  }
}

// export default Container;
export default Container;
