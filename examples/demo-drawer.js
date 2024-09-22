$(function () {
  $(".drawer").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      "drawer-t": function () {
        layer.open({
          type: 1,
          offset: "t",
          anim: "slideDown", // 从上往下
          area: ["100%", "160px"],
          shade: 0.1,
          shadeClose: true,
          id: "ID-demo-layer-direction-t",
          content: '<div style="padding: 16px;">任意 HTML 内容</div>',
        });
      },
      "drawer-r": function () {
        layer.open({
          type: 1,
          offset: "r",
          anim: "slideLeft", // 从右往左
          area: ["320px", "100%"],
          shade: 0.1,
          shadeClose: true,
          id: "ID-demo-layer-direction-r",
          content: '<div style="padding: 16px;">任意 HTML 内容</div>',
        });
      },
      "drawer-b": function () {
        layer.open({
          type: 1,
          offset: "b",
          anim: "slideUp", // 从下往上
          area: ["100%", "160px"],
          shade: 0.1,
          shadeClose: true,
          id: "ID-demo-layer-direction-b",
          content: '<div style="padding: 16px;">任意 HTML 内容</div>',
        });
      },
      "drawer-l": function () {
        layer.open({
          type: 1,
          offset: "l",
          anim: "slideRight", // 从左往右
          area: ["320px", "100%"],
          shade: 0.1,
          shadeClose: true,
          id: "ID-demo-layer-direction-l",
          content: '<div style="padding: 16px;">任意 HTML 内容</div>',
        });
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
