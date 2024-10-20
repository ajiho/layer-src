# layer-src

源码解析

## 参考地址

https://www.cnblogs.com/xianxin/p/4441231.html
https://github.com/LuckyMoke/Layer
https://github.com/quyinggang/js-sourcecode?tab=readme-ov-file

## 已知问题

- 特别时 prompt 层的按钮最为明显，鼠标移入进去会有一个向上偏移的视觉效果

## 优化方向(已经确认)

贤心的 layer 用的人挺多的，我大致看了一下功能也还挺强大的,因此打算研究它并做以下优化

- 使用https://github.com/floating-ui/floating-ui来进行自动计算定位
- 使用 svg 来替所有的字体图标,这样就可以不需要再引入字体图标了
- 使用更强大的 flex 或者 grid 布局来优化页面布局
- 使用 es6+和 esm 模块化重构
- sass 编写样式
- 原生js编写
- 最小化窗口时不应该让它支持拖动，以及不管是绝对还是固定定位都应该永远在页面底部方便人们找到它，因为电脑本身它也只支持左右拖动位置交换一下顺序
- 如果是绝对定位的弹出层，恢复弹窗的时候，判断它如果不是在可是窗口内，应该滚动到所在位置
- 多语言支持，比如信息框,确定和取消按钮提示文本，以及图片层没有照片时弹出的图片是写死而且是中文的，应该做国际化处理
- 对于最小化最大化哪些按钮鼠标移上去应该有一个 title 提示
- 解除type=0类型弹出层只能打开一个的限制
- 图片层代码应该单独抽离成一个类
- 对于iframe层是否应该动画加载完毕后,再给iframe的src赋值？这样就不会卡顿(但是中间有个白屏如何优化)?
- 拖拽默认只支持右下角，现在支持左下角也能拖拽
- 对于prompt层限制字数输入的提示也是写死的中文，应该也支持国际化

## 使用 floating-ui 来定位可以优化的地方记录

- layer 的 offset:'l'，比如设置为左边，当屏幕被拉小到小于 area: ['500px', '300px'],设置的高度时，它的 title 位置，会被遮盖,使用 floating-ui 定位则不会出现这种情况，一个小的优化点
- floating-ui 对于 tips 层的优化最为明显，因为它不需要自己人工计算了，代码量少了很多很多，而且会自动处理屏幕溢出时的特殊情况，享受到特性

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

## 备忘录

- 关闭弹出层时应该判断页面是否还存在layer的dom如果还存在那么就不应该删除拖拽所需的范围dom