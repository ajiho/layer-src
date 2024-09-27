$(function () {
  $(".tips").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      "tips-top": function () {
        layer.tips("向上", that, {
          tips: 1,
          time: 30000
        });
      },
      "tips-right": function () {
        layer.tips("默认向右", that);
      },
      "tips-bottom": function () {
        layer.tips("向下", that, {
          tips: 3,
        });
      },
      "tips-left": function () {
        layer.tips("向左", that, {
          tips: 4,
        });
      },
      "tips-color": function () {
        layer.tips("可自定义任意主题色", that, {
          tips: [1, "#16b777"],
        });
      },
      "tips-more": function () {
        layer.tips("不会关闭之前的 tips", that, {
          tipsMore: true,
        });
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
