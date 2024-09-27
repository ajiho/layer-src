import $ from "jquery";

// 缓存常用字符
export const doms = [
  "layui-layer",
  ".layui-layer-title",
  ".layui-layer-main",
  ".layui-layer-dialog",
  "layui-layer-iframe",
  "layui-layer-content",
  "layui-layer-btn",
  "layui-layer-close",
];

doms.html = $("html");

// 动画类
doms.anim = {
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

doms.SHADE = "layui-layer-shade";
doms.MOVE = "layui-layer-move";

export const win = $(window);

// 一些常量
export const CONSTANTS = {
  SHADE_KEY: "LAYUI-LAYER-SHADE-KEY",
  RECORD_HEIGHT_KEY: "LAYUI_LAYER_CONTENT_RECORD_HEIGHT",
};

// 状态
export const state = {
  config: {
    removeFocus: true,
  },
  end: {},
  beforeEnd: {},
  events: { resize: {} },
  minStackIndex: 0,
  minStackArr: [],
  btn: ["确定", "取消"],

  // 五种原始层模式
  type: ["dialog", "page", "iframe", "loading", "tips"],
};

// 默认参数
export const DEFAULTS = {
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

export const html = {
  iframe: `<iframe scrolling="%s" allowtransparency="true" id="%s" name="%s" onload="this.className='';" class="layui-layer-load" frameborder="0" src="%s"></iframe>`,
};
