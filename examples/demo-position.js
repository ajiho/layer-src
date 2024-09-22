$(function () {
  $(".position").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");
    let offset = $(this).data("offset");

    const actions = {
      offset: function () {
        // 弹出位置
        layer.open({
          type: 1,
          offset: offset || ["200px", "280px"], // 详细可参考 offset 属性
          id: "ID-demo-layer-offset-" + offset, // 防止重复弹出
          content: '<div style="padding: 16px;">' + $(that).text() + "</div>",
          area: "240px",
          btn: "关闭全部",
          btnAlign: "c", // 按钮居中
          shade: 0, // 不显示遮罩
          yes: function () {
            layer.closeAll();
          },
        });
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
