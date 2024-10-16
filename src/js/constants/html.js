export default {
  iframe: `<iframe scrolling="%s" allowtransparency="true" id="%s" name="%s" onload="this.className='';" class="layui-layer-load" frameborder="0" src="%s"></iframe>`,

  // 遮罩层
  shade: `<div class="%s" id="%s" times="%s" style="z-index: %s;"></div>`,
  // 主体包裹层
  mainWrap: [
    `<div class="%s %s %s %s" 
    id="%s" 
    type="%s" 
    times="%s" 
    showtime="%s" 
    contype="%s" 
    style="z-index:%s;width:%s;height:%s;position:%s;">`,
    "</div>",
  ],
  // title区域
  title: `<div class="layui-layer-title" style="%s">%s</div>`,
  // 内容区
  content: [`<div id="%s" class="layui-layer-content %s %s">`, `</div>`],

  //
  tipsG: `<i class="layui-layer-TipsG"></i>`,
  // 表情图标
  faceIcon: `<i class="layui-layer-face layui-icon %s"></i>`,
  // 信息框加载图标
  dialogLoadIcon: `<i class="layui-layer-face layui-icon layui-icon-loading %s"></i>`,
  // 加载图标
  loadIcon: `<i class="layui-layer-loading-icon layui-icon %s %s"></i>`,
  // 右上角按钮
  setWin: [`<div class="layui-layer-setwin">`, `</div>`],
  //最小化按钮
  minBtn: `<span class="layui-layer-min"></span>`,
  maxBtn: `<span class="layui-layer-max"></span>`,
  // 关闭按钮
  closeBtn: `<span class="layui-icon layui-icon-close %s %s"></span>`,
  // 底部按钮区域
  btnWrap: [`<div class="layui-layer-btn %s">`, `</div>`],
  // 底部单个按钮
  btn: `<a class="layui-layer-btn%s">%s</a>`,
  // 可拖动的元素
  resize: `<span class="layui-layer-resize"></span>`,
  // 拖拽元素
  move:`<div class="%s" id="%s"></div>`
};
