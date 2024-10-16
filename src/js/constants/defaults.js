import Classes from "./classes";

// 一些默认参数
export default {
  /*  0 dialog 信息框（默认），同时只能存在一个层
    1 page 页面层，可同时存在多个层
    2 iframe 内联框架层，可同时存在多个层
    3 loading 加载层，同时只能存在一个层
    4 tips 贴士层，可配置同时存在多个层 */
  type: 0,
  // 弹层的遮罩。 支持以下写法 number|array 0:不显示遮罩层
  shade: 0.3,
  // 弹层是否固定定位，即始终显示在页面可视区域
  fixed: true,
  // 绑定弹层的拖拽元素。 默认为触发弹层的标题栏进行拖拽。也可以设置 move: false 禁止拖拽
  move: `.${Classes.layerTitle}`,
  //string、array、boolean，如果是false，则不显示标题栏
  title: "信息",
  // 弹层内容 字符串 jq对象 数组
  // content: null,
  // 弹层的偏移坐标
  offset: "auto",
  // 设置弹层的宽高  array string  area: '520px' 宽度固定，高度自适应  area: 'auto' 宽度和高度均自适应
  area: "auto",
  // 是否开启标题栏的关闭图标，或设置关闭图标风格
  closeBtn: 1,
  // 提示图标。 信息框和加载层的私有参数
  icon: -1,
  // 弹层自动关闭所需的毫秒数 0 表示不自动关闭
  time: 0,
  // 弹层的初始层叠顺序值
  zIndex: 19891014,
  // number 弹层的最大宽度。当 area 属性值为默认的 auto' 时有效
  maxWidth: 360,
  // number 弹层的最大高度。当 area 属设置高度自适应时有效
  // maxHeight: null,
  // 弹层的出场动画
  anim: 0,
  // 是否开启弹层关闭时的动画。
  isOutAnim: true,
  // 最小化堆叠
  minStack: true,
  //
  moveType: 1,
  // 是否允许拖拽弹层右下角拉伸尺寸。 该属性对加载层和 tips 层无效。
  resize: true,
  // 打开弹层时，是否允许浏览器出现滚动条。
  scrollbar: true,
  // 设置 tips 层的吸附位置和背景色，tips 层的私有属性
  tips: 2,
  // 关闭弹层时，是否将弹层设置为隐藏状态（而非移除），当再次打开，直接显示原来的弹层。 若设为 true，则必须同时设置 id 属性方可有效。
  // hideOnClose: false,
  // 是否允许同时存在多个 tips 层，即不销毁上一个 tips。
  // tipsMore: false,
};
