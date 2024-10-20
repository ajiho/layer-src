import $ from "jquery";
import Constants, { MAP } from "../constants/index";
import { computePosition as base, offset } from "@floating-ui/dom";

const centerOffset = offset(({ rects }) => {
  console.log(rects.reference);

  return -rects.reference.height / 2 + rects.floating.height / 2;
});

export default {
  // 包装floating-ui的computePosition方法让其支持居中显示 #https://floating-ui.com/docs/offset#creating-custom-placements
  computePosition(referenceEl, floatingEl, options) {
    const isCentered = options.placement === "center";

    const placement = isCentered ? "bottom" : options.placement;

    const middleware = [
      ...(options.middleware || []),
      isCentered && centerOffset,
    ];

    return base(referenceEl, floatingEl, {
      ...options,
      placement,
      middleware,
    });
  },
  getLayeroByIndex(index) {
    return $(`#${Constants.CLASSES.layuiLayer}${index}`);
  },

  getShadeoByIndex(index) {
    return $(`#${Constants.CLASSES.shade}${index}`);
  },

  // 获取节点的 style 属性值
  getStyle(node, name) {
    let style = node.currentStyle
      ? node.currentStyle
      : window.getComputedStyle(node, null);
    return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](
      name
    );
  },

  // for ie6 恢复 select
  reselect() {
    $.each($("select"), function (index, value) {
      let sthis = $(this);
      if (!sthis.parents(`.${Constants.CLASSES.layuiLayer}`)[0]) {
        sthis.attr("layer") == 1 &&
          $(`.${Constants.CLASSES.layuiLayer}`).length < 1 &&
          sthis.removeAttr("layer").show();
      }
      sthis = null;
    });
  },
  // 记录宽高坐标，用于还原
  record(layero) {
    if (!layero[0]) return window.console && console.error("index error");
    let type = layero.attr("type");
    let contentElem = layero.find(".layui-layer-content");

    let contentRecordHeightElem =
      type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]
        ? contentElem.children("iframe")
        : contentElem;

    let area = [
      layero[0].style.width || this.getStyle(layero[0], "width"),
      layero[0].style.height || this.getStyle(layero[0], "height"),
      layero.position().top,
      layero.position().left + parseFloat(layero.css("margin-left")),
    ];
    layero.find(".layui-layer-max").addClass("layui-layer-maxmin");
    layero.attr({ area: area });
    contentElem.data(
      Constants.DATAKEY.RECORD_HEIGHT_KEY,
      this.getStyle(contentRecordHeightElem[0], "height")
    );
  },
  // 设置页面滚动条
  setScrollbar(index) {
    $("html").css("overflow", "hidden").attr("layer-full", index);
  },
  // 恢复页面滚动条
  restScrollbar: function (index) {
    const $html = $("html");

    if ($html.attr("layer-full") == index) {
      $html[0].style[
        $html[0].style.removeProperty ? "removeProperty" : "removeAttribute"
      ]("overflow");
      $html.removeAttr("layer-full");
    }
  },
  // 类似 Promise.resolve
  promiseLikeResolve(value) {
    let deferred = $.Deferred();

    if (value && typeof value.then === "function") {
      value.then(deferred.resolve, deferred.reject);
    } else {
      deferred.resolve(value);
    }
    return deferred.promise();
  },

  skin(type, config) {
    const { skin } = config;

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
  },
};
