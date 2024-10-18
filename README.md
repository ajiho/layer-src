# layer-src

源码解析

## 参考地址

https://www.cnblogs.com/xianxin/p/4441231.html
https://github.com/LuckyMoke/Layer
https://github.com/quyinggang/js-sourcecode?tab=readme-ov-file

## 优化方向(已经确认)

贤心的 layer 用的人挺多的，我大致看了一下功能也还挺强大的,因此打算研究它并做以下优化

- 使用https://github.com/floating-ui/floating-ui来进行自动计算定位
- 使用 svg 来替所有的字体图标,这样就可以不需要再引入字体图标了
- 使用更强大的 flex 或者 grid 布局来优化页面布局
- 使用 es6+和 esm 模块化重构
- sass 编写样式
- 最后把上面的事情都做了后，再去 jQuery 这个依赖项

## 拓展内容

拖拽功能,实际上还可以使用 layer 原本内部的写法,但是我想通过以下第三方包的代码简化其内部的实现
但是，可能会有更多问题，还没有测试以下几个和 floating-ui 是否会有冲突问题

- [plain-draggable](https://github.com/anseki/plain-draggable)
- [draggabilly](https://github.com/desandro/draggabilly)
- [interactjs](https://github.com/taye/interact.js)

其中`draggabilly`还算比较符合需求

拉动右下角改变元素尺寸问题，
最开始想到的是使用 css 的 resize 属性实现，但是查阅了之后发现兼容性问题在以及各大浏览器实现的样式可能不同，而且使用场景也不够

https://caniuse.com/?search=resize
https://developer.mozilla.org/zh-CN/docs/Web/CSS/resize
https://www.jianshu.com/p/a17f20b3ac44

也有一些第三方包可以做这个事情

- [interactjs](https://github.com/taye/interact.js)

关于拖拽和拉动改变尺寸如果也交给第三方插件，可能问题更多,实在不行自己写拖拽改变元素尺寸的功能
