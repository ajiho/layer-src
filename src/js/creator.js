import { doms, win, ready, CONSTANTS } from "./constants";
import Util, { detectIE } from "./util";

const Class = function (setings) {
  console.log(setings);

  let that = this,
    creat = function () {
      that.creat();
    };
  that.index = ++layer.index;
  that.config.maxWidth = $(win).width() - 15 * 2; // 初始最大宽度：当前屏幕宽，左右留 15px 边距
  that.config = $.extend({}, that.config, ready.config, setings);
  document.body
    ? creat()
    : setTimeout(function () {
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
  time: 0, // 0 表示不自动关闭
  zIndex: 19891014,
  maxWidth: 360,
  anim: 0,
  isOutAnim: true, // 退出动画
  minStack: true, // 最小化堆叠
  moveType: 1,
  resize: true,
  scrollbar: true, // 是否允许浏览器滚动条
  tips: 2,
};

// 容器
Class.pt.vessel = function (conType, callback) {
  let that = this,
    times = that.index,
    config = that.config;
  let zIndex = config.zIndex + times,
    titype = typeof config.title === "object";
  let ismax = config.maxmin && (config.type === 1 || config.type === 2);
  let titleHTML = config.title
    ? '<div class="layui-layer-title" style="' +
      (titype ? config.title[1] : "") +
      '">' +
      (titype ? config.title[0] : config.title) +
      "</div>"
    : "";

  config.zIndex = zIndex;
  callback(
    [
      // 遮罩
      config.shade
        ? '<div class="' +
          doms.SHADE +
          '" id="' +
          doms.SHADE +
          times +
          '" times="' +
          times +
          '" style="' +
          ("z-index:" + (zIndex - 1) + "; ") +
          '"></div>'
        : "",

      // 主体
      '<div class="' +
        doms[0] +
        (" layui-layer-" + ready.type[config.type]) +
        ((config.type == 0 || config.type == 2) && !config.shade
          ? " layui-layer-border"
          : "") +
        " " +
        (config.skin || "") +
        '" id="' +
        doms[0] +
        times +
        '" type="' +
        ready.type[config.type] +
        '" times="' +
        times +
        '" showtime="' +
        config.time +
        '" conType="' +
        (conType ? "object" : "string") +
        '" style="z-index: ' +
        zIndex +
        "; width:" +
        config.area[0] +
        ";height:" +
        config.area[1] +
        ";position:" +
        (config.fixed ? "fixed;" : "absolute;") +
        '">' +
        (conType && config.type != 2 ? "" : titleHTML) +
        // 内容区
        "<div" +
        (config.id ? ' id="' + config.id + '"' : "") +
        ' class="layui-layer-content' +
        (config.type == 0 && config.icon !== -1 ? " layui-layer-padding" : "") +
        (config.type == 3 ? " layui-layer-loading" + config.icon : "") +
        '">' +
        // 表情或图标
        (function () {
          let face = [
            "layui-icon-tips",
            "layui-icon-success",
            "layui-icon-error",
            "layui-icon-question",
            "layui-icon-lock",
            "layui-icon-face-cry",
            "layui-icon-face-smile",
          ];

          let additFaceClass;

          // 动画类
          let animClass = "layui-anim layui-anim-rotate layui-anim-loop";

          // 信息框表情
          if (config.type == 0 && config.icon !== -1) {
            // 加载（加载图标）
            if (config.icon == 16) {
              additFaceClass = "layui-icon layui-icon-loading " + animClass;
            }
            return (
              '<i class="layui-layer-face layui-icon ' +
              (additFaceClass || face[config.icon] || face[0]) +
              '"></i>'
            );
          }

          // 加载层图标
          if (config.type == 3) {
            let type = ["layui-icon-loading", "layui-icon-loading-1"];
            // 风格 2
            if (config.icon == 2) {
              return (
                '<div class="layui-layer-loading-2 ' + animClass + '"></div>'
              );
            }
            return (
              '<i class="layui-layer-loading-icon layui-icon ' +
              (type[config.icon] || type[0]) +
              " " +
              animClass +
              '"></i>'
            );
          }

          return "";
        })() +
        (config.type == 1 && conType ? "" : config.content || "") +
        "</div>" +
        // 右上角按钮
        '<div class="layui-layer-setwin">' +
        (function () {
          let arr = [];

          // 最小化、最大化
          if (ismax) {
            arr.push('<span class="layui-layer-min"></span>');
            arr.push('<span class="layui-layer-max"></span>');
          }

          // 关闭按钮
          if (config.closeBtn) {
            arr.push(
              '<span class="layui-icon layui-icon-close ' +
                [
                  doms[7],
                  doms[7] +
                    (config.title
                      ? config.closeBtn
                      : config.type == 4
                      ? "1"
                      : "2"),
                ].join(" ") +
                '"></span>'
            );
          }

          return arr.join("");
        })() +
        "</div>" +
        // 底部按钮
        (config.btn
          ? (function () {
              let button = "";
              typeof config.btn === "string" && (config.btn = [config.btn]);
              for (let i = 0, len = config.btn.length; i < len; i++) {
                button +=
                  '<a class="' +
                  doms[6] +
                  "" +
                  i +
                  '">' +
                  config.btn[i] +
                  "</a>";
              }
              return (
                '<div class="' +
                (function () {
                  let className = [doms[6]];
                  if (config.btnAlign)
                    className.push(doms[6] + "-" + config.btnAlign);
                  return className.join(" ");
                })() +
                '">' +
                button +
                "</div>"
              );
            })()
          : "") +
        (config.resize ? '<span class="layui-layer-resize"></span>' : "") +
        "</div>",
    ],
    titleHTML,
    $('<div class="' + doms.MOVE + '" id="' + doms.MOVE + '"></div>')
  );
  return that;
};

// 创建骨架
Class.pt.creat = function () {
  let that = this;
  let config = that.config;
  let times = that.index,
    nodeIndex;
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
      layero
        .addClass(animClass)
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $(this).removeClass(animClass);
          }
        );
    }
  };

  // 若 id 对应的弹层已经存在，则不重新创建
  if (config.id && $("." + doms[0]).find("#" + config.id)[0]) {
    return (function () {
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
          elemShade.css({ opacity: elemShade.data(CONSTANTS.SHADE_KEY) });
        }, 10);
      }
    })();
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
      let content = (config.content = conType
        ? config.content
        : [config.content || "", "auto"]);
      config.content =
        '<iframe scrolling="' +
        (config.content[1] || "auto") +
        '" allowtransparency="true" id="' +
        doms[4] +
        "" +
        times +
        '" name="' +
        doms[4] +
        "" +
        times +
        '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' +
        config.content[0] +
        '"></iframe>';
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
      config.tips =
        typeof config.tips === "object" ? config.tips : [config.tips, true];
      config.tipsMore || layer.closeAll("tips");
      break;
  }

  // 建立容器
  that
    .vessel(conType, function (html, titleHTML, moveElem) {
      body.append(html[0]);
      conType
        ? (function () {
            config.type == 2 || config.type == 4
              ? (function () {
                  $("body").append(html[1]);
                })()
              : (function () {
                  if (!content.parents("." + doms[0])[0]) {
                    content
                      .data("display", content.css("display"))
                      .show()
                      .addClass("layui-layer-wrap")
                      .wrap(html[1]);
                    $("#" + doms[0] + times)
                      .find("." + doms[5])
                      .before(titleHTML);
                  }
                })();
          })()
        : body.append(html[1]);
      $("#" + doms.MOVE)[0] || body.append((ready.moveElem = moveElem));

      that.layero = $("#" + doms[0] + times);
      that.shadeo = $("#" + doms.SHADE + times);

      config.scrollbar || Util.setScrollbar(times);
    })
    .auto(times);

  // 遮罩
  that.shadeo.css({
    "background-color": config.shade[1] || "#000",
    opacity: config.shade[0] || config.shade,
    transition: config.shade[2] || "",
  });
  that.shadeo.data(CONSTANTS.SHADE_KEY, config.shade[0] || config.shade);

  config.type == 2 &&
    layer.ie == 6 &&
    that.layero.find("iframe").attr("src", content[0]);

  console.log(config.type);

  if (config.type == 4) {
    //tips层，调用tips的方法
    that.tips();
  } else {
    // 坐标自适应浏览器窗口尺寸
    that.offset();
    const zIndex = parseInt(
      Util.getStyle(document.getElementById(doms.MOVE), "z-index")
    );

    if (!zIndex) {
      that.layero
        .css("visibility", "hidden")
        .offset()
        .css("visibility", "visible");
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

  config.time <= 0 ||
    setTimeout(function () {
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
  (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) &&
    that.auto(that.index);
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
    elem.height(
      area[1] -
        titHeight -
        btnHeight -
        2 * (parseFloat(elem.css("padding-top")) | 0)
    );
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
    that.offsetTop = /%$/.test(that.offsetTop)
      ? (win.height() * parseFloat(that.offsetTop)) / 100
      : parseFloat(that.offsetTop);
    that.offsetLeft = /%$/.test(that.offsetLeft)
      ? (win.width() * parseFloat(that.offsetLeft)) / 100
      : parseFloat(that.offsetLeft);
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
    left: that.offsetLeft,
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
      left: follow.offset().left,
    },
    tipsG = layero.find(".layui-layer-TipsG");

  let guide = config.tips[0];
  config.tips[1] || tipsG.remove();

  goal.autoLeft = function () {
    if (goal.left + layArea[0] - win.width() > 0) {
      goal.tipLeft = goal.left + goal.width - layArea[0];
      tipsG.css({ right: 12, left: "auto" });
    } else {
      goal.tipLeft = goal.left;
    }
  };

  // 辨别 tips 的方位
  // 21 为箭头大小 8*2 + 箭头相对父元素的top偏移 5
  goal.where = [
    function () {
      // 上
      goal.autoLeft();
      goal.tipTop = goal.top - layArea[1] - 10;
      tipsG
        .removeClass("layui-layer-TipsB")
        .addClass("layui-layer-TipsT")
        .css("border-right-color", config.tips[1]);
    },
    function () {
      // 右
      goal.tipLeft = goal.left + goal.width + 10;
      goal.tipTop =
        goal.top - (goal.height * 0.75 < 21 ? 21 - goal.height * 0.5 : 0);
      goal.tipTop = Math.max(goal.tipTop, 0);
      tipsG
        .removeClass("layui-layer-TipsL")
        .addClass("layui-layer-TipsR")
        .css("border-bottom-color", config.tips[1]);
    },
    function () {
      // 下
      goal.autoLeft();
      goal.tipTop = goal.top + goal.height + 10;
      tipsG
        .removeClass("layui-layer-TipsT")
        .addClass("layui-layer-TipsB")
        .css("border-right-color", config.tips[1]);
    },
    function () {
      // 左
      goal.tipLeft = goal.left - layArea[0] - 10;
      goal.tipTop =
        goal.top - (goal.height * 0.75 < 21 ? 21 - goal.height * 0.5 : 0);
      goal.tipTop = Math.max(goal.tipTop, 0);
      tipsG
        .removeClass("layui-layer-TipsR")
        .addClass("layui-layer-TipsL")
        .css("border-bottom-color", config.tips[1]);
    },
  ];
  goal.where[guide - 1]();

  /* 8*2为小三角形占据的空间 */
  if (guide === 1) {
    goal.top - (win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
  } else if (guide === 2) {
    win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 ||
      goal.where[3]();
  } else if (guide === 3) {
    goal.top -
      win.scrollTop() +
      goal.height +
      layArea[1] +
      8 * 2 -
      win.height() >
      0 && goal.where[0]();
  } else if (guide === 4) {
    layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]();
  }

  layero.find("." + doms[5]).css({
    "background-color": config.tips[1],
    "padding-right": config.closeBtn ? "30px" : "",
  });
  layero.css({
    left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0),
    top: goal.tipTop - (config.fixed ? win.scrollTop() : 0),
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
      dict.offset = [
        e.clientX - parseFloat(layero.css("left")),
        e.clientY - parseFloat(layero.css("top")),
      ];

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
  _DOC
    .on("mousemove", function (e) {
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
          top: Y,
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
          height: dict.area[1] + Y,
        });

        config.resizing && config.resizing(dict.layero);
      }
    })
    .on("mouseup", function (e) {
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
  layero
    .find("." + doms[6])
    .children("a")
    .on("click", function () {
      let btnElem = $(this);
      let index = btnElem.index();
      if (btnElem.attr("disabled")) return;

      // 若为异步按钮
      if (config.btnAsync) {
        let btnCallback =
          index === 0
            ? config.yes || config["btn1"]
            : config["btn" + (index + 1)];
        that.loading = function (isLoading) {
          that.btnLoading(btnElem, isLoading);
        };

        if (btnCallback) {
          Util.promiseLikeResolve(
            btnCallback.call(config, that.index, layero, that)
          ).then(
            function (result) {
              if (result !== false) {
                layer.close(that.index);
              }
            },
            function (reason) {
              reason !== undefined &&
                window.console &&
                window.console.error("layer error hint: " + reason);
            }
          );
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
          let close =
            config["btn" + (index + 1)] &&
            config["btn" + (index + 1)](that.index, layero, that);
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
  config.beforeEnd &&
    (ready.beforeEnd[that.index] = $.proxy(
      config.beforeEnd,
      config,
      layero,
      that.index,
      that
    ));
};

Class.pt.IE6 = function (layero) {
  // 隐藏select
  $("select").each(function (index, value) {
    let sthis = $(this);
    if (!sthis.parents("." + doms[0])[0]) {
      sthis.css("display") === "none" || sthis.attr({ layer: "1" }).hide();
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

export default Class;
