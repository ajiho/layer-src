import { ready, doms, CONSTANTS } from "../constants";

export function detectIE() {
  let agent = navigator.userAgent.toLowerCase();
  return !!window.ActiveXObject || "ActiveXObject" in window
    ? (agent.match(/msie\s(\d+)/) || [])[1] || "11"
    : false;
}

export default {
  detectIE,
  // 获取节点的 style 属性值
  getStyle: function (node, name) {
    let style = node.currentStyle
      ? node.currentStyle
      : window.getComputedStyle(node, null);
    return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](
      name
    );
  },

  // for ie6 恢复 select
  reselect: function () {
    $.each($("select"), function (index, value) {
      let sthis = $(this);
      if (!sthis.parents("." + doms[0])[0]) {
        sthis.attr("layer") == 1 &&
          $("." + doms[0]).length < 1 &&
          sthis.removeAttr("layer").show();
      }
      sthis = null;
    });
  },
  // 记录宽高坐标，用于还原
  record: function (layero) {
    if (!layero[0]) return window.console && console.error("index error");
    let type = layero.attr("type");
    let contentElem = layero.find(".layui-layer-content");
    let contentRecordHeightElem =
      type === ready.type[2] ? contentElem.children("iframe") : contentElem;
    let area = [
      layero[0].style.width || ready.getStyle(layero[0], "width"),
      layero[0].style.height || ready.getStyle(layero[0], "height"),
      layero.position().top,
      layero.position().left + parseFloat(layero.css("margin-left")),
    ];
    layero.find(".layui-layer-max").addClass("layui-layer-maxmin");
    layero.attr({ area: area });
    contentElem.data(
      CONSTANTS.RECORD_HEIGHT_KEY,
      this.getStyle(contentRecordHeightElem[0], "height")
    );
  },
  // 设置页面滚动条
  setScrollbar: function (index) {
    doms.html.css("overflow", "hidden").attr("layer-full", index);
  },
  // 恢复页面滚动条
  restScrollbar: function (index) {
    if (doms.html.attr("layer-full") == index) {
      doms.html[0].style[
        doms.html[0].style.removeProperty ? "removeProperty" : "removeAttribute"
      ]("overflow");
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
  },
};
