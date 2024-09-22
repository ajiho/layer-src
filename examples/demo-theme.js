$(function () {
  $(".theme").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      "theme-alert": function () {
        layer.alert(
          "墨绿风格，点击继续确认看深蓝",
          {
            skin: "layui-layer-molv", // 样式类名
          },
          function () {
            layer.alert("深蓝", {
              skin: "layui-layer-lan",
            });
          }
        );
      },
      "theme-win10": function () {
        layer.alert("Windows 10 风格主题", {
          skin: "layui-layer-win10", // 2.8+
          shade: 0.01,
          btn: ["确定", "取消"],
        });
      },
      "theme-win10-page": function () {
        // 此处以一个简单的 Win10 风格记事本为例
        layer.open({
          type: 1, // 页面层类型
          skin: "layui-layer-win10", // 2.8+
          shade: 0.01,
          area: ["50%", "60%"],
          maxmin: true,
          title: "*无标题 - 记事本",
          content: [
            '<div style="padding: 0 8px; height: 20px; line-height: 20px; border-bottom: 1px solid #F0F0F0; box-sizing: border-box; font-size: 12px;">',
            // 自定义菜单，此处仅作样式演示，具体功能可自主实现
            [
              '<a href="javascript:;">文件(F)</a>',
              '<a href="javascript:;" >编辑(E)</a> ',
              '<a href="javascript:;" >格式(O)</a> ',
              '<a href="javascript:;" >查看(V)</a> ',
              '<a href="javascript:;" >帮助(H)</a> ',
            ].join("   "),
            "</div>",
            '<textarea style="position: absolute; top: 20px; width: 100%; height: calc(100% - 20px); padding: 6px; border: none; resize: none; overflow-y: scroll; box-sizing: border-box;"></textarea>',
          ].join(""),
        });
      },
      "theme-custom": function () {
        layer.alert("自定义其他任意主题", {
          skin: "class-layer-demo-custom",
        });
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
