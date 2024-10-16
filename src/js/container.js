import $ from "jquery";
import { shared } from "./shared";
import Constants, { MAP } from "./constants/index";
import Util from "./util";
import HTMLGenerator from "./HTMLGenerator";
import TipsLocation from "./TipsLocation";
import EventBinder from "./EventBinder";

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
    this.config = $.extend(
      {},
      Constants.DEFAULTS,
      shared.config,
      { maxWidth: $(window).width() - 15 * 2 },
      options
    );

    // body是否准备完毕,完毕直接调用，没有就延迟30毫秒
    this.initContainer();
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
    const htmlGenerator = new HTMLGenerator(this.config, this.index);
    const html = htmlGenerator.getContainerHTML();

    // 加入遮罩层
    $("body").append(htmlGenerator.getShadeHTML());

    console.log(this.config.content);

    // 判断content选项是对象
    if (typeof this.config.content === "object") {
      if (
        this.config.type == MAP.TYPE.IFRAME ||
        this.config.type == MAP.TYPE.TIPS
      ) {
        $("body").append(html);
      } else {
        if (
          !this.config.content.parents(`.${Constants.CLASSES.layuiLayer}`)[0]
        ) {
          this.config.content
            .data("display", this.config.content.css("display"))
            .show()
            .addClass(Constants.CLASSES.layerWrap)
            .wrap(html);

          $(`#${Constants.CLASSES.layuiLayer}${this.index}`)
            .find(`.${Constants.CLASSES.layerContent}`)
            .before(htmlGenerator.getTtitleHTML());
        }
      }
    } else {
      $("body").append(html);
    }

    this.$moveEl = $(
      Util.sprintf(
        Constants.HTML.move,
        Constants.CLASSES.move,
        Constants.CLASSES.move
      )
    );
    $(`#${Constants.CLASSES.move}`)[0] || $("body").append(this.$moveEl);

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

    //若是固定定位，则跟随 resize 事件来自适应坐标
    if (this.config.fixed) {
      if (!shared.events.resize[this.index]) {
        //如果当前实例对应的resize事件没有设置

        shared.events.resize[this.index] = () => {
          // 调用 offset 方法
          this.offset();

          // 判断 area 是否为百分比格式，如果是则调用 auto 方法
          const isPercentage = this.config.area.some((area) =>
            /^\d+%$/.test(area)
          );
          if (isPercentage) this.auto(this.index);

          // 如果类型为 4，调用 tips 方法
          if (this.config.type === MAP.TYPE.TIPS) this.tips();
        };

        // 此处 resize 事件不会一直叠加，当关闭弹层时会移除该事件
        $(window).on("resize", shared.events.resize[this.index]);
      }
    }

    this.config.time <= 0 ||
      setTimeout(() => {
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
      slideRight: Constants.CLASSES.animSlideRight,
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
      this.layeroOuterWidth > this.config.maxWidth &&
        this.layero.width(this.config.maxWidth);
    }

    const layeroInnerHeight = this.layero.innerHeight();

    if (this.config.type === MAP.TYPE.IFRAME) {
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
      [MAP.TYPE.DIALOG]: () => {
        this.config.btn =
          "btn" in this.config ? this.config.btn : shared.btn[0];
        this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.DIALOG]);
      },
      // iframe
      [MAP.TYPE.IFRAME]: () => {
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
      [MAP.TYPE.LOADING]: () => {
        delete this.config.title;
        delete this.config.closeBtn;
        this.config.icon === -1 && this.config.icon === 0;
        this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.LOADING]);
      },
      // tips
      [MAP.TYPE.TIPS]: () => {
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
        this.config.tipsMore ||
          this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.TIPS]);
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

        that.$moveEl.css("cursor", "move").show();
      }

      event.preventDefault();
    });

    // 按下右下角拉伸
    resizeElem.on("mousedown", function (event) {
      const $this = $(this);

      if (that.config.resize) {
        // 把数据绑定到拖动元素上
        $this.data(DATA_NAME[1], {
          layero: that.layero,
          config: that.config,
          offset: [event.clientX, event.clientY],
          index: that.index,
          area: [that.layeroOuterWidth, that.layeroouterHeight],
        });
        shared.eventResizeElem = $this;

        that.$moveEl.css("cursor", "se-resize").show();
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
        that.layer.style(dict.index, {
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
    const follow = $(this.config.follow)[0] ? $(this.config.follow) : $("body");

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

  // 给按钮前方添加loading效果
  loading(isLoading) {
    if (isLoading) {
      let loadingTpl =
        '<i class="layui-layer-btn-loading-icon layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';
      if (this.$btnElem.find(".layui-layer-btn-loading-icon")[0]) return;
      this.$btnElem
        .addClass("layui-layer-btn-is-loading")
        .attr({ disabled: "" })
        .prepend(loadingTpl);
    } else {
      this.$btnElem
        .removeClass("layui-layer-btn-is-loading")
        .removeAttr("disabled")
        .find(".layui-layer-btn-loading-icon")
        .remove();
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
    that.offsetTop = ($(window).height() - area[1]) / 2;
    that.offsetLeft = ($(window).width() - area[0]) / 2;

    if (type) {
      that.offsetTop = config.offset[0];
      that.offsetLeft = config.offset[1] || that.offsetLeft;
    } else if (config.offset !== "auto") {
      if (config.offset === "t") {
        // 上
        that.offsetTop = 0;
      } else if (config.offset === "r") {
        // 右
        that.offsetLeft = $(window).width() - area[0];
      } else if (config.offset === "b") {
        // 下
        that.offsetTop = $(window).height() - area[1];
      } else if (config.offset === "l") {
        // 左
        that.offsetLeft = 0;
      } else if (config.offset === "lt") {
        // 左上
        that.offsetTop = 0;
        that.offsetLeft = 0;
      } else if (config.offset === "lb") {
        // 左下
        that.offsetTop = $(window).height() - area[1];
        that.offsetLeft = 0;
      } else if (config.offset === "rt") {
        // 右上
        that.offsetTop = 0;
        that.offsetLeft = $(window).width() - area[0];
      } else if (config.offset === "rb") {
        // 右下
        that.offsetTop = $(window).height() - area[1];
        that.offsetLeft = $(window).width() - area[0];
      } else {
        that.offsetTop = config.offset;
      }
    }

    if (!config.fixed) {
      that.offsetTop = /%$/.test(that.offsetTop)
        ? ($(window).height() * parseFloat(that.offsetTop)) / 100
        : parseFloat(that.offsetTop);
      that.offsetLeft = /%$/.test(that.offsetLeft)
        ? ($(window).width() * parseFloat(that.offsetLeft)) / 100
        : parseFloat(that.offsetLeft);
      that.offsetTop += $(window).scrollTop();
      that.offsetLeft += $(window).scrollLeft();
    }

    // 最小化窗口时的自适应
    if (layero.data("maxminStatus") === "min") {
      that.offsetTop =
        $(window).height() - (layero.find(doms[1]).outerHeight() || 0);
      that.offsetLeft = layero.css("left");
    }

    // 设置坐标
    layero.css({
      top: that.offsetTop,
      left: that.offsetLeft,
    });
  }
}

// export default Container;
export default Container;
