export const shared = {
  // 最新弹出层的层叠顺序
  zIndex: 0,
  // 最新弹出层的索引
  index: 0,
  // 配置,该配置项的作用是可以通过layer.config(options)方法来设置全局的默认配置
  config: {
    //是否移除弹层触发元素的焦点，避免按回车键时重复弹出
    removeFocus: true,
  },
  end: {},
  beforeEnd: {},
  events: { resize: {} },
  minStackIndex: 0,
  minStackArr: [],
  btn: ["确定", "取消"],
};


