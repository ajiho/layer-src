import $ from "jquery";
import Util, { detectIE } from "./util";
import { win, doms, ready, CONSTANTS } from "./constants";
import Creator from "./creator";

doms.SHADE = "layui-layer-shade";
doms.MOVE = "layui-layer-move";

// 默认内置方法。
export default {
  v: "3.7.0",
  //判断ie
  ie: detectIE(),

  // 索引层
  index: window.layer && window.this.v ? 100000 : 0,
  // 路径
  path: null,
  // 设置全局默认配置
  config(options, fn) {
    options = options || {};

    

    let remove = function () {
      this.index
    }


    // 把传递进来的参数和默认配置ready.config里面的参数合并后赋值给ready.config和this.cache
    this.cache = ready.config = $.extend({}, ready.config, options);
    // console.log(this.cache,ready.config);

    // 从默认参数ready.config里取path如果没有就取layer对象上的path属性赋值给this.path
    this.path = ready.config.path || this.path;

    // console.log(this.path, ready.config.path);

    // console.log(options.extend);

    typeof options.extend === "string" && (options.extend = [options.extend]);

    // 如果设置了路径，则加载样式,这里不需要这样
    // if (ready.config.path) this.ready();

    if (!options.extend) return this; //如果选项不存在extend属性，就直接return

    // 加载 css
    // isLayui
    //   ? layui.addcss("modules/layer/" + options.extend)
    //   : ready.link("css/" + options.extend);

    return this;
  }
}