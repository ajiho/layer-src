$(function () {
  $(".other").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      tab: function () {
        layer.tab({
          area: ["600px", "300px"],
          tab: [
            {
              title: "Title 1",
              content: '<div style="padding: 16px;">tabs content 111</div>',
            },
            {
              title: "Title 2",
              content: '<div style="padding: 16px;">tabs content 222</div>',
            },
            {
              title: "Title 3",
              content: '<div style="padding: 16px;">tabs content 333</div>',
            },
          ],
          shadeClose: true,
        });
      },
      "prompt-0": function () {
        layer.prompt({ title: "请输入文本" }, function (value, index, elem) {
          if (value === "") return elem.focus();
          layer.msg("获得：" + util.escape(value)); // 显示 value
          // 关闭 prompt
          layer.close(index);
        });
      },
      "prompt-1": function () {
        layer.prompt(
          { title: "请输入密令", formType: 1 },
          function (value, index, elem) {
            if (value === "") return elem.focus();
            layer.msg("获得：" + util.escape(value)); // 显示 value
            // 关闭 prompt
            layer.close(index);
          }
        );
      },
      "prompt-2": function () {
        layer.prompt(
          { title: "请输入文本", formType: 2 },
          function (value, index, elem) {
            if (value === "") return elem.focus();
            layer.msg("获得：" + util.escape(value)); // 显示 value
            // 关闭 prompt
            layer.close(index);
          }
        );
      },
      "photos-one": function () {
        layer.photos({
          photos: {
            title: "Photos Demo",
            start: 0,
            data: [
              {
                alt: "浩瀚宇宙",
                pid: 5,
                src: "https://unpkg.com/outeres@0.1.1/demo/outer-space.jpg",
              },
            ],
          },
          footer: false, // 是否显示底部栏 --- 2.8.16+
        });
      },
      photos: function () {
        layer.photos({
          photos: {
            title: "Photos Demo",
            start: 0,
            data: [
              {
                alt: "layer",
                pid: 1,
                src: "https://unpkg.com/outeres@0.1.1/demo/layer.png",
              },
              {
                alt: "壁纸",
                pid: 3,
                src: "https://unpkg.com/outeres@0.1.1/demo/000.jpg",
              },
              {
                alt: "浩瀚宇宙",
                pid: 5,
                src: "https://unpkg.com/outeres@0.1.1/demo/outer-space.jpg",
              },
            ],
          },
        });
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
