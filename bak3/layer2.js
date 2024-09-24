import $ from "jquery";
import Creator from "./creator";

var win = $(window);

// 缓存常用字符
var doms = [
  "layui-layer",
  ".layui-layer-title",
  ".layui-layer-main",
  ".layui-layer-dialog",
  "layui-layer-iframe",
  "layui-layer-content",
  "layui-layer-btn",
  "layui-layer-close",
];
// html
doms.html = $("html");

// console.log(doms);

// 内置动画类
doms.anim = {
  // 旧版动画
  0: "layer-anim-00",
  1: "layer-anim-01",
  2: "layer-anim-02",
  3: "layer-anim-03",
  4: "layer-anim-04",
  5: "layer-anim-05",
  6: "layer-anim-06",

  // 滑出方向
  slideDown: "layer-anim-slide-down",
  slideLeft: "layer-anim-slide-left",
  slideUp: "layer-anim-slide-up",
  slideRight: "layer-anim-slide-right",
};

doms.SHADE = "layui-layer-shade";
doms.MOVE = "layui-layer-move";

var SHADE_KEY = "LAYUI-LAYER-SHADE-KEY";
var RECORD_HEIGHT_KEY = "LAYUI_LAYER_CONTENT_RECORD_HEIGHT";
var ready = {
  config: {
    removeFocus: true,
  },
  end: {},
  beforeEnd: {},
  events: { resize: {} },
};

// 默认内置方法。
var layer = {
  v: "3.7.0",
  //判断ie
  ie: (function () {
    // ie 版本
    var agent = navigator.userAgent.toLowerCase();
    return !!window.ActiveXObject || "ActiveXObject" in window
      ? (agent.match(/msie\s(\d+)/) || [])[1] || "11" // 由于 ie11 并没有 msie 的标识
      : false;
  })(),

  // 索引层
  index: window.layer && window.layer.v ? 100000 : 0,
};

var Class = function (setings) {
  console.log(setings);

  var that = this,
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

export default layer;