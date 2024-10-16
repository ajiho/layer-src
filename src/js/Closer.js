import Util from "./util";
import Constants, { MAP } from "./constants";
import { shared } from "./shared";

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
    const closest = $(`.${Constants.CLASSES.layuiLayer}`)
      .children(`#${this.index}`)
      .closest(`.${Constants.CLASSES.layuiLayer}`);

    return closest[0]
      ? closest
      : $(`#${Constants.CLASSES.layuiLayer}${this.index}`);
  }

  // 执行关闭操作
  execute() {
    if (!this.layero[0]) return;

    if (
      !this.hideOnClose &&
      typeof shared.beforeEnd[this.index] === "function"
    ) {
      Util.promiseLikeResolve(shared.beforeEnd[this.index]()).then(
        (result) => {
          if (result !== false) {
            delete shared.beforeEnd[this.index];
            this.executeClose();
          }
        },
        (reason) => {
          reason !== undefined &&
            window.console &&
            window.console.error("layer error hint: " + reason);
        }
      );
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
      shadeo.css({ opacity: 0 });
      setTimeout(() => shadeo[this.hideOnClose ? "hide" : "remove"](), 350);
    }
  }

  // 移除层及相关事件
  removeLayer() {
    const closeAnim =
      {
        slideDown: Constants.CLASSES.animSlideDownOut,
        slideLeft: Constants.CLASSES.animSlideLeftOut,
        slideUp: Constants.CLASSES.animSlideUpOut,
        slideRight: Constants.CLASSES.animSlideRightOut,
      }[this.options.anim] || Constants.CLASSES.animClose;

    const closeAnimfullClass = `${Constants.CLASSES.layerAnim} ${closeAnim}`;

    const remove = () => {
      if (this.hideOnClose) {
        this.layero.removeClass(closeAnimfullClass);
        return this.layero.hide();
      }

      // 页面捕获层
      if (
        this.type === MAP.TYPE_NAME[MAP.TYPE.PAGE] &&
        this.layero.attr("conType") === "object"
      ) {
        this.layero
          .children(`:not(.${Constants.CLASSES.layerContent})`)
          .remove();
        let wrap = this.layero.find(`.${Constants.CLASSES.layerWrap}`);

        for (let i = 0; i < 2; i++) {
          wrap.unwrap();
        }

        wrap
          .css("display", wrap.data("display"))
          .removeClass(Constants.CLASSES.layerWrap);
      } else {
        // 低版本 IE 回收 iframe
        if (this.type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]) {
          try {
            let iframe = $(`#${Constants.CLASSES.layerIFrame}${this.index}`)[0];
            iframe.contentWindow.document.write("");
            iframe.contentWindow.close();
            this.layero
              .find(`.${Constants.CLASSES.layerContent}`)[0]
              .removeChild(iframe);
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

export default Closer;
