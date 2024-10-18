import $ from "jquery";
import Util from "./util";
import Constants, { MAP } from "./constants/index";
import { shared } from "./shared";
// 测试用的类，改造完毕后就删除了
import Class from "./class";
import Container from "./container";
import Closer from "./Closer";
import { isString, isObject, isArray, isFunction, isNumber } from "is-what";

// 默认内置方法。
export default {
  v: Constants.VERSION,
  //获取最新弹出层的层叠顺序
  zIndex: shared.zIndex,
  // 索引层
  index: shared.index,
  // 设置全局默认配置
  config(options = {}) {
    shared.config = $.extend({}, shared.config, options);

    if (isString(options.extend)) {
      options.extend = [options.extend];
    }

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
    let type = isFunction(options);
    if (type) yes = options;

    return this.open(
      $.extend(
        {
          content: content,
          yes: yes,
        },
        type ? {} : options
      )
    );
  },

  confirm(content, options, yes, cancel) {
    let type = isFunction(options);
    if (type) {
      cancel = yes;
      yes = options;
    }
    return this.open(
      $.extend(
        {
          content: content,
          btn: shared.btn,
          yes: yes,
          btn2: cancel,
        },
        type ? {} : options
      )
    );
  },

  msg(content, options, end) {
    // 最常用提示层
    let type = isFunction(options);

    // 源皮肤
    let rskin = shared.config.skin;

    const skin = rskin ? `${rskin} ${rskin}-msg` : "layui-layer-msg";

    let anim = Constants.CLASSES.layerAnim5;

    if (type) end = options;
    return this.open(
      $.extend(
        {
          content: content,
          time: 3000,
          shade: false,
          skin: skin,
          title: false,
          closeBtn: false,
          btn: false,
          resize: false,
          end: end,
          removeFocus: false,
        },
        type && !shared.config.skin
          ? {
              skin: skin + " layui-layer-hui",
              anim: anim,
            }
          : (function () {
              options = options || {};
              if (
                options.icon === -1 ||
                (options.icon === undefined && !shared.config.skin)
              ) {
                options.skin = skin + " " + (options.skin || "layui-layer-hui");
              }
              return options;
            })()
      )
    );
  },

  style(index, options, limit) {
    let layero = Util.getLayeroByIndex(index);

    let contentElem = layero.find(`.${Constants.CLASSES.layerContent}`);
    let type = layero.attr("type");

    let titHeight =
      layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;

    let btnHeight =
      layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;

    // loading 和 tips 层不允许更改
    if (
      type === MAP.TYPE_NAME[MAP.TYPE.LOADING] ||
      type === MAP.TYPE_NAME[MAP.TYPE.TIPS]
    ) {
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

    btnHeight =
      layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;

    if (type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]) {
      layero.find("iframe").css({
        height:
          (isNumber(options.height) ? options.height : layero.height()) -
          titHeight -
          btnHeight,
      });
    } else {
      contentElem.css({
        height:
          (isNumber(options.height) ? options.height : layero.height()) -
          titHeight -
          btnHeight -
          parseFloat(contentElem.css("padding-top")) -
          parseFloat(contentElem.css("padding-bottom")),
      });
    }
  },

  // 给层设置标题
  title(name, index) {
    const $title = $(
      `#${Constants.CLASSES.layuiLayer}${index || Layer.index}`
    ).find(`.${Constants.CLASSES.layerTitle}`);

    $title.html(name);
  },

  load(icon, options) {
    return this.open(
      $.extend(
        {
          type: 3,
          icon: icon || 0,
          resize: false,
          shade: 0.01,
          removeFocus: false,
        },
        options
      )
    );
  },

  tips(content, follow, options) {
    return this.open(
      $.extend(
        {
          type: 4,
          content: [content, follow],
          closeBtn: false,
          time: 3000,
          shade: false,
          resize: false,
          fixed: false,
          maxWidth: 260,
          removeFocus: false,
        },
        options
      )
    );
  },
  close(index, callback) {
    new Closer(index, callback).execute();
  },
  closeAll(type, callback) {
    let that = this;

    if (isFunction(type)) {
      callback = type;
      type = null;
    }

    let domsElem = $(`.${Constants.CLASSES.layuiLayer}`);

    $.each(domsElem, function (_index) {
      let othis = $(this);
      let is = type ? othis.attr("type") === type : 1;
      is &&
        that.close(
          othis.attr("times"),
          _index === domsElem.length - 1 ? callback : null
        );
      is = null;
    });
    if (domsElem.length === 0) isFunction(callback) && callback();
  },
  closeLast(type, callback) {
    const layerIndexList = [];
    const isArrayType = Array.isArray(type);
    const selector = isString(type)
      ? `.layui-layer-${type}`
      : `.${Constants.CLASSES.layuiLayer}`;

    $(selector).each(function (i, el) {
      const layero = $(el);
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
    index = index || $(`.${Constants.CLASSES.layerIFrame}`).attr("times");
    return Util.getLayeroByIndex(index)
      .find("iframe")
      .contents()
      .find(selector);
  },

  // 得到当前 iframe 层的索引，子 iframe 时使用
  getFrameIndex(name) {
    return $("#" + name)
      .parents(`.${Constants.CLASSES.layerIFrame}`)
      .attr("times");
  },

  // iframe 层自适应宽高
  iframeAuto(index) {
    if (!index) return;
    let heg = this.getChildFrame("html", index).outerHeight();

    let layero = Util.getLayeroByIndex(index);

    // .layui-layer-title
    let titHeight =
      layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
    // layui-layer-btn
    let btnHeight =
      layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;
    layero.css({ height: heg + titHeight + btnHeight });
    layero.find("iframe").css({ height: heg });
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

    let shadeo = $(`#${Constants.CLASSES.shade}${index}`);
    let elemMin = layero.find(".layui-layer-min");

    //.layui-layer-title
    let titHeight =
      layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
    let minLeft = layero.attr("minLeft"); // 最小化时的横坐标

    // 是否已经赋值过最小化坐标
    let hasMinLeft = isString(minLeft);

    let left = hasMinLeft ? minLeft : 181 * shared.minStackIndex + "px";
    let position = layero.css("position");
    let minWidth = 180; // 最小化时的宽度
    let settings = {
      width: minWidth,
      height: titHeight,
      position: "fixed",
      overflow: "hidden",
    };

    Util.record(layero); // 记录当前尺寸、坐标，用于还原

    // 简易最小化补位
    if (shared.minStackArr.length > 0) {
      left = shared.minStackArr[0];
      shared.minStackArr.shift();
    }

    // left 是否超出边界
    if (parseFloat(left) + minWidth > $(window).width()) {
      left =
        $(window).width() -
        minWidth -
        (function () {
          shared.minStackArr.edgeIndex = shared.minStackArr.edgeIndex || 0;
          return (shared.minStackArr.edgeIndex += 3);
        })();
      if (left < 0) left = 0;
    }

    // 是否堆叠在左下角
    if (options.minStack) {
      settings.left = left;
      settings.top = $(window).height() - titHeight;
      hasMinLeft || shared.minStackIndex++; // 若未赋值过最小化坐标，则最小化操作索引自增
      layero.attr("minLeft", left);
    }

    layero.attr("position", position);
    this.style(index, settings, true);

    elemMin.hide();
    // layui-layer-iframe
    layero.attr("type") === "page" &&
      layero.find(Constants.CLASSES.layerIFrame).hide();
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
    let contentRecordHeight = contentElem.data(
      Constants.DATAKEY.RECORD_HEIGHT_KEY
    );

    layero.removeData(Constants.DATAKEY.MAX_MIN_STATUS); // 移除最大最小状态

    // 恢复原来尺寸
    this.style(
      index,
      {
        width: area[0], // 数值或百分比
        height: area[1],
        top: parseFloat(area[2]),
        left: parseFloat(area[3]),
        position: layero.attr("position"),
        overflow: "visible",
      },
      true
    );

    layero.find(".layui-layer-max").removeClass("layui-layer-maxmin");
    layero.find(".layui-layer-min").show();
    //layui-layer-iframe
    type === "page" && layero.find(Constants.CLASSES.layerIFrame).show();

    // 恢复页面滚动条弹层打开时的状态
    options.scrollbar ? Util.restScrollbar(index) : Util.setScrollbar(index);

    // #1604
    if (contentRecordHeight !== undefined) {
      contentElem.removeData(Constants.DATAKEY.RECORD_HEIGHT_KEY);

      let contentRecordHeightElem =
        type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]
          ? contentElem.children("iframe")
          : contentElem;
      contentRecordHeightElem.css({ height: contentRecordHeight });
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

    if (!$("html").attr("layer-full")) {
      Util.setScrollbar(index);
    }

    setTimeout(() => {
      let isfix = layero.css("position") === "fixed";
      this.style(
        index,
        {
          top: isfix ? 0 : $(window).scrollTop(),
          left: isfix ? 0 : $(window).scrollLeft(),
          width: "100%",
          height: "100%",
        },
        true
      );
      layero.find(".layui-layer-min").hide();
    }, 100);
  },

  // 仿系统 prompt
  prompt(options, yes) {
    let style = "",
      placeholder = "";
    options = options || {};

    if (isFunction(options)) yes = options;

    if (options.area) {
      let area = options.area;
      style = 'style="width: ' + area[0] + "; height: " + area[1] + ';"';
      delete options.area;
    }
    if (options.placeholder) {
      placeholder = ' placeholder="' + options.placeholder + '"';
    }
    let prompt,
      content =
        options.formType == 2
          ? '<textarea class="layui-layer-input"' +
            style +
            placeholder +
            "></textarea>"
          : (function () {
              return (
                '<input type="' +
                (options.formType == 1 ? "password" : "text") +
                '" class="layui-layer-input"' +
                placeholder +
                ">"
              );
            })();

    let success = options.success;
    delete options.success;

    return this.open(
      $.extend(
        {
          type: 1,
          btn: ["确定", "取消"],
          content: content,
          skin: "layui-layer-prompt" + Util.skin("prompt", shared.config),
          maxWidth: $(window).width(),
          success(layero) {
            prompt = layero.find(".layui-layer-input");
            prompt.val(options.value || "").focus();
            isFunction(success) && success(layero);
          },

          resize: false,
          yes(index) {
            let value = prompt.val();
            if (value.length > (options.maxlength || 500)) {
              this.tips(
                "最多输入" + (options.maxlength || 500) + "个字符",
                prompt,
                { tips: 1 }
              );
            } else {
              yes && yes(value, index, prompt);
            }
          },
        },
        options
      )
    );
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

    return this.open(
      $.extend(
        {
          type: 1,
          skin: "layui-layer-tab" + Util.skin("tab", shared.config),
          resize: false,
          title: (function () {
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
          })(),
          content:
            '<ul class="layui-layer-tabmain">' +
            (function () {
              let len = tab.length,
                ii = 1,
                str = "";
              if (len > 0) {
                str =
                  '<li class="layui-layer-tabli ' +
                  THIS +
                  '">' +
                  (tab[0].content || "no content") +
                  "</li>";
                for (; ii < len; ii++) {
                  str +=
                    '<li class="layui-layer-tabli">' +
                    (tab[ii].content || "no  content") +
                    "</li>";
                }
              }
              return str;
            })() +
            "</ul>",
          success(layero) {
            let btn = layero.find(".layui-layer-title").children();
            let main = layero.find(".layui-layer-tabmain").children();
            btn.on("mousedown", function (e) {
              e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
              let othis = $(this),
                index = othis.index();
              othis.addClass(THIS).siblings().removeClass(THIS);
              main.eq(index).show().siblings().hide();

              isFunction(options.change) && options.change(index);
            });

            isFunction(success) && success(layero);
          },
        },
        options
      )
    );
  },

  // 图片层
  photos(options, loop, key) {
    let _that = this;

    let dict = {};

    // 默认属性
    options = $.extend(
      true,
      {
        toolbar: true,
        footer: true,
      },
      options
    );

    if (!options.photos) return;

    // 若 photos 并非选择器或 jQuery 对象，则为普通 object
    let isObject = !(isString(options.photos) || options.photos instanceof $);

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
      let parent = $(options.photos),
        pushData = function () {
          data = [];
          parent.find(options.img).each(function (index) {
            let othis = $(this);
            othis.attr("layer-index", index);
            data.push({
              alt: othis.attr("alt"),
              pid: othis.attr("layer-pid"),
              src:
                othis.attr("lay-src") ||
                othis.attr("layer-src") ||
                othis.attr("src"),
              thumb: othis.attr("src"),
            });
          });
        };

      pushData();

      if (data.length === 0) return;

      loop ||
        parent.on("click", options.img, function () {
          pushData();
          let othis = $(this),
            index = othis.attr("layer-index");
          this.photos(
            $.extend(options, {
              photos: {
                start: index,
                data: data,
                tab: options.tab,
              },
              full: options.full,
            }),
            true
          );
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
      return isNumber(n) && !isNaN(n);
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

      $(document).on("keyup", dict.keyup);

      // 头部工具栏事件
      layero.off("click").on("click", "*[toolbar-event]", function () {
        let othis = $(this);
        let event = othis.attr("toolbar-event");
        switch (event) {
          case "rotate":
            dict.image.rotate =
              ((dict.image.rotate || 0) + Number(othis.attr("data-option"))) %
              360;
            dict.imgElem.css({
              transform: dict.getTransform(dict.image),
            });
            break;
          case "scalex":
            dict.image.scaleX = dict.image.scaleX === -1 ? 1 : -1;
            dict.imgElem.css({
              transform: dict.getTransform(dict.image),
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
              transform: dict.getTransform(dict.image),
            });
            break;
          case "reset":
            dict.image.scaleX = 1;
            dict.image.scale = 1;
            dict.image.rotate = 0;
            dict.imgElem.css({
              transform: "none",
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
      scrollbar: false,
    });

    loadImage(
      data[start].src,
      function (img) {
        _that.close(dict.loadi);

        let alt = data[start].alt || "";

        // 切换图片时不出现动画
        if (key) options.anim = -1;

        // 弹出图片层
        dict.index = _that.open(
          $.extend(
            {
              type: 1,
              id: "layui-layer-photos",
              area: (function () {
                let imgarea = [img.width, img.height];
                let winarea = [
                  $(window).width() - 100,
                  $(window).height() - 100,
                ];

                // 若实际图片的宽或者高比 屏幕大（那么进行缩放）
                if (
                  !options.full &&
                  (imgarea[0] > winarea[0] || imgarea[1] > winarea[1])
                ) {
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
              })(),
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
              content:
                '<div class="layer-layer-photos-main">' +
                '<img src="' +
                data[start].src +
                '" alt="' +
                alt +
                '" layer-pid="' +
                (data[start].pid || "") +
                '">' +
                (function () {
                  let arr = ['<div class="layui-layer-photos-pointer">'];

                  // 左右箭头翻页
                  if (data.length > 1) {
                    arr.push(
                      [
                        '<div class="layer-layer-photos-page">',
                        '<span class="layui-icon layui-icon-left layui-layer-photos-prev"></span>',
                        '<span class="layui-icon layui-icon-right layui-layer-photos-next"></span>',
                        "</div>",
                      ].join("")
                    );
                  }

                  // 头部工具栏
                  if (options.toolbar) {
                    arr.push(
                      [
                        '<div class="layui-layer-photos-toolbar layui-layer-photos-header">',
                        '<span toolbar-event="rotate" data-option="90" title="旋转"><i class="layui-icon layui-icon-refresh"></i></span>',
                        '<span toolbar-event="scalex" title="变换"><i class="layui-icon layui-icon-slider"></i></span>',
                        '<span toolbar-event="zoom" data-option="0.1" title="放大"><i class="layui-icon layui-icon-add-circle"></i></span>',
                        '<span toolbar-event="zoom" data-option="-0.1" title="缩小"><i class="layui-icon layui-icon-reduce-circle"></i></span>',
                        '<span toolbar-event="reset" title="还原"><i class="layui-icon layui-icon-refresh-1"></i></span>',
                        '<span toolbar-event="close" title="关闭"><i class="layui-icon layui-icon-close"></i></span>',
                        "</div>",
                      ].join("")
                    );
                  }

                  // 底部栏
                  if (options.footer) {
                    arr.push(
                      [
                        '<div class="layui-layer-photos-toolbar layui-layer-photos-footer">',
                        "<h3>" + alt + "</h3>",
                        "<em>" + dict.imgIndex + " / " + data.length + "</em>",
                        '<a href="' +
                          data[start].src +
                          '" target="_blank">查看原图</a>',
                        "</div>",
                      ].join("")
                    );
                  }

                  arr.push("</div>");
                  return arr.join("");
                })() +
                "</div>",
              success(layero, index, that) {
                dict.main = layero.find(".layer-layer-photos-main");
                dict.footer = layero.find(".layui-layer-photos-footer");
                dict.imgElem = dict.main.children("img");
                dict.event(layero, index, that);
                options.tab && options.tab(data[start], layero);
                isFunction(success) && success(layero);
              },
              end() {
                dict.end = true;
                $(document).off("keyup", dict.keyup);
              },
            },
            options
          )
        );
      },
      function () {
        this.close(dict.loadi);
        this.msg("当前图片地址异常，<br>是否继续查看下一张？", {
          time: 30000,
          btn: ["下一张", "不看了"],
          yes() {
            data.length > 1 && dict.imgnext(true, true);
          },
        });
      }
    );
  },
};
