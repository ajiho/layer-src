import $ from "jquery";
import Util, { detectIE } from "./util";
import { win, doms, state, CONSTANTS } from "./constants";

// 关闭弹出层
export const close = (index, callback) => {
  let layero = (function () {
    let closest = $("." + doms[0])
      .children("#" + index)
      .closest("." + doms[0]);
    return closest[0]
      ? ((index = closest.attr("times")), closest)
      : $("#" + doms[0] + index);
  })();
  let type = layero.attr("type");
  let options = layero.data("config") || {};
  let hideOnClose = options.id && options.hideOnClose; // 是否关闭时移除弹层容器

  if (!layero[0]) return;

  let executor = () => {
    // 关闭动画
    let closeAnim =
      {
        slideDown: "layer-anim-slide-down-out",
        slideLeft: "layer-anim-slide-left-out",
        slideUp: "layer-anim-slide-up-out",
        slideRight: "layer-anim-slide-right-out",
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
      if (type === state.type[1] && layero.attr("conType") === "object") {
        layero.children(":not(." + doms[5] + ")").remove();
        let wrap = layero.find("." + WRAP);
        for (let i = 0; i < 2; i++) {
          wrap.unwrap();
        }
        wrap.css("display", wrap.data("display")).removeClass(WRAP);
      } else {
        // 低版本 IE 回收 iframe
        if (type === state.type[2]) {
          try {
            let iframe = $("#" + doms[4] + index)[0];
            iframe.contentWindow.document.write("");
            iframe.contentWindow.close();
            layero.find("." + doms[5])[0].removeChild(iframe);
          } catch (e) {}
        }
        layero[0].innerHTML = "";
        layero.remove();
      }

      typeof state.end[index] === "function" && state.end[index]();
      delete state.end[index];
      typeof callback === "function" && callback();

      // 移除 reisze 事件
      if (state.events.resize[index]) {
        win.off("resize", state.events.resize[index]);
        delete state.events.resize[index];
      }
    };
    // 移除遮罩
    let shadeo = $("#" + doms.SHADE + index);
    if (!options.isOutAnim) {
      shadeo[hideOnClose ? "hide" : "remove"]();
    } else {
      shadeo.css({ opacity: 0 });
      setTimeout(function () {
        shadeo[hideOnClose ? "hide" : "remove"]();
      }, 350);
    }

    // 是否允许关闭动画
    if (options.isOutAnim) {
      layero.addClass("layer-anim " + closeAnim);
    }

    Util.restScrollbar(index);

    // 记住被关闭层的最小化堆叠坐标
    if (typeof layero.attr("minLeft") === "string") {
      state.minStackIndex--;
      state.minStackArr.push(layero.attr("minLeft"));
    }

    if (!options.isOutAnim) {
      remove();
    } else {
      setTimeout(function () {
        remove();
      }, 200);
    }
  };

  if (!hideOnClose && typeof state.beforeEnd[index] === "function") {
    Util.promiseLikeResolve(state.beforeEnd[index]()).then(
      function (result) {
        if (result !== false) {
          delete state.beforeEnd[index];
          executor();
        }
      },
      function (reason) {
        reason !== undefined &&
          window.console &&
          window.console.error("layer error hint: " + reason);
      }
    );
  } else {
    delete state.beforeEnd[index];
    executor();
  }
};

export const closeAll = (type, callback) => {
  if (typeof type === "function") {
    callback = type;
    type = null;
  }
  let domsElem = $("." + doms[0]);
  $.each(domsElem, function (_index) {
    let othis = $(this);
    let is = type ? othis.attr("type") === type : 1;
    is &&
      close(
        othis.attr("times"),
        _index === domsElem.length - 1 ? callback : null
      );
    is = null;
  });
  if (domsElem.length === 0) typeof callback === "function" && callback();
};
