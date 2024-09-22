$(function () {
  $(".page").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      page: function () {
        layer.open({
          type: 1,
          // area: ['420px', '240px'], // 宽高
          content: '<div style="padding: 16px;">任意 HTML 内容</div>',
        });
      },
      "page-wrap": function () {
        layer.open({
          type: 1,
          shade: false, // 不显示遮罩
          content: $("#ID-test-layer-wrapper"), // 捕获的元素
          end: function () {
            // layer.msg('关闭后的回调', {icon:6});
          },
        });
      },
      "page-title": function () {
        layer.open({
          type: 1,
          area: ["420px", "240px"], // 宽高
          title: false, // 不显示标题栏
          closeBtn: 0,
          shadeClose: true, // 点击遮罩关闭层
          content:
            '<div style="padding: 16px;">任意 HTML 内容。可点击遮罩区域关闭。</div>',
        });
      },
      "page-move": function () {
        layer.open({
          type: 1,
          area: ["420px", "240px"], // 宽高
          title: false,
          content: [
            '<div style="padding: 11px;">',
            "任意 HTML 内容",
            '<div style="padding: 16px 0;">',
            '<button class="layui-btn" id="ID-test-layer-move">拖拽此处移动弹层</button>',
            "</div>",
            "</div>",
          ].join(""),
          move: "#ID-test-layer-move",
        });
      },
      "page-custom": function () {
        layer.open({
          type: 1,
          area: "350px",
          resize: false,
          shadeClose: true,
          title: "demo : layer + form",
          content: `
            dsasda
          `,
          success: function () {
            // 表单提交事件
          
          },
        });
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
