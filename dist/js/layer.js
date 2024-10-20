/*!
 * layer-src v1.0.0 (undefined)
 * Copyright 2023-2024 
 * license MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.layer = factory(global.jQuery));
})(this, (function ($$1) { 'use strict';

  var Classes = {
    // 表情
    faceTips: "layui-icon-tips",
    faceSuccess: "layui-icon-success",
    faceError: "layui-icon-error",
    faceQuestion: "layui-icon-question",
    faceLock: "layui-icon-lock",
    faceCry: "layui-icon-face-cry",
    faceSmile: "layui-icon-face-smile",
    layuiLayer: "layui-layer",
    // 标题
    layerTitle: "layui-layer-title",
    layerMain: "layui-layer-main",
    layerIFrame: "layui-layer-iframe",
    layerContent: "layui-layer-content",
    layerBtn: "layui-layer-btn",
    layerClose: "layui-layer-close",
    //动画
    layerAnim: "layer-anim",
    layerAnim0: "layer-anim-00",
    layerAnim1: "layer-anim-01",
    layerAnim2: "layer-anim-02",
    layerAnim3: "layer-anim-03",
    layerAnim4: "layer-anim-04",
    layerAnim5: "layer-anim-05",
    layerAnim6: "layer-anim-06",
    animSlideDown: "layer-anim-slide-down",
    animSlideLeft: "layer-anim-slide-left",
    animSlideUp: "layer-anim-slide-up",
    animSlideRight: "layer-anim-slide-right",
    // 退出动画
    animSlideDownOut: "layer-anim-slide-down-out",
    animSlideLeftOut: "layer-anim-slide-left-out",
    animSlideUpOut: "layer-anim-slide-up-out",
    animSlideRightOut: "layer-anim-slide-right-out",
    // 关闭动画
    animClose: "layer-anim-close",
    shade: "layui-layer-shade",
    move: "layui-layer-move",
    layerWrap: "layui-layer-wrap",
    // 边框
    layerBorder: "layui-layer-border",
    // 边距
    layerPadding: "layui-layer-padding",
    layerLoading: "layui-layer-loading",
    // layui的动画类
    layuiAnim: "layui-anim",
    layuiAnimRotate: "layui-anim-rotate",
    layuiAnimLoop: "layui-anim-loop",
    layerTipsG: "layui-layer-TipsG",
    layerTipsB: "layui-layer-TipsB",
    layerTipsT: "layui-layer-TipsT",
    layerTipsL: "layui-layer-TipsL",
    layerTipsR: "layui-layer-TipsR",
    //调整尺寸的类
    layerResize: "layui-layer-resize",
    // 加载图标
    iconLoading: "layui-icon-loading",
    iconLoading1: "layui-icon-loading-1",
    iconLoading2: "layui-icon-loading-2",
    layerMin: "layui-layer-min",
    layerMax: "layui-layer-max",
    layerMaxMin: "layui-layer-maxmin"
  };

  var DataKey = {
    SHADE_KEY: "LAYUI-LAYER-SHADE-KEY",
    RECORD_HEIGHT_KEY: "LAYUI_LAYER_CONTENT_RECORD_HEIGHT",
    // 状态
    MAX_MIN_STATUS: "maxminStatus"
  };

  // 一些默认参数
  var Defaults = {
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
    tips: 2
    // 关闭弹层时，是否将弹层设置为隐藏状态（而非移除），当再次打开，直接显示原来的弹层。 若设为 true，则必须同时设置 id 属性方可有效。
    // hideOnClose: false,
    // 是否允许同时存在多个 tips 层，即不销毁上一个 tips。
    // tipsMore: false,
  };

  var Html = {
    iframe: `<iframe scrolling="%s" allowtransparency="true" id="%s" name="%s" onload="this.className='';" class="layui-layer-load" frameborder="0" src="%s"></iframe>`,
    // 遮罩层
    shade: `<div class="%s" id="%s" times="%s" style="z-index: %s;"></div>`,
    // 主体包裹层
    mainWrap: [`<div class="%s %s %s %s" 
    id="%s" 
    type="%s" 
    times="%s" 
    showtime="%s" 
    contype="%s" 
    style="z-index:%s;width:%s;height:%s;position:%s;">`, "</div>"],
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
    move: `<div class="%s" id="%s"></div>`
  };

  /**
   * 一些不会变的表映射数据集合
   */

  // 弹出层类型
  const TYPE = {
    DIALOG: 0,
    PAGE: 1,
    IFRAME: 2,
    LOADING: 3,
    TIPS: 4
  };

  // 弹出层对应的名称
  const TYPE_NAME = {
    [TYPE.DIALOG]: "dialog",
    [TYPE.PAGE]: "page",
    [TYPE.IFRAME]: "iframe",
    [TYPE.LOADING]: "loading",
    [TYPE.TIPS]: "tips"
  };

  // 表情
  const FACE = {
    TIPS: 0,
    SUCCESS: 1,
    ERROR: 2,
    QUESTION: 3,
    LOCK: 4,
    CRY: 5,
    SMILE: 6,
    LOADING: 16,
    NONE: -1
  };

  // load层的图标
  const LOADING_ICON = {
    BALL_SPIN: 0,
    BALL_CLIP_ROTATE_GRAY: 1,
    BALL_CLIP_ROTATE_BLUE: 2
  };

  // 提示层的方位
  const TIPS_DIRECTION = {
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFT: 4
  };
  var MAP = {
    TYPE,
    TYPE_NAME,
    FACE,
    LOADING_ICON,
    TIPS_DIRECTION,
    FACE
  };

  const VERSION = "0.0.1";
  var Constants = {
    CLASSES: Classes,
    DATAKEY: DataKey,
    DEFAULTS: Defaults,
    HTML: Html,
    VERSION,
    MAP: MAP
  };

  /**
   * Custom positioning reference element.
   * @see https://floating-ui.com/docs/virtual-elements
   */

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const createCoords = v => ({
    x: v,
    y: v
  });
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split('-')[0];
  }
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  function getSideAxis(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === 'y';
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  // For type backwards-compatibility, the `OffsetOptions` type was also
  // Derivable.

  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform,
      elements
    } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === 'y';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset$1 = function (options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);

        // If the placement is the same and the arrow caused an alignment offset
        // then we don't need to change the positioning coordinates.
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift$1 = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min, mainAxisCoord, max);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min, crossAxisCoord, max);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };

  function hasWindow() {
    return typeof window !== 'undefined';
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === 'undefined') {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isTopLayer(element) {
    return [':popover-open', ':modal'].some(selector => {
      try {
        return element.matches(selector);
      } catch (e) {
        return false;
      }
    });
  }
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    isShadowRoot(node) && node.host ||
    // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle$1(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === 'fixed';
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }

  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }

  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
        // Firefox with layout.scrollbar.side = 3 in about:config to test this.
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    let htmlX = 0;
    let htmlY = 0;
    if (documentElement && !isOffsetParentAnElement && !isFixed) {
      const htmlRect = documentElement.getBoundingClientRect();
      htmlY = htmlRect.top + scroll.scrollTop;
      htmlX = htmlRect.left + scroll.scrollLeft -
      // RTL <body> scrollbar.
      getWindowScrollBarX(documentElement, htmlRect);
    }
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlX;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlY;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }

  function isStaticPositioned(element) {
    return getComputedStyle$1(element).position === 'static';
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;

    // Firefox returns the <html> element as the offsetParent if it's non-static,
    // while Chrome and Safari return the <body> element. The <body> element must
    // be used to perform the correct calculations even if the <html> element is
    // non-static.
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }

  const getElementRects = async function (data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };

  function isRTL(element) {
    return getComputedStyle$1(element).direction === 'rtl';
  }

  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset = offset$1;

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = shift$1;

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  const centerOffset = offset(({
    rects
  }) => {
    console.log(rects.reference);
    return -rects.reference.height / 2 + rects.floating.height / 2;
  });
  var Util = {
    // 包装floating-ui的computePosition方法让其支持居中显示 #https://floating-ui.com/docs/offset#creating-custom-placements
    computePosition(referenceEl, floatingEl, options) {
      const isCentered = options.placement === "center";
      const placement = isCentered ? "bottom" : options.placement;
      const middleware = [...(options.middleware || []), isCentered && centerOffset];
      return computePosition(referenceEl, floatingEl, {
        ...options,
        placement,
        middleware
      });
    },
    getLayeroByIndex(index) {
      return $$1(`#${Constants.CLASSES.layuiLayer}${index}`);
    },
    getShadeoByIndex(index) {
      return $$1(`#${Constants.CLASSES.shade}${index}`);
    },
    // 获取节点的 style 属性值
    getStyle(node, name) {
      let style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
      return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](name);
    },
    // for ie6 恢复 select
    reselect() {
      $$1.each($$1("select"), function (index, value) {
        let sthis = $$1(this);
        if (!sthis.parents(`.${Constants.CLASSES.layuiLayer}`)[0]) {
          sthis.attr("layer") == 1 && $$1(`.${Constants.CLASSES.layuiLayer}`).length < 1 && sthis.removeAttr("layer").show();
        }
        sthis = null;
      });
    },
    // 记录宽高坐标，用于还原
    record(layero) {
      if (!layero[0]) return window.console && console.error("index error");
      let type = layero.attr("type");
      let contentElem = layero.find(".layui-layer-content");
      let contentRecordHeightElem = type === MAP.TYPE_NAME[MAP.TYPE.IFRAME] ? contentElem.children("iframe") : contentElem;
      let area = [layero[0].style.width || this.getStyle(layero[0], "width"), layero[0].style.height || this.getStyle(layero[0], "height"), layero.position().top, layero.position().left + parseFloat(layero.css("margin-left"))];
      layero.find(".layui-layer-max").addClass("layui-layer-maxmin");
      layero.attr({
        area: area
      });
      contentElem.data(Constants.DATAKEY.RECORD_HEIGHT_KEY, this.getStyle(contentRecordHeightElem[0], "height"));
    },
    // 设置页面滚动条
    setScrollbar(index) {
      $$1("html").css("overflow", "hidden").attr("layer-full", index);
    },
    // 恢复页面滚动条
    restScrollbar: function (index) {
      const $html = $$1("html");
      if ($html.attr("layer-full") == index) {
        $html[0].style[$html[0].style.removeProperty ? "removeProperty" : "removeAttribute"]("overflow");
        $html.removeAttr("layer-full");
      }
    },
    // 类似 Promise.resolve
    promiseLikeResolve(value) {
      let deferred = $$1.Deferred();
      if (value && typeof value.then === "function") {
        value.then(deferred.resolve, deferred.reject);
      } else {
        deferred.resolve(value);
      }
      return deferred.promise();
    },
    skin(type, config) {
      const {
        skin
      } = config;

      // 如果有定义 skin，则返回带有皮肤类名的字符串
      if (skin) {
        const skinClass = `${skin} ${skin}-${type}`;
        return ` ${skinClass}`;
      }

      // 否则返回空字符串
      return "";
    },
    sprintf(_str, ...args) {
      let flag = true;
      let i = 0;
      const str = _str.replace(/%s/g, () => {
        const arg = args[i++];
        if (typeof arg === "undefined") {
          flag = false;
          return "";
        }
        return arg;
      });
      return flag ? str : "";
    }
  };

  const shared = {
    // 最新弹出层的层叠顺序
    zIndex: 0,
    // 最新弹出层的索引
    index: 0,
    // 配置,该配置项的作用是可以通过layer.config(options)方法来设置全局的默认配置
    config: {
      //是否移除弹层触发元素的焦点，避免按回车键时重复弹出
      removeFocus: true
    },
    end: {},
    beforeEnd: {},
    events: {
      resize: {}
    },
    minStackIndex: 0,
    minStackArr: [],
    btn: ["确定", "取消"]
  };

  const Store = {
    // 最新弹出层的层叠顺序
    zIndex: 0,
    // 最新弹出层的索引
    index: 0,
    // 配置,该配置项的作用是可以通过layer.config(options)方法来设置全局的默认配置
    config: {
      //是否移除弹层触发元素的焦点，避免按回车键时重复弹出
      removeFocus: true
    },
    end: {},
    beforeEnd: {},
    events: {
      resize: {}
    },
    minStackIndex: 0,
    minStackArr: [],
    btn: ["确定", "取消"],
    // 五种原始层模式
    type: ["dialog", "page", "iframe", "loading", "tips"]
  };

  // 缓存常用字符
  const doms$1 = ["layui-layer",
  //0
  ".layui-layer-title",
  //1
  ".layui-layer-main",
  //2
  ".layui-layer-dialog",
  //3
  "layui-layer-iframe",
  //4
  "layui-layer-content",
  //5
  "layui-layer-btn",
  //6
  "layui-layer-close" //7
  ];
  // 动画类
  doms$1.anim = {
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
    slideRight: "layer-anim-slide-right"
  };
  doms$1.html = $$1("html");
  doms$1.SHADE = "layui-layer-shade";
  doms$1.MOVE = "layui-layer-move";
  doms$1.anim.length - 1;

  // console.log(doms.anim);
  // console.log(animlen);

  const Class = function (setings) {
    let that = this,
      creat = function () {
        that.creat();
      };
    ++Store.index;
    that.index = Store.index;
    that.config.maxWidth = $$1(window).width() - 15 * 2; // 初始最大宽度：当前屏幕宽，左右留 15px 边距
    that.config = $$1.extend({}, that.config, Store.config, setings);
    document.body ? creat() : setTimeout(function () {
      creat();
    }, 30);
  };
  Class.pt = Class.prototype;

  // 默认配置
  Class.pt.config = Constants.DEFAULTS;

  // 容器
  Class.pt.vessel = function (conType, callback) {
    let that = this;
    let times = that.index;
    let config = that.config;
    let zIndex = config.zIndex + times;
    let titype = typeof config.title === "object";
    let ismax = config.maxmin && (config.type === 1 || config.type === 2);
    let titleHTML = config.title ? '<div class="layui-layer-title" style="' + (titype ? config.title[1] : "") + '">' + (titype ? config.title[0] : config.title) + "</div>" : "";
    config.zIndex = zIndex;
    callback([
    // 遮罩
    config.shade ? '<div class="' + doms$1.SHADE + '" id="' + doms$1.SHADE + times + '" times="' + times + '" style="' + ("z-index:" + (zIndex - 1) + "; ") + '"></div>' : "",
    // 主体
    '<div class="' + doms$1[0] + (" layui-layer-" + Store.type[config.type]) + ((config.type == 0 || config.type == 2) && !config.shade ? " layui-layer-border" : "") + " " + (config.skin || "") + '" id="' + doms$1[0] + times + '" type="' + Store.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? "object" : "string") + '" style="z-index: ' + zIndex + "; width:" + config.area[0] + ";height:" + config.area[1] + ";position:" + (config.fixed ? "fixed;" : "absolute;") + '">' + (conType && config.type != 2 ? "" : titleHTML) +
    // 内容区
    "<div" + (config.id ? ' id="' + config.id + '"' : "") + ' class="layui-layer-content' + (config.type == 0 && config.icon !== -1 ? " layui-layer-padding" : "") + (config.type == 3 ? " layui-layer-loading" + config.icon : "") + '">' +
    // 表情或图标
    function () {
      let face = ["layui-icon-tips", "layui-icon-success", "layui-icon-error", "layui-icon-question", "layui-icon-lock", "layui-icon-face-cry", "layui-icon-face-smile"];
      let additFaceClass;

      // 动画类
      let animClass = "layui-anim layui-anim-rotate layui-anim-loop";

      // 信息框表情
      if (config.type == 0 && config.icon !== -1) {
        // 加载（加载图标）
        if (config.icon == 16) {
          console.log("icon=16");
          additFaceClass = "layui-icon layui-icon-loading " + animClass;
        }
        return '<i class="layui-layer-face layui-icon ' + (additFaceClass || face[config.icon] || face[0]) + '"></i>';
      }

      // 加载层图标
      if (config.type == 3) {
        let type = ["layui-icon-loading", "layui-icon-loading-1"];
        // 风格 2
        if (config.icon == 2) {
          return '<div class="layui-layer-loading-2 ' + animClass + '"></div>';
        }
        return '<i class="layui-layer-loading-icon layui-icon ' + (type[config.icon] || type[0]) + " " + animClass + '"></i>';
      }
      return "";
    }() + (config.type == 1 && conType ? "" : config.content || "") + "</div>" +
    // 右上角按钮
    '<div class="layui-layer-setwin">' + function () {
      let arr = [];

      // 最小化、最大化
      if (ismax) {
        arr.push('<span class="layui-layer-min"></span>');
        arr.push('<span class="layui-layer-max"></span>');
      }

      // 关闭按钮
      if (config.closeBtn) {
        arr.push('<span class="layui-icon layui-icon-close ' + [doms$1[7], doms$1[7] + (config.title ? config.closeBtn : config.type == 4 ? "1" : "2")].join(" ") + '"></span>');
      }
      return arr.join("");
    }() + "</div>" + (
    // 底部按钮
    config.btn ? function () {
      let button = "";
      typeof config.btn === "string" && (config.btn = [config.btn]);
      for (let i = 0, len = config.btn.length; i < len; i++) {
        button += '<a class="' + doms$1[6] + "" + i + '">' + config.btn[i] + "</a>";
      }
      return '<div class="' + function () {
        let className = [doms$1[6]];
        if (config.btnAlign) className.push(doms$1[6] + "-" + config.btnAlign);
        return className.join(" ");
      }() + '">' + button + "</div>";
    }() : "") + (config.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], titleHTML, $$1('<div class="' + doms$1.MOVE + '" id="' + doms$1.MOVE + '"></div>'));
    return that;
  };

  // 创建骨架
  Class.pt.creat = function () {
    let that = this;
    let config = that.config;
    let times = that.index;
    let content = config.content;
    let conType = typeof content === "object";
    let body = $$1("body");
    let setAnim = function (layero) {
      // anim 兼容旧版 shift
      if (config.shift) {
        config.anim = config.shift;
      }

      // 为兼容 jQuery3.0 的 css 动画影响元素尺寸计算
      if (doms$1.anim[config.anim]) {
        let animClass = "layer-anim " + doms$1.anim[config.anim];
        layero.addClass(animClass).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
          $$1(this).removeClass(animClass);
        });
      }
    };

    // 若 id 对应的弹层已经存在，则不重新创建
    if (config.id && $$1("." + doms$1[0]).find("#" + config.id)[0]) {
      return function () {
        let layero = $$1("#" + config.id).closest("." + doms$1[0]);
        let index = layero.attr("times");
        let options = layero.data("config");
        let elemShade = $$1("#" + doms$1.SHADE + index);
        let maxminStatus = layero.data("maxminStatus") || {};
        // 若弹层为最小化状态，则点击目标元素时，自动还原
        if (maxminStatus === "min") {
          layer.restore(index);
        } else if (options.hideOnClose) {
          elemShade.show();
          layero.show();
          setAnim(layero);
          setTimeout(function () {
            elemShade.css({
              opacity: elemShade.data(Constants.DATAKEY.SHADE_KEY)
            });
          }, 10);
        }
      }();
    }

    // 是否移除活动元素的焦点
    if (config.removeFocus && document.activeElement) {
      document.activeElement.blur(); // 将原始的聚焦节点失焦
    }

    // 初始化 area 属性
    if (typeof config.area === "string") {
      config.area = config.area === "auto" ? ["", ""] : [config.area, ""];
    }
    if (layer.ie == 6) {
      config.fixed = false;
    }
    switch (config.type) {
      case 0:
        config.btn = "btn" in config ? config.btn : Store.btn[0];
        layer.closeAll("dialog");
        break;
      case 2:
        config.content = conType ? config.content : [config.content || "", "auto"];
        config.content = '<iframe scrolling="' + (config.content[1] || "auto") + '" allowtransparency="true" id="' + doms$1[4] + "" + times + '" name="' + doms$1[4] + "" + times + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
        break;
      case 3:
        delete config.title;
        delete config.closeBtn;
        config.icon === -1 && config.icon === 0;
        layer.closeAll("loading");
        break;
      case 4:
        conType || (config.content = [config.content, "body"]);
        config.follow = config.content[1];
        config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
        delete config.title;
        config.tips = typeof config.tips === "object" ? config.tips : [config.tips, true];
        config.tipsMore || layer.closeAll("tips");
        break;
    }

    // 建立容器
    that.vessel(conType, function (html, titleHTML, moveElem) {
      body.append(html[0]); //往body加入了遮罩层
      conType // 判断content选项是对象
      ? function () {
        config.type == 2 || config.type == 4 ? function () {
          $$1("body").append(html[1]);
        }() : function () {
          if (!content.parents("." + doms$1[0])[0]) {
            content.data("display", content.css("display")).show().addClass("layui-layer-wrap").wrap(html[1]);
            $$1("#" + doms$1[0] + times).find("." + doms$1[5]).before(titleHTML);
          }
        }();
      }() : body.append(html[1]);
      $$1("#" + doms$1.MOVE)[0] || body.append(Store.moveElem = moveElem);
      that.layero = $$1("#" + doms$1[0] + times);
      that.shadeo = $$1("#" + doms$1.SHADE + times);
      config.scrollbar || Util.setScrollbar(times);
    }).auto(times);

    // 遮罩
    that.shadeo.css({
      "background-color": config.shade[1] || "#000",
      opacity: config.shade[0] || config.shade,
      transition: config.shade[2] || ""
    });
    that.shadeo.data(Constants.DATAKEY.SHADE_KEY, config.shade[0] || config.shade);
    config.type == 2 && layer.ie == 6 && that.layero.find("iframe").attr("src", content[0]);
    if (config.type == 4) {
      //tips层，调用tips的方法
      that.tips();
    } else {
      // 坐标自适应浏览器窗口尺寸
      that.offset();
      const zIndex = parseInt(Util.getStyle(document.getElementById(doms$1.MOVE), "z-index"));
      if (!zIndex) {
        that.layero.css("visibility", "hidden").offset().css("visibility", "visible");
      }
    }

    // 若是固定定位，则跟随 resize 事件来自适应坐标
    if (config.fixed) {
      if (!Store.events.resize[that.index]) {
        Store.events.resize[that.index] = function () {
          that.resize();
        };
        // 此处 resize 事件不会一直叠加，当关闭弹层时会移除该事件
        $$1(window).on("resize", Store.events.resize[that.index]);
      }
    }
    config.time <= 0 || setTimeout(function () {
      layer.close(that.index);
    }, config.time);
    that.move().callback();
    setAnim(that.layero);

    // 记录配置信息
    that.layero.data("config", config);
  };

  // 当前实例的 resize 事件
  Class.pt.resize = function () {
    let that = this;
    let config = that.config;
    that.offset();
    (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(that.index);
    config.type == 4 && that.tips();
  };

  // 自适应
  Class.pt.auto = function (index) {
    let that = this,
      config = that.config,
      layero = $$1("#" + doms$1[0] + index);
    if (config.area[0] === "" && config.maxWidth > 0) {
      // 适配 ie7
      if (layer.ie && layer.ie < 8 && config.btn) {
        layero.width(layero.innerWidth());
      }
      layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
    }
    let area = [layero.innerWidth(), layero.innerHeight()];
    let titHeight = layero.find(doms$1[1]).outerHeight() || 0;
    let btnHeight = layero.find("." + doms$1[6]).outerHeight() || 0;
    let setHeight = function (elem) {
      elem = layero.find(elem);
      elem.height(area[1] - titHeight - btnHeight - 2 * (parseFloat(elem.css("padding-top")) | 0));
    };
    switch (config.type) {
      case 2:
        setHeight("iframe");
        break;
      default:
        if (config.area[1] === "") {
          if (config.maxHeight > 0 && layero.outerHeight() > config.maxHeight) {
            area[1] = config.maxHeight;
            setHeight("." + doms$1[5]);
          } else if (config.fixed && area[1] >= $$1(window).height()) {
            area[1] = $$1(window).height();
            setHeight("." + doms$1[5]);
          }
        } else {
          setHeight("." + doms$1[5]);
        }
        break;
    }
    return that;
  };

  // 计算坐标
  Class.pt.offset = function () {
    let that = this,
      config = that.config,
      layero = that.layero;
    let area = [layero.outerWidth(), layero.outerHeight()];
    let type = typeof config.offset === "object";
    that.offsetTop = ($$1(window).height() - area[1]) / 2;
    that.offsetLeft = ($$1(window).width() - area[0]) / 2;
    if (type) {
      that.offsetTop = config.offset[0];
      that.offsetLeft = config.offset[1] || that.offsetLeft;
    } else if (config.offset !== "auto") {
      if (config.offset === "t") {
        // 上
        that.offsetTop = 0;
      } else if (config.offset === "r") {
        // 右
        that.offsetLeft = $$1(window).width() - area[0];
      } else if (config.offset === "b") {
        // 下
        that.offsetTop = $$1(window).height() - area[1];
      } else if (config.offset === "l") {
        // 左
        that.offsetLeft = 0;
      } else if (config.offset === "lt") {
        // 左上
        that.offsetTop = 0;
        that.offsetLeft = 0;
      } else if (config.offset === "lb") {
        // 左下
        that.offsetTop = $$1(window).height() - area[1];
        that.offsetLeft = 0;
      } else if (config.offset === "rt") {
        // 右上
        that.offsetTop = 0;
        that.offsetLeft = $$1(window).width() - area[0];
      } else if (config.offset === "rb") {
        // 右下
        that.offsetTop = $$1(window).height() - area[1];
        that.offsetLeft = $$1(window).width() - area[0];
      } else {
        that.offsetTop = config.offset;
      }
    }
    if (!config.fixed) {
      that.offsetTop = /%$/.test(that.offsetTop) ? $$1(window).height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
      that.offsetLeft = /%$/.test(that.offsetLeft) ? $$1(window).width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
      that.offsetTop += $$1(window).scrollTop();
      that.offsetLeft += $$1(window).scrollLeft();
    }

    // 最小化窗口时的自适应
    if (layero.data("maxminStatus") === "min") {
      that.offsetTop = $$1(window).height() - (layero.find(doms$1[1]).outerHeight() || 0);
      that.offsetLeft = layero.css("left");
    }

    // 设置坐标
    layero.css({
      top: that.offsetTop,
      left: that.offsetLeft
    });
  };

  // Tips
  Class.pt.tips = function () {
    let that = this,
      config = that.config,
      layero = that.layero;
    let layArea = [layero.outerWidth(), layero.outerHeight()],
      follow = $$1(config.follow);
    if (!follow[0]) follow = $$1("body");
    let goal = {
        width: follow.outerWidth(),
        height: follow.outerHeight(),
        top: follow.offset().top,
        left: follow.offset().left
      },
      tipsG = layero.find(".layui-layer-TipsG");
    let guide = config.tips[0];
    config.tips[1] || tipsG.remove();
    goal.autoLeft = function () {
      if (goal.left + layArea[0] - $$1(window).width() > 0) {
        goal.tipLeft = goal.left + goal.width - layArea[0];
        tipsG.css({
          right: 12,
          left: "auto"
        });
      } else {
        goal.tipLeft = goal.left;
      }
    };

    // 辨别 tips 的方位
    // 21 为箭头大小 8*2 + 箭头相对父元素的top偏移 5
    goal.where = [function () {
      // 上
      goal.autoLeft();
      goal.tipTop = goal.top - layArea[1] - 10;
      tipsG.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", config.tips[1]);
    }, function () {
      // 右
      goal.tipLeft = goal.left + goal.width + 10;
      goal.tipTop = goal.top - (goal.height * 0.75 < 21 ? 21 - goal.height * 0.5 : 0);
      goal.tipTop = Math.max(goal.tipTop, 0);
      tipsG.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", config.tips[1]);
    }, function () {
      // 下
      goal.autoLeft();
      goal.tipTop = goal.top + goal.height + 10;
      tipsG.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", config.tips[1]);
    }, function () {
      // 左
      goal.tipLeft = goal.left - layArea[0] - 10;
      goal.tipTop = goal.top - (goal.height * 0.75 < 21 ? 21 - goal.height * 0.5 : 0);
      goal.tipTop = Math.max(goal.tipTop, 0);
      tipsG.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", config.tips[1]);
    }];
    goal.where[guide - 1]();

    /* 8*2为小三角形占据的空间 */
    if (guide === 1) {
      goal.top - ($$1(window).scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
    } else if (guide === 2) {
      $$1(window).width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal.where[3]();
    } else if (guide === 3) {
      goal.top - $$1(window).scrollTop() + goal.height + layArea[1] + 8 * 2 - $$1(window).height() > 0 && goal.where[0]();
    } else if (guide === 4) {
      layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]();
    }
    layero.find("." + doms$1[5]).css({
      "background-color": config.tips[1],
      "padding-right": config.closeBtn ? "30px" : ""
    });
    layero.css({
      left: goal.tipLeft - (config.fixed ? $$1(window).scrollLeft() : 0),
      top: goal.tipTop - (config.fixed ? $$1(window).scrollTop() : 0)
    });
  };

  // 拖拽层
  Class.pt.move = function () {
    let that = this;
    let config = that.config;
    let _DOC = $$1(document);
    let layero = that.layero;
    let DATA_NAME = ["LAY_MOVE_DICT", "LAY_RESIZE_DICT"];
    let moveElem = layero.find(config.move);
    let resizeElem = layero.find(".layui-layer-resize");

    // 给指定元素添加拖动光标
    if (config.move) moveElem.css("cursor", "move");

    // 按下拖动元素
    moveElem.on("mousedown", function (e) {
      if (e.button) {
        return;
      } // 不是左键不处理
      let othis = $$1(this);
      let dict = {};
      if (config.move) {
        dict.layero = layero;
        dict.config = config;
        dict.offset = [e.clientX - parseFloat(layero.css("left")), e.clientY - parseFloat(layero.css("top"))];
        othis.data(DATA_NAME[0], dict);
        Store.eventMoveElem = othis;
        Store.moveElem.css("cursor", "move").show();
      }
      e.preventDefault();
    });

    // 按下右下角拉伸
    resizeElem.on("mousedown", function (e) {
      let othis = $$1(this);
      let dict = {};
      if (config.resize) {
        dict.layero = layero;
        dict.config = config;
        dict.offset = [e.clientX, e.clientY];
        dict.index = that.index;
        dict.area = [layero.outerWidth(), layero.outerHeight()];
        othis.data(DATA_NAME[1], dict);
        Store.eventResizeElem = othis;
        Store.moveElem.css("cursor", "se-resize").show();
      }
      e.preventDefault();
    });

    // 拖动元素，避免多次调用实例造成事件叠加
    if (Store.docEvent) return that;
    _DOC.on("mousemove", function (e) {
      // 拖拽移动
      if (Store.eventMoveElem) {
        let dict = Store.eventMoveElem.data(DATA_NAME[0]) || {},
          layero = dict.layero,
          config = dict.config;
        let X = e.clientX - dict.offset[0];
        let Y = e.clientY - dict.offset[1];
        let fixed = layero.css("position") === "fixed";
        e.preventDefault();
        dict.stX = fixed ? 0 : $$1(window).scrollLeft();
        dict.stY = fixed ? 0 : $$1(window).scrollTop();

        // 控制元素不被拖出窗口外
        if (!config.moveOut) {
          let setRig = $$1(window).width() - layero.outerWidth() + dict.stX;
          let setBot = $$1(window).height() - layero.outerHeight() + dict.stY;
          X < dict.stX && (X = dict.stX);
          X > setRig && (X = setRig);
          Y < dict.stY && (Y = dict.stY);
          Y > setBot && (Y = setBot);
        }

        // 拖动时跟随鼠标位置
        layero.css({
          left: X,
          top: Y
        });
      }

      // Resize
      if (Store.eventResizeElem) {
        let dict = Store.eventResizeElem.data(DATA_NAME[1]) || {};
        let config = dict.config;
        let X = e.clientX - dict.offset[0];
        let Y = e.clientY - dict.offset[1];
        e.preventDefault();

        // 拉伸宽高
        layer.style(dict.index, {
          width: dict.area[0] + X,
          height: dict.area[1] + Y
        });
        config.resizing && config.resizing(dict.layero);
      }
    }).on("mouseup", function (e) {
      if (Store.eventMoveElem) {
        let dict = Store.eventMoveElem.data(DATA_NAME[0]) || {};
        let config = dict.config;
        Store.eventMoveElem.removeData(DATA_NAME[0]);
        delete Store.eventMoveElem;
        Store.moveElem.hide();
        config.moveEnd && config.moveEnd(dict.layero);
      }
      if (Store.eventResizeElem) {
        Store.eventResizeElem.removeData(DATA_NAME[1]);
        delete Store.eventResizeElem;
        Store.moveElem.hide();
      }
    });
    Store.docEvent = true; // 已给 document 执行全局事件
    return that;
  };
  Class.pt.btnLoading = function (btnElem, isLoading) {
    if (isLoading) {
      let loadingTpl = '<i class="layui-layer-btn-loading-icon layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';
      if (btnElem.find(".layui-layer-btn-loading-icon")[0]) return;
      btnElem.addClass("layui-layer-btn-is-loading").attr({
        disabled: ""
      }).prepend(loadingTpl);
    } else {
      btnElem.removeClass("layui-layer-btn-is-loading").removeAttr("disabled").find(".layui-layer-btn-loading-icon").remove();
    }
  };
  Class.pt.callback = function () {
    let that = this,
      layero = that.layero,
      config = that.config;
    that.openLayer();
    function executeSuccess() {
      if (config.success) {
        config.success(layero, that.index, that);
      }
    }
    if (config.type === 2) {
      layero.find("iframe").on("load", executeSuccess);
    } else {
      executeSuccess();
    }
    layer.ie === 6 && that.IE6(layero);

    // 按钮事件绑定
    handleButtonEvents(layero, config, that);

    // 右上角关闭回调
    layero.find("." + doms$1[7]).on("click", function () {
      handleCancel(config, that);
    });

    // 点击遮罩关闭
    if (config.shadeClose) {
      that.shadeo.on("click", function () {
        layer.close(that.index);
      });
    }

    // 最小化
    layero.find(".layui-layer-min").on("click", function () {
      handleMinimize(config, layero, that);
    });

    // 全屏/还原
    layero.find(".layui-layer-max").on("click", function () {
      handleMaximize(config, layero, that);
    });
    config.end && (Store.end[that.index] = config.end);
    config.beforeEnd && (Store.beforeEnd[that.index] = $$1.proxy(config.beforeEnd, config, layero, that.index, that));
  };

  // 处理按钮点击事件
  function handleButtonEvents(layero, config, that) {
    layero.find("." + doms$1[6]).children("a").on("click", function () {
      let btnElem = $$1(this);
      let index = btnElem.index();
      if (btnElem.attr("disabled")) return;
      if (config.btnAsync) {
        handleAsyncButton(btnElem, config, index, that);
      } else {
        handleNormalButton(btnElem, config, index, that);
      }
    });
  }

  // 处理普通按钮
  function handleNormalButton(btnElem, config, index, that) {
    if (index === 0) {
      (config.yes || config["btn1"] || function () {
        layer.close(that.index);
      })(that.index, that.layero, that);
    } else {
      let close = config["btn" + (index + 1)] && config["btn" + (index + 1)](that.index, that.layero, that);
      if (close !== false) {
        layer.close(that.index);
      }
    }
  }

  // 处理异步按钮
  function handleAsyncButton(btnElem, config, index, that) {
    let btnCallback = index === 0 ? config.yes || config["btn1"] : config["btn" + (index + 1)];
    that.loading = function (isLoading) {
      console.log("我被执行了");
      that.btnLoading(btnElem, isLoading);
    };
    if (btnCallback) {
      Util.promiseLikeResolve(btnCallback.call(config, that.index, that.layero, that)).then(function (result) {
        if (result !== false) {
          layer.close(that.index);
        }
      }, function (reason) {
        reason !== undefined && console.error("layer error hint: " + reason);
      });
    } else {
      layer.close(that.index);
    }
  }

  // 处理取消按钮
  function handleCancel(config, that) {
    let close = config.cancel && config.cancel(that.index, that.layero, that);
    close === false || layer.close(that.index);
  }

  // 处理最小化按钮
  function handleMinimize(config, layero, that) {
    let min = config.min && config.min(layero, that.index, that);
    min === false || layer.min(that.index, config);
  }

  // 处理最大化按钮
  function handleMaximize(config, layero, that) {
    let maxButton = layero.find(".layui-layer-max");
    if (maxButton.hasClass("layui-layer-maxmin")) {
      layer.restore(that.index);
      config.restore && config.restore(layero, that.index, that);
    } else {
      layer.full(that.index, config);
      setTimeout(function () {
        config.full && config.full(layero, that.index, that);
      }, 100);
    }
  }
  Class.pt.IE6 = function (layero) {
    // 隐藏select
    $$1("select").each(function (index, value) {
      let sthis = $$1(this);
      if (!sthis.parents("." + doms$1[0])[0]) {
        sthis.css("display") === "none" || sthis.attr({
          layer: "1"
        }).hide();
      }
      sthis = null;
    });
  };

  // 需依赖原型的对外方法
  Class.pt.openLayer = function () {
    let that = this;

    // 置顶当前窗口
    layer.zIndex = that.config.zIndex;
    layer.setTop = function (layero) {
      let setZindex = function () {
        layer.zIndex++;
        layero.css("z-index", layer.zIndex + 1);
      };
      layer.zIndex = parseInt(layero[0].style.zIndex);
      layero.on("mousedown", setZindex);
      return layer.zIndex;
    };
  };

  /** Returns the object type of the given payload */
  function getType(payload) {
      return Object.prototype.toString.call(payload).slice(8, -1);
  }

  /** Returns whether the payload is an array */
  function isArray(payload) {
      return getType(payload) === 'Array';
  }

  /**
   * Returns whether the payload is a plain JavaScript object (excluding special classes or objects
   * with other prototypes)
   */
  function isPlainObject(payload) {
      if (getType(payload) !== 'Object')
          return false;
      const prototype = Object.getPrototypeOf(payload);
      return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
  }

  /** Returns whether the payload is a string */
  function isString(payload) {
      return getType(payload) === 'String';
  }

  /** Returns whether the payload is a function (regular or async) */
  function isFunction(payload) {
      return typeof payload === 'function';
  }

  /**
   * Does a generic check to check that the given payload is of a given type. In cases like Number, it
   * will return true for NaN as NaN is a Number (thanks javascript!); It will, however, differentiate
   * between object and null
   *
   * @throws {TypeError} Will throw type error if type is an invalid type
   */
  function isType(payload, type) {
      if (!(type instanceof Function)) {
          throw new TypeError('Type must be a function');
      }
      if (!Object.prototype.hasOwnProperty.call(type, 'prototype')) {
          throw new TypeError('Type is not a class');
      }
      // Classes usually have names (as functions usually have names)
      const name = type.name;
      return getType(payload) === name || Boolean(payload && payload.constructor === type);
  }

  function isInstanceOf(value, classOrClassName) {
      if (typeof classOrClassName === 'function') {
          for (let p = value; p; p = Object.getPrototypeOf(p)) {
              if (isType(p, classOrClassName)) {
                  return true;
              }
          }
          return false;
      }
      else {
          for (let p = value; p; p = Object.getPrototypeOf(p)) {
              if (getType(p) === classOrClassName) {
                  return true;
              }
          }
          return false;
      }
  }

  /**
   * Returns whether the payload is a number (but not NaN)
   *
   * This will return `false` for `NaN`!!
   */
  function isNumber(payload) {
      return getType(payload) === 'Number' && !isNaN(payload);
  }

  /**
   * Returns whether the payload is a plain JavaScript object (excluding special classes or objects
   * with other prototypes)
   */
  function isObject(payload) {
      return isPlainObject(payload);
  }

  class HTMLGenerator {
    // 索引
    constructor(config, index) {
      this.config = config;
      this.index = index;
      //计算索引值
      this.zIndex = this.config.zIndex + this.index;
    }

    // 获取遮罩层的html
    getShadeHTML() {
      let shadeHTML = "";
      if (this.config.shade) {
        shadeHTML = Util.sprintf(Constants.HTML.shade, Constants.CLASSES.shade, `${Constants.CLASSES.shade}${this.index}`, this.index, this.zIndex - 1);
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
      const borderClass = [MAP.TYPE.DIALOG, MAP.TYPE.IFRAME].includes(this.config.type) && !this.config.shade ? Constants.CLASSES.layerBorder : "";
      const layerType = MAP.TYPE_NAME[this.config.type];
      return Util.sprintf(Constants.HTML.mainWrap[0], Constants.CLASSES.layuiLayer, `layui-layer-${layerType}`, borderClass, this.config.skin || "", `${Constants.CLASSES.layuiLayer}${this.index}`,
      //id
      layerType,
      //type
      this.index,
      //次数
      this.config.time,
      //时间
      isObject(this.config.content) ? "object" : "string",
      //类型
      this.zIndex, this.config.area[0], this.config.area[1], this.config.fixed ? "fixed;" : "absolute;");
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
      return isObject(this.config.content) && this.config.type != MAP.TYPE.IFRAME ? "" : titleHTML;
    }
    #getContentBeginHTML() {
      // 是信息框且设置了图标就添加一点边距
      const paddingClass = this.config.type == MAP.TYPE.DIALOG && this.config.icon !== -1 ? Constants.CLASSES.layerPadding : "";
      const loadingClass = this.config.type == MAP.TYPE.LOADING ? `${Constants.CLASSES.layerLoading}${this.config.icon}` : "";
      return Util.sprintf(Constants.HTML.content[0], this.config.id ? this.config.id : "",
      //id
      paddingClass,
      //边距
      loadingClass // 加载图标
      );
    }
    #getIconHtml() {
      // 动画基础类
      const animClass = [Constants.CLASSES.layuiAnim, Constants.CLASSES.layuiAnimRotate, Constants.CLASSES.layuiAnimLoop].join(" ");

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

      console.log(this.config.content);
      if (isPageType && isInstanceOf(this.config.content, $$1)) {
        console.log('页面类型');
        return "";
      }

      // 如果 content 存在，返回 content，否则返回空字符串
      return this.config.content ? this.config.content : "";
    }
    #getBottomBtnHTHML() {
      const html = [];
      //加入底部按钮区域
      if (this.config.btn) {
        const btnAlignClass = this.config.btnAlign ? `${Constants.CLASSES.layerBtn}-${this.config.btnAlign}` : "";
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
        html = Util.sprintf(Constants.HTML.closeBtn, Constants.CLASSES.layerClose, `${Constants.CLASSES.layerClose}${closeButton}`);
      }
      return html;
    }
    #getMinMaxBtnHTML() {
      const html = [];
      // 当 this.config.maxmin 为 true，并且 this.config.type 的值是 1 或 2 时，ismax 的值为 true,否则，ismax 的值为 false

      let ismax = this.config.maxmin && [MAP.TYPE.PAGE, MAP.TYPE.IFRAME].includes(this.config.type);
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

      if (isString(this.config.btn)) {
        this.config.btn = [this.config.btn];
      }

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
        [MAP.FACE.SMILE]: Constants.CLASSES.faceSmile
      };

      // 加载图标
      if (this.config.icon === MAP.FACE.LOADING) {
        return Util.sprintf(Constants.HTML.dialogLoadIcon, animClass);
      }
      const faceClassName = faceClassNameMap[this.config.icon] || faceClassNameMap[MAP.FACE.TIPS];
      return Util.sprintf(Constants.HTML.faceIcon, faceClassName);
    }

    // 获取加载层图标
    #getLoadingIcon(animClass) {
      const loadingIconsMap = {
        [MAP.LOADING_ICON.BALL_SPIN]: Constants.CLASSES.iconLoading,
        [MAP.LOADING_ICON.BALL_CLIP_ROTATE_GRAY]: Constants.CLASSES.iconLoading1,
        [MAP.LOADING_ICON.BALL_CLIP_ROTATE_BLUE]: Constants.CLASSES.iconLoading2
      };
      if (this.config.icon === 2) {
        return Util.sprintf(`<div class="%s "%s"></div>`, loadingIconsMap[MAP.LOADING_ICON.BALL_CLIP_ROTATE_BLUE], animClass);
      }
      const iconClass = loadingIconsMap[this.config.icon] || loadingIconsMap[MAP.LOADING_ICON.BALL_SPIN];
      return Util.sprintf(Constants.HTML.loadIcon, iconClass, animClass);
    }
  }

  // tips定位的逻辑单独抽离成一个类
  class TipsLocation {
    tipLeft = 0;
    tipTop = 0;
    constructor(follow, config, layero) {
      this.follow = follow;
      this.config = config;
      this.layero = layero;

      // 成员变量
      this.width = follow.outerWidth();
      this.height = follow.outerHeight();
      this.top = follow.offset().top;
      this.left = follow.offset().left;

      // 背景色
      this.tipColor = config.tips[1];
      this.layeroouterHeight = layero.outerHeight();
      this.layeroOuterWidth = layero.outerWidth();
      // 方位
      this.guide = config.tips[0];
    }

    // 更新箭头类
    #updateArrow(position) {
      const arrowClass = {
        T: Constants.CLASSES.layerTipsT,
        R: Constants.CLASSES.layerTipsR,
        B: Constants.CLASSES.layerTipsB,
        L: Constants.CLASSES.layerTipsL
      };

      // 边框的方位
      const borderPosition = position === "T" || position === "B" ? "right" : "bottom";
      this.layero.find(`.${Constants.CLASSES.layerTipsG}`).removeClass(Object.values(arrowClass).join(" ")).addClass(arrowClass[position]).css(`border-${borderPosition}-color`, this.tipColor);
    }
    #autoAdjustLeft() {
      this.tipLeft = this.left + this.layeroOuterWidth > $$1(window).width() ? this.left + this.width - this.layeroOuterWidth : this.left;
    }
    // Public API
    // 设置箭头位置
    setupArrowPosition(guide) {
      // 基于导向的箭头位置
      const arrowPositions = {
        [MAP.TIPS_DIRECTION.TOP]: () => {
          this.#autoAdjustLeft();
          this.tipTop = this.top - this.layeroouterHeight - 10;
          this.#updateArrow("T");
        },
        [MAP.TIPS_DIRECTION.RIGHT]: () => {
          this.tipLeft = this.left + this.width + 10;
          this.tipTop = Math.max(this.top - (this.height * 0.75 < 21 ? 21 - this.height * 0.5 : 0), 0);
          this.#updateArrow("R");
        },
        [MAP.TIPS_DIRECTION.BOTTOM]: () => {
          this.#autoAdjustLeft();
          this.tipTop = this.top + this.height + 10;
          this.#updateArrow("B");
        },
        [MAP.TIPS_DIRECTION.LEFT]: () => {
          this.tipLeft = this.left - this.layeroOuterWidth - 10;
          this.tipTop = Math.max(this.top - (this.height * 0.75 < 21 ? 21 - this.height * 0.5 : 0), 0);
          this.#updateArrow("L");
        }
      };
      arrowPositions[guide || this.guide](); // 应用初始箭头位置
    }

    // 溢出的情况调整
    overflowAdjustment() {
      // 调整溢流或屏幕边缘情况
      const windowHeight = $$1(window).height();
      const windowWidth = $$1(window).width();
      const scrollTop = $$1(window).scrollTop();
      // 8*2为小三角形占据的空间
      const triangle = 2 * 8;
      const overflowAdjustments = {
        [MAP.TIPS_DIRECTION.TOP]: () => {
          if (this.top - (scrollTop + this.layeroouterHeight + triangle) < 0) {
            this.setupArrowPosition(3);
          }
        },
        [MAP.TIPS_DIRECTION.RIGHT]: () => {
          if (windowWidth - (this.left + this.width + this.layeroOuterWidth + triangle) < 0) {
            this.setupArrowPosition(4);
          }
        },
        [MAP.TIPS_DIRECTION.BOTTOM]: () => {
          if (this.top + this.height + this.layeroouterHeight + triangle - windowHeight > 0) {
            this.setupArrowPosition(1);
          }
        },
        [MAP.TIPS_DIRECTION.LEFT]: () => {
          if (this.layeroOuterWidth + triangle > this.left) {
            this.setupArrowPosition(2);
          }
        }
      };
      overflowAdjustments[this.guide]();
    }
    updatePosition() {
      this.layero.css({
        left: this.tipLeft - (this.config.fixed ? $$1(window).scrollLeft() : 0),
        top: this.tipTop - (this.config.fixed ? $$1(window).scrollTop() : 0)
      });
    }
  }

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
        shared.beforeEnd[this.index] = this.config.beforeEnd.bind(this.config, this.layero, this.index, this.container);
      }
    }
    handleButtonEvents() {
      let that = this;
      this.layero.find(`.${Constants.CLASSES.layerBtn}`).children("a").on("click", function () {
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
        const yesCallback = this.config.yes || this.config[`btn${btnIndex + 1}`] || defaultClose;

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
        Util.promiseLikeResolve(btnCallback.call(this.config, this.index, this.layero, this.container)).then(result => {
          if (result !== false) {
            this.layer.close(this.index);
          }
        }, reason => {
          reason !== undefined && console.error("layer error hint: " + reason);
        });
      } else {
        this.layer.close(this.index);
      }
    }
    winClose() {
      this.layero.find(`.${Constants.CLASSES.layerClose}`).on("click", () => {
        let cancelCallback = this.config.cancel && this.config.cancel(this.index, this.layero, this.container);
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
        let callback = this.config.min && this.config.min(this.layero, this.index, this.container);
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
          this.config.restore && this.config.restore(this.layero, this.index, this.container);
        } else {
          this.layer.full(this.index, this.config);
          setTimeout(() => {
            this.config.full && this.config.full(this.layero, this.index, this.container);
          }, 100);
        }
      });
    }
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var draggabilly$1 = {exports: {}};

  var getSize = {exports: {}};

  /*!
   * Infinite Scroll v2.0.4
   * measure size of elements
   * MIT license
   */

  var hasRequiredGetSize;

  function requireGetSize () {
  	if (hasRequiredGetSize) return getSize.exports;
  	hasRequiredGetSize = 1;
  	(function (module) {
  		( function( window, factory ) {
  		  if ( module.exports ) {
  		    // CommonJS
  		    module.exports = factory();
  		  } else {
  		    // browser global
  		    window.getSize = factory();
  		  }

  		} )( window, function factory() {

  		// -------------------------- helpers -------------------------- //

  		// get a number from a string, not a percentage
  		function getStyleSize( value ) {
  		  let num = parseFloat( value );
  		  // not a percent like '100%', and a number
  		  let isValid = value.indexOf('%') == -1 && !isNaN( num );
  		  return isValid && num;
  		}

  		// -------------------------- measurements -------------------------- //

  		let measurements = [
  		  'paddingLeft',
  		  'paddingRight',
  		  'paddingTop',
  		  'paddingBottom',
  		  'marginLeft',
  		  'marginRight',
  		  'marginTop',
  		  'marginBottom',
  		  'borderLeftWidth',
  		  'borderRightWidth',
  		  'borderTopWidth',
  		  'borderBottomWidth',
  		];

  		function getZeroSize() {
  		  let size = {
  		    width: 0,
  		    height: 0,
  		    innerWidth: 0,
  		    innerHeight: 0,
  		    outerWidth: 0,
  		    outerHeight: 0,
  		  };
  		  measurements.forEach( ( measurement ) => {
  		    size[ measurement ] = 0;
  		  } );
  		  return size;
  		}

  		// -------------------------- getSize -------------------------- //

  		function getSize( elem ) {
  		  // use querySeletor if elem is string
  		  if ( typeof elem == 'string' ) elem = document.querySelector( elem );

  		  // do not proceed on non-objects
  		  let isElement = elem && typeof elem == 'object' && elem.nodeType;
  		  if ( !isElement ) return;

  		  let style = getComputedStyle( elem );

  		  // if hidden, everything is 0
  		  if ( style.display == 'none' ) return getZeroSize();

  		  let size = {};
  		  size.width = elem.offsetWidth;
  		  size.height = elem.offsetHeight;

  		  let isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  		  // get all measurements
  		  measurements.forEach( ( measurement ) => {
  		    let value = style[ measurement ];
  		    let num = parseFloat( value );
  		    // any 'auto', 'medium' value will be 0
  		    size[ measurement ] = !isNaN( num ) ? num : 0;
  		  } );

  		  let paddingWidth = size.paddingLeft + size.paddingRight;
  		  let paddingHeight = size.paddingTop + size.paddingBottom;
  		  let marginWidth = size.marginLeft + size.marginRight;
  		  let marginHeight = size.marginTop + size.marginBottom;
  		  let borderWidth = size.borderLeftWidth + size.borderRightWidth;
  		  let borderHeight = size.borderTopWidth + size.borderBottomWidth;

  		  // overwrite width and height if we can get it from style
  		  let styleWidth = getStyleSize( style.width );
  		  if ( styleWidth !== false ) {
  		    size.width = styleWidth +
  		      // add padding and border unless it's already including it
  		      ( isBorderBox ? 0 : paddingWidth + borderWidth );
  		  }

  		  let styleHeight = getStyleSize( style.height );
  		  if ( styleHeight !== false ) {
  		    size.height = styleHeight +
  		      // add padding and border unless it's already including it
  		      ( isBorderBox ? 0 : paddingHeight + borderHeight );
  		  }

  		  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  		  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  		  size.outerWidth = size.width + marginWidth;
  		  size.outerHeight = size.height + marginHeight;

  		  return size;
  		}

  		return getSize;

  		} ); 
  	} (getSize));
  	return getSize.exports;
  }

  var unidragger$1 = {exports: {}};

  var evEmitter$1 = {exports: {}};

  /**
   * EvEmitter v2.1.1
   * Lil' event emitter
   * MIT License
   */
  var evEmitter = evEmitter$1.exports;

  var hasRequiredEvEmitter;

  function requireEvEmitter () {
  	if (hasRequiredEvEmitter) return evEmitter$1.exports;
  	hasRequiredEvEmitter = 1;
  	(function (module) {
  		( function( global, factory ) {
  		  // universal module definition
  		  if ( module.exports ) {
  		    // CommonJS - Browserify, Webpack
  		    module.exports = factory();
  		  } else {
  		    // Browser globals
  		    global.EvEmitter = factory();
  		  }

  		}( typeof window != 'undefined' ? window : evEmitter, function() {

  		function EvEmitter() {}

  		let proto = EvEmitter.prototype;

  		proto.on = function( eventName, listener ) {
  		  if ( !eventName || !listener ) return this;

  		  // set events hash
  		  let events = this._events = this._events || {};
  		  // set listeners array
  		  let listeners = events[ eventName ] = events[ eventName ] || [];
  		  // only add once
  		  if ( !listeners.includes( listener ) ) {
  		    listeners.push( listener );
  		  }

  		  return this;
  		};

  		proto.once = function( eventName, listener ) {
  		  if ( !eventName || !listener ) return this;

  		  // add event
  		  this.on( eventName, listener );
  		  // set once flag
  		  // set onceEvents hash
  		  let onceEvents = this._onceEvents = this._onceEvents || {};
  		  // set onceListeners object
  		  let onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  		  // set flag
  		  onceListeners[ listener ] = true;

  		  return this;
  		};

  		proto.off = function( eventName, listener ) {
  		  let listeners = this._events && this._events[ eventName ];
  		  if ( !listeners || !listeners.length ) return this;

  		  let index = listeners.indexOf( listener );
  		  if ( index != -1 ) {
  		    listeners.splice( index, 1 );
  		  }

  		  return this;
  		};

  		proto.emitEvent = function( eventName, args ) {
  		  let listeners = this._events && this._events[ eventName ];
  		  if ( !listeners || !listeners.length ) return this;

  		  // copy over to avoid interference if .off() in listener
  		  listeners = listeners.slice( 0 );
  		  args = args || [];
  		  // once stuff
  		  let onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  		  for ( let listener of listeners ) {
  		    let isOnce = onceListeners && onceListeners[ listener ];
  		    if ( isOnce ) {
  		      // remove listener
  		      // remove before trigger to prevent recursion
  		      this.off( eventName, listener );
  		      // unset once flag
  		      delete onceListeners[ listener ];
  		    }
  		    // trigger listener
  		    listener.apply( this, args );
  		  }

  		  return this;
  		};

  		proto.allOff = function() {
  		  delete this._events;
  		  delete this._onceEvents;
  		  return this;
  		};

  		return EvEmitter;

  		} ) ); 
  	} (evEmitter$1));
  	return evEmitter$1.exports;
  }

  /*!
   * Unidragger v3.0.1
   * Draggable base class
   * MIT license
   */
  var unidragger = unidragger$1.exports;

  var hasRequiredUnidragger;

  function requireUnidragger () {
  	if (hasRequiredUnidragger) return unidragger$1.exports;
  	hasRequiredUnidragger = 1;
  	(function (module) {
  		( function( window, factory ) {
  		  // universal module definition
  		  if ( module.exports ) {
  		    // CommonJS
  		    module.exports = factory(
  		        window,
  		        requireEvEmitter(),
  		    );
  		  } else {
  		    // browser global
  		    window.Unidragger = factory(
  		        window,
  		        window.EvEmitter,
  		    );
  		  }

  		}( typeof window != 'undefined' ? window : unidragger, function factory( window, EvEmitter ) {

  		function Unidragger() {}

  		// inherit EvEmitter
  		let proto = Unidragger.prototype = Object.create( EvEmitter.prototype );

  		// ----- bind start ----- //

  		// trigger handler methods for events
  		proto.handleEvent = function( event ) {
  		  let method = 'on' + event.type;
  		  if ( this[ method ] ) {
  		    this[ method ]( event );
  		  }
  		};

  		let startEvent, activeEvents;
  		if ( 'ontouchstart' in window ) {
  		  // HACK prefer Touch Events as you can preventDefault on touchstart to
  		  // disable scroll in iOS & mobile Chrome metafizzy/flickity#1177
  		  startEvent = 'touchstart';
  		  activeEvents = [ 'touchmove', 'touchend', 'touchcancel' ];
  		} else if ( window.PointerEvent ) {
  		  // Pointer Events
  		  startEvent = 'pointerdown';
  		  activeEvents = [ 'pointermove', 'pointerup', 'pointercancel' ];
  		} else {
  		  // mouse events
  		  startEvent = 'mousedown';
  		  activeEvents = [ 'mousemove', 'mouseup' ];
  		}

  		// prototype so it can be overwriteable by Flickity
  		proto.touchActionValue = 'none';

  		proto.bindHandles = function() {
  		  this._bindHandles( 'addEventListener', this.touchActionValue );
  		};

  		proto.unbindHandles = function() {
  		  this._bindHandles( 'removeEventListener', '' );
  		};

  		/**
  		 * Add or remove start event
  		 * @param {String} bindMethod - addEventListener or removeEventListener
  		 * @param {String} touchAction - value for touch-action CSS property
  		 */
  		proto._bindHandles = function( bindMethod, touchAction ) {
  		  this.handles.forEach( ( handle ) => {
  		    handle[ bindMethod ]( startEvent, this );
  		    handle[ bindMethod ]( 'click', this );
  		    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
  		    if ( window.PointerEvent ) handle.style.touchAction = touchAction;
  		  } );
  		};

  		proto.bindActivePointerEvents = function() {
  		  activeEvents.forEach( ( eventName ) => {
  		    window.addEventListener( eventName, this );
  		  } );
  		};

  		proto.unbindActivePointerEvents = function() {
  		  activeEvents.forEach( ( eventName ) => {
  		    window.removeEventListener( eventName, this );
  		  } );
  		};

  		// ----- event handler helpers ----- //

  		// trigger method with matching pointer
  		proto.withPointer = function( methodName, event ) {
  		  if ( event.pointerId === this.pointerIdentifier ) {
  		    this[ methodName ]( event, event );
  		  }
  		};

  		// trigger method with matching touch
  		proto.withTouch = function( methodName, event ) {
  		  let touch;
  		  for ( let changedTouch of event.changedTouches ) {
  		    if ( changedTouch.identifier === this.pointerIdentifier ) {
  		      touch = changedTouch;
  		    }
  		  }
  		  if ( touch ) this[ methodName ]( event, touch );
  		};

  		// ----- start event ----- //

  		proto.onmousedown = function( event ) {
  		  this.pointerDown( event, event );
  		};

  		proto.ontouchstart = function( event ) {
  		  this.pointerDown( event, event.changedTouches[0] );
  		};

  		proto.onpointerdown = function( event ) {
  		  this.pointerDown( event, event );
  		};

  		// nodes that have text fields
  		const cursorNodes = [ 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION' ];
  		// input types that do not have text fields
  		const clickTypes = [ 'radio', 'checkbox', 'button', 'submit', 'image', 'file' ];

  		/**
  		 * any time you set `event, pointer` it refers to:
  		 * @param {Event} event
  		 * @param {Event | Touch} pointer
  		 */
  		proto.pointerDown = function( event, pointer ) {
  		  // dismiss multi-touch taps, right clicks, and clicks on text fields
  		  let isCursorNode = cursorNodes.includes( event.target.nodeName );
  		  let isClickType = clickTypes.includes( event.target.type );
  		  let isOkayElement = !isCursorNode || isClickType;
  		  let isOkay = !this.isPointerDown && !event.button && isOkayElement;
  		  if ( !isOkay ) return;

  		  this.isPointerDown = true;
  		  // save pointer identifier to match up touch events
  		  this.pointerIdentifier = pointer.pointerId !== undefined ?
  		    // pointerId for pointer events, touch.indentifier for touch events
  		    pointer.pointerId : pointer.identifier;
  		  // track position for move
  		  this.pointerDownPointer = {
  		    pageX: pointer.pageX,
  		    pageY: pointer.pageY,
  		  };

  		  this.bindActivePointerEvents();
  		  this.emitEvent( 'pointerDown', [ event, pointer ] );
  		};

  		// ----- move ----- //

  		proto.onmousemove = function( event ) {
  		  this.pointerMove( event, event );
  		};

  		proto.onpointermove = function( event ) {
  		  this.withPointer( 'pointerMove', event );
  		};

  		proto.ontouchmove = function( event ) {
  		  this.withTouch( 'pointerMove', event );
  		};

  		proto.pointerMove = function( event, pointer ) {
  		  let moveVector = {
  		    x: pointer.pageX - this.pointerDownPointer.pageX,
  		    y: pointer.pageY - this.pointerDownPointer.pageY,
  		  };
  		  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  		  // start drag if pointer has moved far enough to start drag
  		  let isDragStarting = !this.isDragging && this.hasDragStarted( moveVector );
  		  if ( isDragStarting ) this.dragStart( event, pointer );
  		  if ( this.isDragging ) this.dragMove( event, pointer, moveVector );
  		};

  		// condition if pointer has moved far enough to start drag
  		proto.hasDragStarted = function( moveVector ) {
  		  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
  		};

  		// ----- drag ----- //

  		proto.dragStart = function( event, pointer ) {
  		  this.isDragging = true;
  		  this.isPreventingClicks = true; // set flag to prevent clicks
  		  this.emitEvent( 'dragStart', [ event, pointer ] );
  		};

  		proto.dragMove = function( event, pointer, moveVector ) {
  		  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
  		};

  		// ----- end ----- //

  		proto.onmouseup = function( event ) {
  		  this.pointerUp( event, event );
  		};

  		proto.onpointerup = function( event ) {
  		  this.withPointer( 'pointerUp', event );
  		};

  		proto.ontouchend = function( event ) {
  		  this.withTouch( 'pointerUp', event );
  		};

  		proto.pointerUp = function( event, pointer ) {
  		  this.pointerDone();
  		  this.emitEvent( 'pointerUp', [ event, pointer ] );

  		  if ( this.isDragging ) {
  		    this.dragEnd( event, pointer );
  		  } else {
  		    // pointer didn't move enough for drag to start
  		    this.staticClick( event, pointer );
  		  }
  		};

  		proto.dragEnd = function( event, pointer ) {
  		  this.isDragging = false; // reset flag
  		  // re-enable clicking async
  		  setTimeout( () => delete this.isPreventingClicks );

  		  this.emitEvent( 'dragEnd', [ event, pointer ] );
  		};

  		// triggered on pointer up & pointer cancel
  		proto.pointerDone = function() {
  		  this.isPointerDown = false;
  		  delete this.pointerIdentifier;
  		  this.unbindActivePointerEvents();
  		  this.emitEvent('pointerDone');
  		};

  		// ----- cancel ----- //

  		proto.onpointercancel = function( event ) {
  		  this.withPointer( 'pointerCancel', event );
  		};

  		proto.ontouchcancel = function( event ) {
  		  this.withTouch( 'pointerCancel', event );
  		};

  		proto.pointerCancel = function( event, pointer ) {
  		  this.pointerDone();
  		  this.emitEvent( 'pointerCancel', [ event, pointer ] );
  		};

  		// ----- click ----- //

  		// handle all clicks and prevent clicks when dragging
  		proto.onclick = function( event ) {
  		  if ( this.isPreventingClicks ) event.preventDefault();
  		};

  		// triggered after pointer down & up with no/tiny movement
  		proto.staticClick = function( event, pointer ) {
  		  // ignore emulated mouse up clicks
  		  let isMouseup = event.type === 'mouseup';
  		  if ( isMouseup && this.isIgnoringMouseUp ) return;

  		  this.emitEvent( 'staticClick', [ event, pointer ] );

  		  // set flag for emulated clicks 300ms after touchend
  		  if ( isMouseup ) {
  		    this.isIgnoringMouseUp = true;
  		    // reset flag after 400ms
  		    setTimeout( () => {
  		      delete this.isIgnoringMouseUp;
  		    }, 400 );
  		  }
  		};

  		// -----  ----- //

  		return Unidragger;

  		} ) ); 
  	} (unidragger$1));
  	return unidragger$1.exports;
  }

  /*!
   * Draggabilly v3.0.0
   * Make that shiz draggable
   * https://draggabilly.desandro.com
   * MIT license
   */
  var draggabilly = draggabilly$1.exports;

  var hasRequiredDraggabilly;

  function requireDraggabilly () {
  	if (hasRequiredDraggabilly) return draggabilly$1.exports;
  	hasRequiredDraggabilly = 1;
  	(function (module) {
  		( function( window, factory ) {
  		  // universal module definition
  		  if ( module.exports ) {
  		    // CommonJS
  		    module.exports = factory(
  		        window,
  		        requireGetSize(),
  		        requireUnidragger(),
  		    );
  		  } else {
  		    // browser global
  		    window.Draggabilly = factory(
  		        window,
  		        window.getSize,
  		        window.Unidragger,
  		    );
  		  }

  		}( typeof window != 'undefined' ? window : draggabilly,
  		    function factory( window, getSize, Unidragger ) {

  		// -------------------------- helpers & variables -------------------------- //

  		function noop() {}

  		let jQuery = window.jQuery;

  		// -------------------------- Draggabilly -------------------------- //

  		function Draggabilly( element, options ) {
  		  // querySelector if string
  		  this.element = typeof element == 'string' ?
  		    document.querySelector( element ) : element;

  		  if ( jQuery ) {
  		    this.$element = jQuery( this.element );
  		  }

  		  // options
  		  this.options = {};
  		  this.option( options );

  		  this._create();
  		}

  		// inherit Unidragger methods
  		let proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

  		/**
  		 * set options
  		 * @param {Object} opts
  		 */
  		proto.option = function( opts ) {
  		  this.options = {
  		    ...this.options,
  		    ...opts,
  		  };
  		};

  		// css position values that don't need to be set
  		const positionValues = [ 'relative', 'absolute', 'fixed' ];

  		proto._create = function() {
  		  // properties
  		  this.position = {};
  		  this._getPosition();

  		  this.startPoint = { x: 0, y: 0 };
  		  this.dragPoint = { x: 0, y: 0 };

  		  this.startPosition = { ...this.position };

  		  // set relative positioning
  		  let style = getComputedStyle( this.element );
  		  if ( !positionValues.includes( style.position ) ) {
  		    this.element.style.position = 'relative';
  		  }

  		  // events
  		  this.on( 'pointerDown', this.handlePointerDown );
  		  this.on( 'pointerUp', this.handlePointerUp );
  		  this.on( 'dragStart', this.handleDragStart );
  		  this.on( 'dragMove', this.handleDragMove );
  		  this.on( 'dragEnd', this.handleDragEnd );

  		  this.setHandles();
  		  this.enable();
  		};

  		// set this.handles  and bind start events to 'em
  		proto.setHandles = function() {
  		  let { handle } = this.options;
  		  if ( typeof handle == 'string' ) {
  		    this.handles = this.element.querySelectorAll( handle );
  		  } else if ( typeof handle == 'object' && handle.length ) {
  		    this.handles = handle;
  		  } else if ( handle instanceof HTMLElement ) {
  		    this.handles = [ handle ];
  		  } else {
  		    this.handles = [ this.element ];
  		  }
  		};

  		const cancelableEvents = [ 'dragStart', 'dragMove', 'dragEnd' ];

  		// duck-punch emitEvent to dispatch jQuery events as well
  		let emitEvent = proto.emitEvent;
  		proto.emitEvent = function( eventName, args ) {
  		  // do not emit cancelable events if dragging is disabled
  		  let isCanceled = !this.isEnabled && cancelableEvents.includes( eventName );
  		  if ( isCanceled ) return;

  		  emitEvent.call( this, eventName, args );

  		  // trigger jQuery event
  		  let jquery = window.jQuery;
  		  if ( !jquery || !this.$element ) return;
  		  // create jQuery event
  		  let event;
  		  let jqArgs = args;
  		  let isFirstArgEvent = args && args[0] instanceof Event;
  		  if ( isFirstArgEvent ) [ event, ...jqArgs ] = args;
  		  /* eslint-disable-next-line new-cap */
  		  let $event = jquery.Event( event );
  		  $event.type = eventName;
  		  this.$element.trigger( $event, jqArgs );
  		};

  		// -------------------------- position -------------------------- //

  		// get x/y position from style
  		proto._getPosition = function() {
  		  let style = getComputedStyle( this.element );
  		  let x = this._getPositionCoord( style.left, 'width' );
  		  let y = this._getPositionCoord( style.top, 'height' );
  		  // clean up 'auto' or other non-integer values
  		  this.position.x = isNaN( x ) ? 0 : x;
  		  this.position.y = isNaN( y ) ? 0 : y;

  		  this._addTransformPosition( style );
  		};

  		proto._getPositionCoord = function( styleSide, measure ) {
  		  if ( styleSide.includes('%') ) {
  		    // convert percent into pixel for Safari, #75
  		    let parentSize = getSize( this.element.parentNode );
  		    // prevent not-in-DOM element throwing bug, #131
  		    return !parentSize ? 0 :
  		      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
  		  }
  		  return parseInt( styleSide, 10 );
  		};

  		// add transform: translate( x, y ) to position
  		proto._addTransformPosition = function( style ) {
  		  let transform = style.transform;
  		  // bail out if value is 'none'
  		  if ( !transform.startsWith('matrix') ) return;

  		  // split matrix(1, 0, 0, 1, x, y)
  		  let matrixValues = transform.split(',');
  		  // translate X value is in 12th or 4th position
  		  let xIndex = transform.startsWith('matrix3d') ? 12 : 4;
  		  let translateX = parseInt( matrixValues[ xIndex ], 10 );
  		  // translate Y value is in 13th or 5th position
  		  let translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  		  this.position.x += translateX;
  		  this.position.y += translateY;
  		};

  		// -------------------------- events -------------------------- //

  		proto.handlePointerDown = function( event, pointer ) {
  		  if ( !this.isEnabled ) return;
  		  // track start event position
  		  // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
  		  this.pointerDownPointer = {
  		    pageX: pointer.pageX,
  		    pageY: pointer.pageY,
  		  };

  		  event.preventDefault();
  		  document.activeElement.blur();
  		  // bind move and end events
  		  this.bindActivePointerEvents( event );
  		  this.element.classList.add('is-pointer-down');
  		};

  		proto.handleDragStart = function() {
  		  if ( !this.isEnabled ) return;

  		  this._getPosition();
  		  this.measureContainment();
  		  // position _when_ drag began
  		  this.startPosition.x = this.position.x;
  		  this.startPosition.y = this.position.y;
  		  // reset left/top style
  		  this.setLeftTop();

  		  this.dragPoint.x = 0;
  		  this.dragPoint.y = 0;

  		  this.element.classList.add('is-dragging');
  		  // start animation
  		  this.animate();
  		};

  		proto.measureContainment = function() {
  		  let container = this.getContainer();
  		  if ( !container ) return;

  		  let elemSize = getSize( this.element );
  		  let containerSize = getSize( container );
  		  let {
  		    borderLeftWidth,
  		    borderRightWidth,
  		    borderTopWidth,
  		    borderBottomWidth,
  		  } = containerSize;
  		  let elemRect = this.element.getBoundingClientRect();
  		  let containerRect = container.getBoundingClientRect();

  		  let borderSizeX = borderLeftWidth + borderRightWidth;
  		  let borderSizeY = borderTopWidth + borderBottomWidth;

  		  let position = this.relativeStartPosition = {
  		    x: elemRect.left - ( containerRect.left + borderLeftWidth ),
  		    y: elemRect.top - ( containerRect.top + borderTopWidth ),
  		  };

  		  this.containSize = {
  		    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
  		    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height,
  		  };
  		};

  		proto.getContainer = function() {
  		  let containment = this.options.containment;
  		  if ( !containment ) return;

  		  let isElement = containment instanceof HTMLElement;
  		  // use as element
  		  if ( isElement ) return containment;

  		  // querySelector if string
  		  if ( typeof containment == 'string' ) {
  		    return document.querySelector( containment );
  		  }
  		  // fallback to parent element
  		  return this.element.parentNode;
  		};

  		// ----- move event ----- //

  		/**
  		 * drag move
  		 * @param {Event} event
  		 * @param {Event | Touch} pointer
  		 * @param {Object} moveVector - x and y coordinates
  		 */
  		proto.handleDragMove = function( event, pointer, moveVector ) {
  		  if ( !this.isEnabled ) return;

  		  let dragX = moveVector.x;
  		  let dragY = moveVector.y;

  		  let grid = this.options.grid;
  		  let gridX = grid && grid[0];
  		  let gridY = grid && grid[1];

  		  dragX = applyGrid( dragX, gridX );
  		  dragY = applyGrid( dragY, gridY );

  		  dragX = this.containDrag( 'x', dragX, gridX );
  		  dragY = this.containDrag( 'y', dragY, gridY );

  		  // constrain to axis
  		  dragX = this.options.axis == 'y' ? 0 : dragX;
  		  dragY = this.options.axis == 'x' ? 0 : dragY;

  		  this.position.x = this.startPosition.x + dragX;
  		  this.position.y = this.startPosition.y + dragY;
  		  // set dragPoint properties
  		  this.dragPoint.x = dragX;
  		  this.dragPoint.y = dragY;
  		};

  		function applyGrid( value, grid, method ) {
  		  if ( !grid ) return value;

  		  method = method || 'round';
  		  return Math[ method ]( value/grid ) * grid;
  		}

  		proto.containDrag = function( axis, drag, grid ) {
  		  if ( !this.options.containment ) return drag;

  		  let measure = axis == 'x' ? 'width' : 'height';

  		  let rel = this.relativeStartPosition[ axis ];
  		  let min = applyGrid( -rel, grid, 'ceil' );
  		  let max = this.containSize[ measure ];
  		  max = applyGrid( max, grid, 'floor' );
  		  return Math.max( min, Math.min( max, drag ) );
  		};

  		// ----- end event ----- //

  		proto.handlePointerUp = function() {
  		  this.element.classList.remove('is-pointer-down');
  		};

  		proto.handleDragEnd = function() {
  		  if ( !this.isEnabled ) return;

  		  // use top left position when complete
  		  this.element.style.transform = '';
  		  this.setLeftTop();
  		  this.element.classList.remove('is-dragging');
  		};

  		// -------------------------- animation -------------------------- //

  		proto.animate = function() {
  		  // only render and animate if dragging
  		  if ( !this.isDragging ) return;

  		  this.positionDrag();
  		  requestAnimationFrame( () => this.animate() );
  		};

  		// left/top positioning
  		proto.setLeftTop = function() {
  		  let { x, y } = this.position;
  		  this.element.style.left = `${x}px`;
  		  this.element.style.top = `${y}px`;
  		};

  		proto.positionDrag = function() {
  		  let { x, y } = this.dragPoint;
  		  this.element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  		};

  		// ----- methods ----- //

  		/**
  		 * @param {Number} x
  		 * @param {Number} y
  		 */
  		proto.setPosition = function( x, y ) {
  		  this.position.x = x;
  		  this.position.y = y;
  		  this.setLeftTop();
  		};

  		proto.enable = function() {
  		  if ( this.isEnabled ) return;
  		  this.isEnabled = true;
  		  this.bindHandles();
  		};

  		proto.disable = function() {
  		  if ( !this.isEnabled ) return;
  		  this.isEnabled = false;
  		  if ( this.isDragging ) this.dragEnd();
  		  this.unbindHandles();
  		};

  		const resetCssProperties = [ 'transform', 'left', 'top', 'position' ];

  		proto.destroy = function() {
  		  this.disable();
  		  // reset styles
  		  resetCssProperties.forEach( ( prop ) => {
  		    this.element.style[ prop ] = '';
  		  } );
  		  // unbind handles
  		  this.unbindHandles();
  		  // remove jQuery data
  		  if ( this.$element ) this.$element.removeData('draggabilly');
  		};

  		// ----- jQuery bridget ----- //

  		// required for jQuery bridget
  		proto._init = noop;

  		if ( jQuery && jQuery.bridget ) {
  		  jQuery.bridget( 'draggabilly', Draggabilly );
  		}

  		// -----  ----- //

  		return Draggabilly;

  		} ) ); 
  	} (draggabilly$1));
  	return draggabilly$1.exports;
  }

  var draggabillyExports = requireDraggabilly();
  var Draggabilly = /*@__PURE__*/getDefaultExportFromCjs(draggabillyExports);

  class Container {
    //成员变量
    config;
    // 弹层dom的jq对象
    layero;
    // 遮罩层jq对象
    shadeo;
    // 弹层的外部宽度(包括填充、边框和可选边距)
    layeroOuterWidth;
    // 外部高度
    layeroouterHeight;
    // 保存当前实例的index

    index;

    // 拖拽的元素
    $moveEl;

    // 当前被点击的按钮的dom对象,例如，信息框底部的按钮
    $btnElem;
    constructor(options, layer) {
      // 最新的索引自增
      ++shared.index;
      this.index = shared.index;

      // layer对象
      this.layer = layer;
      // 合并配置
      this.config = $$1.extend({}, Constants.DEFAULTS, shared.config, {
        maxWidth: $$1(window).width() - 15 * 2
      }, options);

      // body是否准备完毕,完毕直接调用，没有就延迟30毫秒
      this.initContainer();
    }

    //创建容器
    initContainer() {
      // 若 id 对应的弹层已经存在，则不重新创建 layui-layer
      if (this.config.id && $$1(`.${Constants.CLASSES.layuiLayer}`).find(`#${this.config.id}`)[0]) ;

      // 是否移除活动元素的焦点
      if (this.config.removeFocus && document.activeElement) {
        document.activeElement.blur(); // 将原始的聚焦节点失焦
      }
      this.initAreaOption();
      this.adjustLayerSettings();

      // 追加html到页面上
      this.appendHTML();
      this.$moveEl = $$1(Util.sprintf(Constants.HTML.move, Constants.CLASSES.move, Constants.CLASSES.move));
      $$1(`#${Constants.CLASSES.move}`)[0] || $$1("body").append(this.$moveEl);
      this.layeroOuterWidth = this.layero.outerWidth();
      this.layeroouterHeight = this.layero.outerHeight();
      this.config.scrollbar || Util.setScrollbar(this.index);

      // 设置弹出框的高度
      this.auto();

      //遮罩
      this.shadeoHandle();
      if (this.config.type == MAP.TYPE.TIPS) {
        //tips层，调用tips的方法
        this.tips();
      } else {
        // 坐标自适应浏览器窗口尺寸
        this.offset();

        // 获取拖拽层的元素堆叠索引
        // const movezIndex = parseInt(
        //   Util.getStyle(
        //     document.getElementById(Constants.CLASSES.move),
        //     "z-index"
        //   )
        // );

        // if (!movezIndex) {
        //   console.log(this.layero);

        //   this.layero
        //     .css("visibility", "hidden")
        //     .offset()
        //     .css("visibility", "visible");
        // }
      }

      //若是固定定位，则跟随 resize 事件来自适应坐标
      if (this.config.fixed) ;

      // 是否自动关闭弹出层
      this.autoClose();

      // 拖拽处理
      // this.move();

      // 事件绑定,这里用类的方式来实现，比较友好
      new EventBinder(this);

      // 设置动画
      this.setAnim(this.layero);

      // 记录配置信息
      this.layero.data("config", this.config);
    }
    appendHTML() {
      // 使用类来生成字符串
      const htmlGenerator = new HTMLGenerator(this.config, this.index);
      const html = htmlGenerator.getContainerHTML();

      // 加入遮罩层
      $$1("body").append(htmlGenerator.getShadeHTML());
      // 加入主体内容
      $$1("body").append(html);

      // 保存为成员变量,方便后续使用
      this.layero = Util.getLayeroByIndex(this.index);
      this.shadeo = Util.getShadeoByIndex(this.index);

      // 如果是一个jquery对象,那么则是捕获层
      if (isInstanceOf(this.config.content, $$1) && !this.config.content.parents(`.${Constants.CLASSES.layuiLayer}`)[0]) {
        console.log("捕获");
        console.log(this.layero.find(`.${Constants.CLASSES.layerContent}`));
        console.log(this.config.content);
        this.layero.find(`.${Constants.CLASSES.layerContent}`).wrapInner(this.config.content.show());
      }
    }

    // 自动关闭弹出层
    autoClose() {
      if (this.config.time > 0) {
        setTimeout(() => {
          this.layer.close(this.index);
        }, this.config.time);
      }
    }

    // 设置动画
    setAnim(layero) {
      // anim 兼容旧版 shift
      if (this.config.shift) {
        this.config.anim = this.config.shift;
      }
      const animationClassMap = {
        0: Constants.CLASSES.layerAnim0,
        1: Constants.CLASSES.layerAnim1,
        2: Constants.CLASSES.layerAnim2,
        3: Constants.CLASSES.layerAnim3,
        4: Constants.CLASSES.layerAnim4,
        5: Constants.CLASSES.layerAnim5,
        6: Constants.CLASSES.layerAnim6,
        slideDown: Constants.CLASSES.animSlideDown,
        slideLeft: Constants.CLASSES.animSlideLeft,
        slideUp: Constants.CLASSES.animSlideUp,
        slideRight: Constants.CLASSES.animSlideRight
      };
      const animationClass = animationClassMap[this.config.anim];
      if (!animationClass) return;

      // 为兼容 jQuery3.0 的 css 动画影响元素尺寸计算
      const animationFullClass = `${Constants.CLASSES.layerAnim} ${animationClass}`;
      layero.addClass(animationFullClass).one("animationend", () => {
        layero.removeClass(animationFullClass);
      });
    }

    // 自动更新位置处理
    autoUpdatePosi() {
      if (!shared.events.resize[this.index]) {
        //如果当前实例对应的resize事件没有设置

        shared.events.resize[this.index] = () => {
          // 调用 offset 方法
          this.offset();

          // 判断 area 是否为百分比格式，如果是则调用 auto 方法
          const isPercentage = this.config.area.some(area => /^\d+%$/.test(area));
          if (isPercentage) this.auto(this.index);

          // 如果类型为 4，调用 tips 方法
          if (this.config.type === MAP.TYPE.TIPS) this.tips();
        };

        // 此处 resize 事件不会一直叠加，当关闭弹层时会移除该事件
        $$1(window).on("resize", shared.events.resize[this.index]);
      }
    }

    // 设置弹出框的高度和宽度(弹出框的位置)
    auto() {
      if (this.config.area[0] === "" && this.config.maxWidth > 0) {
        this.layeroOuterWidth > this.config.maxWidth && this.layero.width(this.config.maxWidth);
      }
      const layeroInnerHeight = this.layero.innerHeight();
      if (this.config.type === MAP.TYPE.IFRAME) {
        this.setHeight("iframe");
      } else {
        if (this.config.area[1] === "") {
          if (this.config.maxHeight > 0 && this.layero.outerHeight() > this.config.maxHeight) {
            layeroInnerHeight = this.config.maxHeight;
            this.setHeight(`.${Constants.CLASSES.layerContent}`);
          } else if (this.config.fixed && layeroInnerHeight >= $$1(window).height()) {
            layeroInnerHeight = $$1(window).height();
            this.setHeight(`.${Constants.CLASSES.layerContent}`);
          }
        } else {
          this.setHeight(`.${Constants.CLASSES.layerContent}`);
        }
      }
    }
    setHeight(selector) {
      //标题的高度
      const titHeight = this.layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      // 按钮的高度
      const btnHeight = this.layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;
      const elem = this.layero.find(selector);
      const elempaddingTop = parseFloat(elem.css("padding-top")) | 0;
      elem.height(this.layero.innerHeight() - titHeight - btnHeight - 2 * elempaddingTop);
    }

    // 根据不同的弹出层类型处理一些设置
    adjustLayerSettings() {
      const typeMap = {
        // dialog
        [MAP.TYPE.DIALOG]: () => {
          this.config.btn = "btn" in this.config ? this.config.btn : shared.btn[0];
          this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.DIALOG]);
        },
        // iframe
        [MAP.TYPE.IFRAME]: () => {
          // console.log("www");
          // 转换成数组

          this.config.content = isArray(this.config.content) ? this.config.content : [this.config.content || "", "auto"];

          //重新赋值的操作

          // layui-layer-iframe
          this.config.content = Util.sprintf(Constants.HTML.iframe, this.config.content[1] || "auto", Constants.CLASSES.layerIFrame, Constants.CLASSES.layerIFrame, this.config.content[0]);
        },
        // loading
        [MAP.TYPE.LOADING]: () => {
          delete this.config.title;
          delete this.config.closeBtn;
          this.config.icon === -1 && this.config.icon === 0;
          this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.LOADING]);
        },
        // tips
        [MAP.TYPE.TIPS]: () => {
          this.config.content = isArray(this.config.content) ? this.config.content : [this.config.content, "body"];
          this.config.follow = this.config.content[1];
          this.config.content = `${this.config.content[0]}${Constants.HTML.tipsG}`;
          delete this.config.title;
          this.config.tips = isArray(this.config.tips) ? this.config.tips : [this.config.tips, true];
          //是否允许同时存在多个 tips 层，即不销毁上一个 tips
          this.config.tipsMore || this.layer.closeAll(MAP.TYPE_NAME[MAP.TYPE.TIPS]);
          console.log("tips");
        }
      };

      // 调用switch
      typeMap[this.config.type] && typeMap[this.config.type]();
    }

    // 初始化area属性
    initAreaOption() {
      // 初始化 area 属性
      if (isString(this.config.area)) {
        this.config.area = this.config.area === "auto" ? ["", ""] : [this.config.area, ""];
      }
    }

    // 拖拽层
    move() {
      let that = this;
      const element = this.layero[0];
      const draggie = new Draggabilly(element, {
        handle: element.querySelector(".layui-layer-title"),
        containment: this.$moveEl[0]
      });
      draggie.on("pointerDown", function (event, pointer) {
        console.log("pointerDown");
        // $(".move-container").show();

        that.$moveEl.show();
      });
      draggie.on("dragEnd", function (event, pointer) {
        console.log("拖动结束");
        that.$moveEl.hide();
      });
    }
    move2() {
      let that = this;
      let DATA_NAME = ["LAY_MOVE_DICT", "LAY_RESIZE_DICT"];
      let moveElem = this.layero.find(this.config.move);
      let resizeElem = this.layero.find(`.${Constants.CLASSES.layerResize}`);

      // 给指定元素添加拖动光标
      if (this.config.move) moveElem.css("cursor", "move");

      // 按下拖动元素
      moveElem.on("mousedown", function (event) {
        if (event.button) {
          return;
        } // 不是左键不处理
        let othis = $$1(this);
        let dict = {};
        if (that.config.move) {
          dict.layero = that.layero;
          dict.config = that.config;
          dict.offset = [event.clientX - parseFloat(that.layero.css("left")), event.clientY - parseFloat(that.layero.css("top"))];
          othis.data(DATA_NAME[0], dict);
          // 把拖拽元素的实例绑定到eventMoveElem
          shared.eventMoveElem = othis;
          that.$moveEl.css("cursor", "move").show();
        }
        event.preventDefault();
      });

      // 按下右下角拉伸
      resizeElem.on("mousedown", function (event) {
        const $this = $$1(this);
        if (that.config.resize) {
          // 把数据绑定到拖动元素上
          $this.data(DATA_NAME[1], {
            layero: that.layero,
            config: that.config,
            offset: [event.clientX, event.clientY],
            index: that.index,
            area: [that.layeroOuterWidth, that.layeroouterHeight]
          });
          shared.eventResizeElem = $this;
          that.$moveEl.css("cursor", "se-resize").show();
        }
        event.preventDefault();
      });

      // 拖动元素，避免多次调用实例造成事件叠加
      if (shared.docEvent) return;
      $$1(document).on("mousemove", function (event) {
        // 拖拽移动，如果eventMoveElem有值,说明拖拽的dom已经被鼠标左键按下过
        if (shared.eventMoveElem) {
          // 从拖动元素中把存储的数据取出来
          let dict = shared.eventMoveElem.data(DATA_NAME[0]) || {};
          let layero = dict.layero;
          let config = dict.config;
          let X = event.clientX - dict.offset[0];
          let Y = event.clientY - dict.offset[1];
          let fixed = layero.css("position") === "fixed";
          event.preventDefault();
          dict.stX = fixed ? 0 : $$1(window).scrollLeft();
          dict.stY = fixed ? 0 : $$1(window).scrollTop();
          // 控制元素不被拖出窗口外
          if (!config.moveOut) {
            let setRig = $$1(window).width() - layero.outerWidth() + dict.stX;
            let setBot = $$1(window).height() - layero.outerHeight() + dict.stY;
            X < dict.stX && (X = dict.stX);
            X > setRig && (X = setRig);
            Y < dict.stY && (Y = dict.stY);
            Y > setBot && (Y = setBot);
          }
          // 拖动时跟随鼠标位置
          layero.css({
            left: X,
            top: Y
          });
        }

        // Resize
        if (shared.eventResizeElem) {
          let dict = shared.eventResizeElem.data(DATA_NAME[1]) || {};
          let config = dict.config;
          let X = event.clientX - dict.offset[0];
          let Y = event.clientY - dict.offset[1];
          event.preventDefault();

          // 拉伸宽高
          that.layer.style(dict.index, {
            width: dict.area[0] + X,
            height: dict.area[1] + Y
          });
          config.resizing && config.resizing(dict.layero);
        }
      });

      // 左键放开
      $$1(document).on("mouseup", function () {
        if (shared.eventMoveElem) {
          let dict = shared.eventMoveElem.data(DATA_NAME[0]) || {};
          let config = dict.config;
          shared.eventMoveElem.removeData(DATA_NAME[0]);
          delete shared.eventMoveElem;
          that.$moveEl.hide();
          config.moveEnd && config.moveEnd(dict.layero);
        }
        if (shared.eventResizeElem) {
          shared.eventResizeElem.removeData(DATA_NAME[1]);
          delete shared.eventResizeElem;
          that.$moveEl.hide();
        }
      });
      shared.docEvent = true; // 已给 document 执行全局事件
    }
    tips() {
      const follow = $$1(this.config.follow)[0] ? $$1(this.config.follow) : $$1("body");

      //follow, config, layero
      const tipsLocation = new TipsLocation(follow, this.config, this.layero);

      // 初始化箭头位置
      tipsLocation.setupArrowPosition();

      // 调整溢流或屏幕边缘情况
      tipsLocation.overflowAdjustment();

      // 更新位置
      tipsLocation.updatePosition();

      // 更新内容的样式
      this.layero.find(`.${Constants.CLASSES.layerContent}`).css({
        "background-color": this.config.tips[1],
        "padding-right": this.config.closeBtn ? "30px" : ""
      });
    }

    // 遮罩处理
    shadeoHandle() {
      // 遮罩
      this.shadeo.css({
        "background-color": this.config.shade[1] || "#000",
        opacity: this.config.shade[0] || this.config.shade,
        transition: this.config.shade[2] || ""
      });
      this.shadeo.data(Constants.DATAKEY.SHADE_KEY, this.config.shade[0] || this.config.shade);
    }

    // 给按钮前方添加loading效果
    loading(isLoading) {
      if (isLoading) {
        let loadingTpl = '<i class="layui-layer-btn-loading-icon layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>';
        if (this.$btnElem.find(".layui-layer-btn-loading-icon")[0]) return;
        this.$btnElem.addClass("layui-layer-btn-is-loading").attr({
          disabled: ""
        }).prepend(loadingTpl);
      } else {
        this.$btnElem.removeClass("layui-layer-btn-is-loading").removeAttr("disabled").find(".layui-layer-btn-loading-icon").remove();
      }
    }

    //==============公开api===================
    // 计算坐标
    offset() {
      const floatingEl = this.layero[0];
      const virtualEl = {
        getBoundingClientRect() {
          return {
            top: 0,
            // 窗口顶部，视口的 top 是 0
            left: 0,
            // 窗口左边，视口的 left 是 0
            bottom: window.innerHeight,
            // 窗口的底部等于窗口高度
            right: window.innerWidth,
            // 窗口的右边等于窗口宽度
            width: window.innerWidth,
            // 窗口的宽度
            height: window.innerHeight,
            // 窗口的高度
            x: 0,
            // x 坐标等同于 left
            y: 0 // y 坐标等同于 top
          };
        }
      };
      Util.computePosition(virtualEl, floatingEl, {
        //let left-start left-end top-start right-start
        placement: "left",
        strategy: "fixed",
        // 默认是'absolute'
        middleware: [shift({
          // 重要:让参考元素可以被重叠
          crossAxis: true
        })]
      }).then(({
        x,
        y
      }) => {
        Object.assign(floatingEl.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
    offset2() {
      let that = this,
        config = that.config,
        layero = that.layero;
      let area = [layero.outerWidth(), layero.outerHeight()];
      let type = isArray(config.offset);
      that.offsetTop = ($$1(window).height() - area[1]) / 2;
      that.offsetLeft = ($$1(window).width() - area[0]) / 2;
      if (type) {
        that.offsetTop = config.offset[0];
        that.offsetLeft = config.offset[1] || that.offsetLeft;
      } else if (config.offset !== "auto") {
        if (config.offset === "t") {
          // 上
          that.offsetTop = 0;
        } else if (config.offset === "r") {
          // 右
          that.offsetLeft = $$1(window).width() - area[0];
        } else if (config.offset === "b") {
          // 下
          that.offsetTop = $$1(window).height() - area[1];
        } else if (config.offset === "l") {
          // 左
          that.offsetLeft = 0;
        } else if (config.offset === "lt") {
          // 左上
          that.offsetTop = 0;
          that.offsetLeft = 0;
        } else if (config.offset === "lb") {
          // 左下
          that.offsetTop = $$1(window).height() - area[1];
          that.offsetLeft = 0;
        } else if (config.offset === "rt") {
          // 右上
          that.offsetTop = 0;
          that.offsetLeft = $$1(window).width() - area[0];
        } else if (config.offset === "rb") {
          // 右下
          that.offsetTop = $$1(window).height() - area[1];
          that.offsetLeft = $$1(window).width() - area[0];
        } else {
          that.offsetTop = config.offset;
        }
      }
      if (!config.fixed) {
        that.offsetTop = /%$/.test(that.offsetTop) ? $$1(window).height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
        that.offsetLeft = /%$/.test(that.offsetLeft) ? $$1(window).width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
        that.offsetTop += $$1(window).scrollTop();
        that.offsetLeft += $$1(window).scrollLeft();
      }

      // 最小化窗口时的自适应
      if (layero.data("maxminStatus") === "min") {
        that.offsetTop = $$1(window).height() - (layero.find(doms[1]).outerHeight() || 0);
        that.offsetLeft = layero.css("left");
      }

      // 设置坐标
      layero.css({
        top: that.offsetTop,
        left: that.offsetLeft
      });
    }
  }

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
      const closest = $(`.${Constants.CLASSES.layuiLayer}`).children(`#${this.index}`).closest(`.${Constants.CLASSES.layuiLayer}`);
      return closest[0] ? closest : $(`#${Constants.CLASSES.layuiLayer}${this.index}`);
    }

    // 执行关闭操作
    execute() {
      if (!this.layero[0]) return;
      if (!this.hideOnClose && isFunction(shared.beforeEnd[this.index])) {
        Util.promiseLikeResolve(shared.beforeEnd[this.index]()).then(result => {
          if (result !== false) {
            delete shared.beforeEnd[this.index];
            this.executeClose();
          }
        }, reason => {
          reason !== undefined && window.console && window.console.error("layer error hint: " + reason);
        });
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
        shadeo.css({
          opacity: 0
        });
        setTimeout(() => shadeo[this.hideOnClose ? "hide" : "remove"](), 350);
      }
    }

    // 移除层及相关事件
    removeLayer() {
      const closeAnim = {
        slideDown: Constants.CLASSES.animSlideDownOut,
        slideLeft: Constants.CLASSES.animSlideLeftOut,
        slideUp: Constants.CLASSES.animSlideUpOut,
        slideRight: Constants.CLASSES.animSlideRightOut
      }[this.options.anim] || Constants.CLASSES.animClose;
      const closeAnimfullClass = `${Constants.CLASSES.layerAnim} ${closeAnim}`;
      const remove = () => {
        if (this.hideOnClose) {
          this.layero.removeClass(closeAnimfullClass);
          return this.layero.hide();
        }

        // 页面捕获层
        if (this.type === MAP.TYPE_NAME[MAP.TYPE.PAGE] && this.layero.attr("conType") === "object") {
          this.layero.children(`:not(.${Constants.CLASSES.layerContent})`).remove();
          let wrap = this.layero.find(`.${Constants.CLASSES.layerWrap}`);
          for (let i = 0; i < 2; i++) {
            wrap.unwrap();
          }
          wrap.css("display", wrap.data("display")).removeClass(Constants.CLASSES.layerWrap);
        } else {
          // 低版本 IE 回收 iframe
          if (this.type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]) {
            try {
              let iframe = $(`#${Constants.CLASSES.layerIFrame}${this.index}`)[0];
              iframe.contentWindow.document.write("");
              iframe.contentWindow.close();
              this.layero.find(`.${Constants.CLASSES.layerContent}`)[0].removeChild(iframe);
            } catch (e) {}
          }
          this.layero[0].innerHTML = "";
          this.layero.remove();
        }
        isFunction(shared.end[this.index]) && shared.end[this.index]();
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

  // 默认内置方法。
  var layer$1 = {
    v: Constants.VERSION,
    //获取最新弹出层的层叠顺序
    zIndex: shared.zIndex,
    // 索引层
    index: shared.index,
    // 设置全局默认配置
    config(options = {}) {
      shared.config = $$1.extend({}, shared.config, options);
      if (isString(options.extend)) {
        options.extend = [options.extend];
      }
      if (!options.extend) return this; //如果选项不存在extend属性，就直接return

      return this;
    },
    // 核心方法
    open(options) {
      return new Container(options, this).index;
      // return new Class(options).index;
    },
    // 各种快捷引用
    alert(content, options, yes) {
      let type = isFunction(options);
      if (type) yes = options;
      return this.open($$1.extend({
        content: content,
        yes: yes
      }, type ? {} : options));
    },
    confirm(content, options, yes, cancel) {
      let type = isFunction(options);
      if (type) {
        cancel = yes;
        yes = options;
      }
      return this.open($$1.extend({
        content: content,
        btn: shared.btn,
        yes: yes,
        btn2: cancel
      }, type ? {} : options));
    },
    msg(content, options, end) {
      // 最常用提示层
      let type = isFunction(options);

      // 源皮肤
      let rskin = shared.config.skin;
      const skin = rskin ? `${rskin} ${rskin}-msg` : "layui-layer-msg";
      let anim = Constants.CLASSES.layerAnim5;
      if (type) end = options;
      return this.open($$1.extend({
        content: content,
        time: 3000,
        shade: false,
        skin: skin,
        title: false,
        closeBtn: false,
        btn: false,
        resize: false,
        end: end,
        removeFocus: false
      }, type && !shared.config.skin ? {
        skin: skin + " layui-layer-hui",
        anim: anim
      } : function () {
        options = options || {};
        if (options.icon === -1 || options.icon === undefined && !shared.config.skin) {
          options.skin = skin + " " + (options.skin || "layui-layer-hui");
        }
        return options;
      }()));
    },
    style(index, options, limit) {
      let layero = Util.getLayeroByIndex(index);
      let contentElem = layero.find(`.${Constants.CLASSES.layerContent}`);
      let type = layero.attr("type");
      let titHeight = layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      let btnHeight = layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;

      // loading 和 tips 层不允许更改
      if (type === MAP.TYPE_NAME[MAP.TYPE.LOADING] || type === MAP.TYPE_NAME[MAP.TYPE.TIPS]) {
        return;
      }
      if (!limit) {
        if (parseFloat(options.width) <= 260) {
          options.width = 260;
        }
        if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
          options.height = 64 + titHeight + btnHeight;
        }
      }
      layero.css(options);
      btnHeight = layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;
      if (type === MAP.TYPE_NAME[MAP.TYPE.IFRAME]) {
        layero.find("iframe").css({
          height: (isNumber(options.height) ? options.height : layero.height()) - titHeight - btnHeight
        });
      } else {
        contentElem.css({
          height: (isNumber(options.height) ? options.height : layero.height()) - titHeight - btnHeight - parseFloat(contentElem.css("padding-top")) - parseFloat(contentElem.css("padding-bottom"))
        });
      }
    },
    // 给层设置标题
    title(name, index) {
      const $title = $$1(`#${Constants.CLASSES.layuiLayer}${index || Layer.index}`).find(`.${Constants.CLASSES.layerTitle}`);
      $title.html(name);
    },
    load(icon, options) {
      return this.open($$1.extend({
        type: 3,
        icon: icon || 0,
        resize: false,
        shade: 0.01,
        removeFocus: false
      }, options));
    },
    tips(content, follow, options) {
      return this.open($$1.extend({
        type: 4,
        content: [content, follow],
        closeBtn: false,
        time: 3000,
        shade: false,
        resize: false,
        fixed: false,
        maxWidth: 260,
        removeFocus: false
      }, options));
    },
    close(index, callback) {
      new Closer(index, callback).execute();
    },
    closeAll(type, callback) {
      let that = this;
      if (isFunction(type)) {
        callback = type;
        type = null;
      }
      let domsElem = $$1(`.${Constants.CLASSES.layuiLayer}`);
      $$1.each(domsElem, function (_index) {
        let othis = $$1(this);
        let is = type ? othis.attr("type") === type : 1;
        is && that.close(othis.attr("times"), _index === domsElem.length - 1 ? callback : null);
        is = null;
      });
      if (domsElem.length === 0) isFunction(callback) && callback();
    },
    closeLast(type, callback) {
      const layerIndexList = [];
      const isArrayType = Array.isArray(type);
      const selector = isString(type) ? `.layui-layer-${type}` : `.${Constants.CLASSES.layuiLayer}`;
      $$1(selector).each(function (i, el) {
        const layero = $$1(el);
        const isHidden = layero.css("display") === "none";
        const isInvalidType = isArrayType && !type.includes(layero.attr("type"));
        if (isHidden || isInvalidType) {
          return true; // 跳过当前循环
        }
        const layerIndex = Number(layero.attr("times"));
        layerIndexList.push(layerIndex);
      });
      if (layerIndexList.length > 0) {
        const layerIndexMax = Math.max.apply(null, layerIndexList);
        this.close(layerIndexMax, callback);
      }
    },
    // 获取子 iframe 的 DOM
    getChildFrame(selector, index) {
      index = index || $$1(`.${Constants.CLASSES.layerIFrame}`).attr("times");
      return Util.getLayeroByIndex(index).find("iframe").contents().find(selector);
    },
    // 得到当前 iframe 层的索引，子 iframe 时使用
    getFrameIndex(name) {
      return $$1("#" + name).parents(`.${Constants.CLASSES.layerIFrame}`).attr("times");
    },
    // iframe 层自适应宽高
    iframeAuto(index) {
      if (!index) return;
      let heg = this.getChildFrame("html", index).outerHeight();
      let layero = Util.getLayeroByIndex(index);

      // .layui-layer-title
      let titHeight = layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      // layui-layer-btn
      let btnHeight = layero.find(`.${Constants.CLASSES.layerBtn}`).outerHeight() || 0;
      layero.css({
        height: heg + titHeight + btnHeight
      });
      layero.find("iframe").css({
        height: heg
      });
    },
    // 重置 iframe url
    iframeSrc(index, url) {
      Util.getLayeroByIndex(index).find("iframe").attr("src", url);
    },
    // 最小化
    min(index, options) {
      let layero = Util.getLayeroByIndex(index);
      let maxminStatus = layero.data(Constants.DATAKEY.MAX_MIN_STATUS);
      if (maxminStatus === "min") return; // 当前的状态是否已经是最小化
      if (maxminStatus === "max") this.restore(index); // 若当前为最大化，则先还原后再最小化

      layero.data(Constants.DATAKEY.MAX_MIN_STATUS, "min");
      options = options || layero.data("config") || {};
      let shadeo = $$1(`#${Constants.CLASSES.shade}${index}`);
      let elemMin = layero.find(".layui-layer-min");

      //.layui-layer-title
      let titHeight = layero.find(`.${Constants.CLASSES.layerTitle}`).outerHeight() || 0;
      let minLeft = layero.attr("minLeft"); // 最小化时的横坐标

      // 是否已经赋值过最小化坐标
      let hasMinLeft = isString(minLeft);
      let left = hasMinLeft ? minLeft : 181 * shared.minStackIndex + "px";
      let position = layero.css("position");
      let minWidth = 180; // 最小化时的宽度
      let settings = {
        width: minWidth,
        height: titHeight,
        position: "fixed",
        overflow: "hidden"
      };
      Util.record(layero); // 记录当前尺寸、坐标，用于还原

      // 简易最小化补位
      if (shared.minStackArr.length > 0) {
        left = shared.minStackArr[0];
        shared.minStackArr.shift();
      }

      // left 是否超出边界
      if (parseFloat(left) + minWidth > $$1(window).width()) {
        left = $$1(window).width() - minWidth - function () {
          shared.minStackArr.edgeIndex = shared.minStackArr.edgeIndex || 0;
          return shared.minStackArr.edgeIndex += 3;
        }();
        if (left < 0) left = 0;
      }

      // 是否堆叠在左下角
      if (options.minStack) {
        settings.left = left;
        settings.top = $$1(window).height() - titHeight;
        hasMinLeft || shared.minStackIndex++; // 若未赋值过最小化坐标，则最小化操作索引自增
        layero.attr("minLeft", left);
      }
      layero.attr("position", position);
      this.style(index, settings, true);
      elemMin.hide();
      // layui-layer-iframe
      layero.attr("type") === "page" && layero.find(Constants.CLASSES.layerIFrame).hide();
      Util.restScrollbar(index);

      // 隐藏遮罩
      shadeo.hide();
    },
    // 还原
    restore(index) {
      let layero = Util.getLayeroByIndex(index);
      let shadeo = Util.getShadeoByIndex(index);
      let contentElem = layero.find(`.${Constants.CLASSES.layerContent}`);
      let area = layero.attr("area").split(",");
      let type = layero.attr("type");
      let options = layero.data("config") || {};
      let contentRecordHeight = contentElem.data(Constants.DATAKEY.RECORD_HEIGHT_KEY);
      layero.removeData(Constants.DATAKEY.MAX_MIN_STATUS); // 移除最大最小状态

      // 恢复原来尺寸
      this.style(index, {
        width: area[0],
        // 数值或百分比
        height: area[1],
        top: parseFloat(area[2]),
        left: parseFloat(area[3]),
        position: layero.attr("position"),
        overflow: "visible"
      }, true);
      layero.find(".layui-layer-max").removeClass("layui-layer-maxmin");
      layero.find(".layui-layer-min").show();
      //layui-layer-iframe
      type === "page" && layero.find(Constants.CLASSES.layerIFrame).show();

      // 恢复页面滚动条弹层打开时的状态
      options.scrollbar ? Util.restScrollbar(index) : Util.setScrollbar(index);

      // #1604
      if (contentRecordHeight !== undefined) {
        contentElem.removeData(Constants.DATAKEY.RECORD_HEIGHT_KEY);
        let contentRecordHeightElem = type === MAP.TYPE_NAME[MAP.TYPE.IFRAME] ? contentElem.children("iframe") : contentElem;
        contentRecordHeightElem.css({
          height: contentRecordHeight
        });
      }

      // 恢复遮罩
      shadeo.show();
      // shared.events.resize[index](); // ?
    },
    // 全屏（最大化）
    full(index) {
      let layero = Util.getLayeroByIndex(index);
      let maxminStatus = layero.data(Constants.DATAKEY.MAX_MIN_STATUS);
      if (maxminStatus === "max") return; // 检查当前的状态是否已经是最大化
      if (maxminStatus === "min") this.restore(index); // 若当前为最小化，则先还原后再最大化

      layero.data(Constants.DATAKEY.MAX_MIN_STATUS, "max");
      Util.record(layero); // 记录当前尺寸、坐标

      if (!$$1("html").attr("layer-full")) {
        Util.setScrollbar(index);
      }
      setTimeout(() => {
        let isfix = layero.css("position") === "fixed";
        this.style(index, {
          top: isfix ? 0 : $$1(window).scrollTop(),
          left: isfix ? 0 : $$1(window).scrollLeft(),
          width: "100%",
          height: "100%"
        }, true);
        layero.find(".layui-layer-min").hide();
      }, 100);
    },
    // 仿系统 prompt
    prompt(options, yes) {
      let style = "",
        placeholder = "";
      options = options || {};
      if (isFunction(options)) yes = options;
      if (options.area) {
        let area = options.area;
        style = 'style="width: ' + area[0] + "; height: " + area[1] + ';"';
        delete options.area;
      }
      if (options.placeholder) {
        placeholder = ' placeholder="' + options.placeholder + '"';
      }
      let prompt,
        content = options.formType == 2 ? '<textarea class="layui-layer-input"' + style + placeholder + "></textarea>" : function () {
          return '<input type="' + (options.formType == 1 ? "password" : "text") + '" class="layui-layer-input"' + placeholder + ">";
        }();
      let success = options.success;
      delete options.success;
      return this.open($$1.extend({
        type: 1,
        btn: ["确定", "取消"],
        content: content,
        skin: "layui-layer-prompt" + Util.skin("prompt", shared.config),
        maxWidth: $$1(window).width(),
        success(layero) {
          prompt = layero.find(".layui-layer-input");
          prompt.val(options.value || "").focus();
          isFunction(success) && success(layero);
        },
        resize: false,
        yes(index) {
          let value = prompt.val();
          if (value.length > (options.maxlength || 500)) {
            this.tips("最多输入" + (options.maxlength || 500) + "个字符", prompt, {
              tips: 1
            });
          } else {
            yes && yes(value, index, prompt);
          }
        }
      }, options));
    },
    // 窗口置顶
    setTop(layero) {
      shared.zIndex = parseInt(layero[0].style.zIndex);
      layero.on("mousedown", function () {
        shared.zIndex++;
        layero.css("z-index", shared.zIndex + 1);
      });
      return shared.zIndex;
    },
    // tab 层
    tab(options) {
      options = options || {};
      let tab = options.tab || {};
      let THIS = "layui-this";
      let success = options.success;
      delete options.success;
      return this.open($$1.extend({
        type: 1,
        skin: "layui-layer-tab" + Util.skin("tab", shared.config),
        resize: false,
        title: function () {
          let len = tab.length,
            ii = 1,
            str = "";
          if (len > 0) {
            str = '<span class="' + THIS + '">' + tab[0].title + "</span>";
            for (; ii < len; ii++) {
              str += "<span>" + tab[ii].title + "</span>";
            }
          }
          return str;
        }(),
        content: '<ul class="layui-layer-tabmain">' + function () {
          let len = tab.length,
            ii = 1,
            str = "";
          if (len > 0) {
            str = '<li class="layui-layer-tabli ' + THIS + '">' + (tab[0].content || "no content") + "</li>";
            for (; ii < len; ii++) {
              str += '<li class="layui-layer-tabli">' + (tab[ii].content || "no  content") + "</li>";
            }
          }
          return str;
        }() + "</ul>",
        success(layero) {
          let btn = layero.find(".layui-layer-title").children();
          let main = layero.find(".layui-layer-tabmain").children();
          btn.on("mousedown", function (e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            let othis = $$1(this),
              index = othis.index();
            othis.addClass(THIS).siblings().removeClass(THIS);
            main.eq(index).show().siblings().hide();
            isFunction(options.change) && options.change(index);
          });
          isFunction(success) && success(layero);
        }
      }, options));
    },
    // 图片层
    photos(options, loop, key) {
      let _that = this;
      let dict = {};

      // 默认属性
      options = $$1.extend(true, {
        toolbar: true,
        footer: true
      }, options);
      if (!options.photos) return;

      // 若 photos 并非选择器或 jQuery 对象，则为普通 object
      let isObject = !(isString(options.photos) || options.photos instanceof $$1);
      let photos = isObject ? options.photos : {};
      let data = photos.data || [];
      let start = photos.start || 0;
      let success = options.success;
      dict.imgIndex = (start | 0) + 1;
      options.img = options.img || "img";
      delete options.success;

      // 若 options.photos 不是一个对象
      if (!isObject) {
        // 页面直接获取
        let parent = $$1(options.photos),
          pushData = function () {
            data = [];
            parent.find(options.img).each(function (index) {
              let othis = $$1(this);
              othis.attr("layer-index", index);
              data.push({
                alt: othis.attr("alt"),
                pid: othis.attr("layer-pid"),
                src: othis.attr("lay-src") || othis.attr("layer-src") || othis.attr("src"),
                thumb: othis.attr("src")
              });
            });
          };
        pushData();
        if (data.length === 0) return;
        loop || parent.on("click", options.img, function () {
          pushData();
          let othis = $$1(this),
            index = othis.attr("layer-index");
          this.photos($$1.extend(options, {
            photos: {
              start: index,
              data: data,
              tab: options.tab
            },
            full: options.full
          }), true);
        });

        // 不直接弹出
        if (!loop) return;
      } else if (data.length === 0) {
        return this.msg("没有图片");
      }

      // 上一张
      dict.imgprev = function (key) {
        dict.imgIndex--;
        if (dict.imgIndex < 1) {
          dict.imgIndex = data.length;
        }
        dict.tabimg(key);
      };

      // 下一张
      dict.imgnext = function (key, errorMsg) {
        dict.imgIndex++;
        if (dict.imgIndex > data.length) {
          dict.imgIndex = 1;
          if (errorMsg) {
            return;
          }
        }
        dict.tabimg(key);
      };

      // 方向键
      dict.keyup = function (event) {
        if (!dict.end) {
          let code = event.keyCode;
          event.preventDefault();
          if (code === 37) {
            dict.imgprev(true);
          } else if (code === 39) {
            dict.imgnext(true);
          } else if (code === 27) {
            this.close(dict.index);
          }
        }
      };

      // 切换
      dict.tabimg = function (key) {
        if (data.length <= 1) return;
        photos.start = dict.imgIndex - 1;
        this.close(dict.index);
        return this.photos(options, true, key);
      };
      dict.isNumber = function (n) {
        return isNumber(n) && !isNaN(n);
      };
      dict.image = {};
      dict.getTransform = function (opts) {
        let transforms = [];
        let rotate = opts.rotate;
        let scaleX = opts.scaleX;
        let scale = opts.scale;
        if (dict.isNumber(rotate) && rotate !== 0) {
          transforms.push("rotate(" + rotate + "deg)");
        }
        if (dict.isNumber(scaleX) && scaleX !== 1) {
          transforms.push("scaleX(" + scaleX + ")");
        }
        if (dict.isNumber(scale)) {
          transforms.push("scale(" + scale + ")");
        }
        return transforms.length ? transforms.join(" ") : "none";
      };

      // 一些动作
      dict.event = function (layero, index, that) {
        // 上一张
        dict.main.find(".layui-layer-photos-prev").on("click", function (event) {
          event.preventDefault();
          dict.imgprev(true);
        });

        // 下一张
        dict.main.find(".layui-layer-photos-next").on("click", function (event) {
          event.preventDefault();
          dict.imgnext(true);
        });
        $$1(document).on("keyup", dict.keyup);

        // 头部工具栏事件
        layero.off("click").on("click", "*[toolbar-event]", function () {
          let othis = $$1(this);
          let event = othis.attr("toolbar-event");
          switch (event) {
            case "rotate":
              dict.image.rotate = ((dict.image.rotate || 0) + Number(othis.attr("data-option"))) % 360;
              dict.imgElem.css({
                transform: dict.getTransform(dict.image)
              });
              break;
            case "scalex":
              dict.image.scaleX = dict.image.scaleX === -1 ? 1 : -1;
              dict.imgElem.css({
                transform: dict.getTransform(dict.image)
              });
              break;
            case "zoom":
              let ratio = Number(othis.attr("data-option"));
              dict.image.scale = (dict.image.scale || 1) + ratio;
              // 缩小状态最小值
              if (ratio < 0 && dict.image.scale < 0 - ratio) {
                dict.image.scale = 0 - ratio;
              }
              dict.imgElem.css({
                transform: dict.getTransform(dict.image)
              });
              break;
            case "reset":
              dict.image.scaleX = 1;
              dict.image.scale = 1;
              dict.image.rotate = 0;
              dict.imgElem.css({
                transform: "none"
              });
              break;
            case "close":
              _that.close(index);
              break;
          }
          that.offset();
          that.auto(index);
        });

        // 鼠标滚轮缩放图片事件
        dict.main.on("mousewheel DOMMouseScroll", function (e) {
          let delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
          let zoomElem = dict.main.find('[toolbar-event="zoom"]');
          if (delta > 0) {
            zoomElem.eq(0).trigger("click");
          } else {
            zoomElem.eq(1).trigger("click");
          }
          e.preventDefault();
        });
      };

      // 图片预加载
      function loadImage(url, callback, error) {
        let img = new Image();
        img.src = url;
        if (img.complete) {
          return callback(img);
        }
        img.onload = function () {
          img.onload = null;
          callback(img);
        };
        img.onerror = function (e) {
          img.onerror = null;
          error(e);
        };
      }
      dict.loadi = this.load(1, {
        shade: "shade" in options ? false : [0.9, undefined, "unset"],
        scrollbar: false
      });
      loadImage(data[start].src, function (img) {
        _that.close(dict.loadi);
        let alt = data[start].alt || "";

        // 切换图片时不出现动画
        if (key) options.anim = -1;

        // 弹出图片层
        dict.index = _that.open($$1.extend({
          type: 1,
          id: "layui-layer-photos",
          area: function () {
            let imgarea = [img.width, img.height];
            let winarea = [$$1(window).width() - 100, $$1(window).height() - 100];

            // 若实际图片的宽或者高比 屏幕大（那么进行缩放）
            if (!options.full && (imgarea[0] > winarea[0] || imgarea[1] > winarea[1])) {
              let wh = [imgarea[0] / winarea[0], imgarea[1] / winarea[1]]; // 取宽度缩放比例、高度缩放比例
              if (wh[0] > wh[1]) {
                // 取缩放比例最大的进行缩放
                imgarea[0] = imgarea[0] / wh[0];
                imgarea[1] = imgarea[1] / wh[0];
              } else if (wh[0] < wh[1]) {
                imgarea[0] = imgarea[0] / wh[1];
                imgarea[1] = imgarea[1] / wh[1];
              }
            }
            return [imgarea[0] + "px", imgarea[1] + "px"];
          }(),
          title: false,
          shade: [0.9, undefined, "unset"],
          shadeClose: true,
          closeBtn: false,
          move: ".layer-layer-photos-main img",
          moveType: 1,
          scrollbar: false,
          moveOut: true,
          anim: 5,
          isOutAnim: false,
          skin: "layui-layer-photos" + Util.skin("photos", shared.config),
          content: '<div class="layer-layer-photos-main">' + '<img src="' + data[start].src + '" alt="' + alt + '" layer-pid="' + (data[start].pid || "") + '">' + function () {
            let arr = ['<div class="layui-layer-photos-pointer">'];

            // 左右箭头翻页
            if (data.length > 1) {
              arr.push(['<div class="layer-layer-photos-page">', '<span class="layui-icon layui-icon-left layui-layer-photos-prev"></span>', '<span class="layui-icon layui-icon-right layui-layer-photos-next"></span>', "</div>"].join(""));
            }

            // 头部工具栏
            if (options.toolbar) {
              arr.push(['<div class="layui-layer-photos-toolbar layui-layer-photos-header">', '<span toolbar-event="rotate" data-option="90" title="旋转"><i class="layui-icon layui-icon-refresh"></i></span>', '<span toolbar-event="scalex" title="变换"><i class="layui-icon layui-icon-slider"></i></span>', '<span toolbar-event="zoom" data-option="0.1" title="放大"><i class="layui-icon layui-icon-add-circle"></i></span>', '<span toolbar-event="zoom" data-option="-0.1" title="缩小"><i class="layui-icon layui-icon-reduce-circle"></i></span>', '<span toolbar-event="reset" title="还原"><i class="layui-icon layui-icon-refresh-1"></i></span>', '<span toolbar-event="close" title="关闭"><i class="layui-icon layui-icon-close"></i></span>', "</div>"].join(""));
            }

            // 底部栏
            if (options.footer) {
              arr.push(['<div class="layui-layer-photos-toolbar layui-layer-photos-footer">', "<h3>" + alt + "</h3>", "<em>" + dict.imgIndex + " / " + data.length + "</em>", '<a href="' + data[start].src + '" target="_blank">查看原图</a>', "</div>"].join(""));
            }
            arr.push("</div>");
            return arr.join("");
          }() + "</div>",
          success(layero, index, that) {
            dict.main = layero.find(".layer-layer-photos-main");
            dict.footer = layero.find(".layui-layer-photos-footer");
            dict.imgElem = dict.main.children("img");
            dict.event(layero, index, that);
            options.tab && options.tab(data[start], layero);
            isFunction(success) && success(layero);
          },
          end() {
            dict.end = true;
            $$1(document).off("keyup", dict.keyup);
          }
        }, options));
      }, function () {
        this.close(dict.loadi);
        this.msg("当前图片地址异常，<br>是否继续查看下一张？", {
          time: 30000,
          btn: ["下一张", "不看了"],
          yes() {
            data.length > 1 && dict.imgnext(true, true);
          }
        });
      });
    }
  };

  return layer$1;

}));
//# sourceMappingURL=layer.js.map
