import $ from "jquery";
import Constants, { MAP } from "./constants/index";

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
      L: Constants.CLASSES.layerTipsL,
    };

    // 边框的方位
    const borderPosition =
      position === "T" || position === "B" ? "right" : "bottom";

    this.layero
      .find(`.${Constants.CLASSES.layerTipsG}`)
      .removeClass(Object.values(arrowClass).join(" "))
      .addClass(arrowClass[position])
      .css(`border-${borderPosition}-color`, this.tipColor);
  }

  #autoAdjustLeft() {
    this.tipLeft =
      this.left + this.layeroOuterWidth > $(window).width()
        ? this.left + this.width - this.layeroOuterWidth
        : this.left;
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
        this.tipTop = Math.max(
          this.top - (this.height * 0.75 < 21 ? 21 - this.height * 0.5 : 0),
          0
        );
        this.#updateArrow("R");
      },
      [MAP.TIPS_DIRECTION.BOTTOM]: () => {
        this.#autoAdjustLeft();
        this.tipTop = this.top + this.height + 10;
        this.#updateArrow("B");
      },
      [MAP.TIPS_DIRECTION.LEFT]: () => {
        this.tipLeft = this.left - this.layeroOuterWidth - 10;
        this.tipTop = Math.max(
          this.top - (this.height * 0.75 < 21 ? 21 - this.height * 0.5 : 0),
          0
        );
        this.#updateArrow("L");
      },
    };

    arrowPositions[guide || this.guide](); // 应用初始箭头位置
  }

  // 溢出的情况调整
  overflowAdjustment() {
    // 调整溢流或屏幕边缘情况
    const windowHeight = $(window).height();
    const windowWidth = $(window).width();
    const scrollTop = $(window).scrollTop();
    // 8*2为小三角形占据的空间
    const triangle = 2 * 8;

    const overflowAdjustments = {
      [MAP.TIPS_DIRECTION.TOP]: () => {
        if (this.top - (scrollTop + this.layeroouterHeight + triangle) < 0) {
          this.setupArrowPosition(3);
        }
      },
      [MAP.TIPS_DIRECTION.RIGHT]: () => {
        if (
          windowWidth -
            (this.left + this.width + this.layeroOuterWidth + triangle) <
          0
        ) {
          this.setupArrowPosition(4);
        }
      },
      [MAP.TIPS_DIRECTION.BOTTOM]: () => {
        if (
          this.top +
            this.height +
            this.layeroouterHeight +
            triangle -
            windowHeight >
          0
        ) {
          this.setupArrowPosition(1);
        }
      },
      [MAP.TIPS_DIRECTION.LEFT]: () => {
        if (this.layeroOuterWidth + triangle > this.left) {
          this.setupArrowPosition(2);
        }
      },
    };

    overflowAdjustments[this.guide]();
  }
  updatePosition() {
    this.layero.css({
      left: this.tipLeft - (this.config.fixed ? $(window).scrollLeft() : 0),
      top: this.tipTop - (this.config.fixed ? $(window).scrollTop() : 0),
    });
  }
}

export default TipsLocation;
