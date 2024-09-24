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

export const win = $(window);

// 一些常量
export const CONSTANTS = {
  SHADE_KEY: "LAYUI-LAYER-SHADE-KEY",
  RECORD_HEIGHT_KEY: "LAYUI_LAYER_CONTENT_RECORD_HEIGHT",
};

// 助手类+一些成员变量设置
export const ready = {
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
