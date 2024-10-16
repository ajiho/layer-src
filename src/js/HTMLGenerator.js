import Constants, { MAP } from "./constants/index";
import Util from "./util";

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
      shadeHTML = Util.sprintf(
        Constants.HTML.shade,
        Constants.CLASSES.shade,
        `${Constants.CLASSES.shade}${this.index}`,
        this.index,
        this.zIndex - 1
      );
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
    const borderClass =
      [MAP.TYPE.DIALOG, MAP.TYPE.IFRAME].includes(this.config.type) &&
      !this.config.shade
        ? Constants.CLASSES.layerBorder
        : "";

    const layerType = MAP.TYPE_NAME[this.config.type];

    return Util.sprintf(
      Constants.HTML.mainWrap[0],
      Constants.CLASSES.layuiLayer,
      `layui-layer-${layerType}`,
      borderClass,
      this.config.skin || "",
      `${Constants.CLASSES.layuiLayer}${this.index}`, //id
      layerType, //type
      this.index, //次数
      this.config.time, //时间
      typeof this.config.content === "object" ? "object" : "string", //类型
      this.zIndex,
      this.config.area[0],
      this.config.area[1],
      this.config.fixed ? "fixed;" : "absolute;"
    );
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
    return typeof this.config.content === "object" &&
      this.config.type != MAP.TYPE.IFRAME
      ? ""
      : titleHTML;
  }

  #getContentBeginHTML() {
    // 是信息框且设置了图标就添加一点边距
    const paddingClass =
      this.config.type == MAP.TYPE.DIALOG && this.config.icon !== -1
        ? Constants.CLASSES.layerPadding
        : "";

    const loadingClass =
      this.config.type == MAP.TYPE.LOADING
        ? `${Constants.CLASSES.layerLoading}${this.config.icon}`
        : "";

    return Util.sprintf(
      Constants.HTML.content[0],
      this.config.id ? this.config.id : "", //id
      paddingClass, //边距
      loadingClass // 加载图标
    );
  }

  #getIconHtml() {
    // 动画基础类
    const animClass = [
      Constants.CLASSES.layuiAnim,
      Constants.CLASSES.layuiAnimRotate,
      Constants.CLASSES.layuiAnimLoop,
    ].join(" ");

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
      const btnAlignClass = this.config.btnAlign
        ? `${Constants.CLASSES.layerBtn}-${this.config.btnAlign}`
        : "";
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

      html = Util.sprintf(
        Constants.HTML.closeBtn,
        Constants.CLASSES.layerClose,
        `${Constants.CLASSES.layerClose}${closeButton}`
      );
    }
    return html;
  }

  #getMinMaxBtnHTML() {
    const html = [];
    // 当 this.config.maxmin 为 true，并且 this.config.type 的值是 1 或 2 时，ismax 的值为 true,否则，ismax 的值为 false

    let ismax =
      this.config.maxmin &&
      [MAP.TYPE.PAGE, MAP.TYPE.IFRAME].includes(this.config.type);

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
      [MAP.FACE.SMILE]: Constants.CLASSES.faceSmile,
    };

    // 加载图标
    if (this.config.icon === MAP.FACE.LOADING) {
      return Util.sprintf(Constants.HTML.dialogLoadIcon, animClass);
    }

    const faceClassName =
      faceClassNameMap[this.config.icon] || faceClassNameMap[MAP.FACE.TIPS];
    return Util.sprintf(Constants.HTML.faceIcon, faceClassName);
  }

  // 获取加载层图标
  #getLoadingIcon(animClass) {
    
    const loadingIconsMap = {
      [MAP.LOADING_ICON.BALL_SPIN]: Constants.CLASSES.iconLoading,
      [MAP.LOADING_ICON.BALL_CLIP_ROTATE_GRAY]: Constants.CLASSES.iconLoading1,
      [MAP.LOADING_ICON.BALL_CLIP_ROTATE_BLUE]: Constants.CLASSES.iconLoading2,
    };

    if (this.config.icon === 2) {
      return Util.sprintf(
        `<div class="%s "%s"></div>`,
        loadingIconsMap[MAP.LOADING_ICON.BALL_CLIP_ROTATE_BLUE],
        animClass
      );
    }
    const iconClass =
      loadingIconsMap[this.config.icon] ||
      loadingIconsMap[MAP.LOADING_ICON.BALL_SPIN];

    return Util.sprintf(Constants.HTML.loadIcon, iconClass, animClass);
  }
}

export default HTMLGenerator;
