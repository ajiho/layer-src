/**
 * 一些不会变的表映射数据集合
 */

// 弹出层类型
const TYPE = {
  DIALOG: 0,
  PAGE: 1,
  IFRAME: 2,
  LOADING: 3,
  TIPS: 4,
};

// 弹出层对应的名称
const TYPE_NAME = {
  [TYPE.DIALOG]: "dialog",
  [TYPE.PAGE]: "page",
  [TYPE.IFRAME]: "iframe",
  [TYPE.LOADING]: "loading",
  [TYPE.TIPS]: "tips",
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
  NONE: -1,
};

// load层的图标
const LOADING_ICON = {
  BALL_SPIN: 0,
  BALL_CLIP_ROTATE_GRAY: 1,
  BALL_CLIP_ROTATE_BLUE: 2,
};

// 提示层的方位
const TIPS_DIRECTION = {
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 3,
  LEFT: 4,
};

export default {
  TYPE,
  TYPE_NAME,
  FACE,
  LOADING_ICON,
  TIPS_DIRECTION,
  FACE,
};
