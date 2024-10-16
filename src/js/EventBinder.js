import { shared } from "./shared";
import Constants, { MAP } from "./constants";
import Util from "./util";

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
      shared.beforeEnd[this.index] = this.config.beforeEnd.bind(
        this.config,
        this.layero,
        this.index,
        this.container
      );
    }
  }

  handleButtonEvents() {
    let that = this;

    this.layero
      .find(`.${Constants.CLASSES.layerBtn}`)
      .children("a")
      .on("click", function () {
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
      const yesCallback =
        this.config.yes || this.config[`btn${btnIndex + 1}`] || defaultClose;

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
      Util.promiseLikeResolve(
        btnCallback.call(this.config, this.index, this.layero, this.container)
      ).then(
        (result) => {
          if (result !== false) {
            this.layer.close(this.index);
          }
        },
        (reason) => {
          reason !== undefined && console.error("layer error hint: " + reason);
        }
      );
    } else {
      this.layer.close(this.index);
    }
  }

  winClose() {
    this.layero.find(`.${Constants.CLASSES.layerClose}`).on("click", () => {
      let cancelCallback =
        this.config.cancel &&
        this.config.cancel(this.index, this.layero, this.container);

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
      let callback =
        this.config.min &&
        this.config.min(this.layero, this.index, this.container);

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

        this.config.restore &&
          this.config.restore(this.layero, this.index, this.container);
      } else {
        this.layer.full(this.index, this.config);

        setTimeout(() => {
          this.config.full &&
            this.config.full(this.layero, this.index, this.container);
        }, 100);
      }
    });
  }
}

export default EventBinder;
