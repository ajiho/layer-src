$(function () {
  $(".iframe").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      "iframe-handle": function () {
        layer.open({
          type: 2,
          area: ["680px", "520px"],
          content: "child.html",
          fixed: false, // 不固定
          maxmin: true,
          shadeClose: true,
          btn: ["获取表单值", "取消"],
          btnAlign: "c",
          yes: function (index, layero) {
            // 获取 iframe 的窗口对象
            var iframeWin = window[layero.find("iframe")[0]["name"]];
            var elemMark = iframeWin.$("#mark"); // 获得 iframe 中某个输入框元素
            var value = elemMark.val();

            if ($.trim(value) === "") return elemMark.focus();
            // 显示获得的值
            layer.msg("获得 iframe 中的输入框标记值：" + value);
          },
        });
      },
      "iframe-video": function () {
        layer.open({
          type: 2,
          title: false,
          area: ["630px", "360px"],
          shade: 0.8,
          closeBtn: 0,
          shadeClose: true,
          content: "//player.youku.com/embed/XMzI1NjQyMzkwNA==", // video 地址
        });
        layer.msg("点击遮罩区域可关闭");
      },
      "iframe-overflow": function () {
        layer.open({
          type: 2,
          area: ["360px", "500px"],
          skin: "layui-layer-rim", // 加上边框
          content: ["child2.html", "no"], // 数组第二个成员设为 no 即屏蔽 iframe 滚动条
        });
      },
      "iframe-curl": function () {
        layer.open({
          type: 2,
          title: "iframe 任意 URL",
          shadeClose: true,
          maxmin: true, //开启最大化最小化按钮
          area: ["900px", "600px"],
          content: "https://getbootstrap.com/",
        });
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
