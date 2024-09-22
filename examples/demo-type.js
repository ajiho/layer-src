
$(function () {

  // console.log(layer);
  layer.path = 'adsad'
  

  //全局设置layer的配置项
  layer.config({
    extend:'aa',
    path:'xxx',
    title: "全局默认标题",
    skin: "", // 设置默认主题
    // … 其他任意基础属性
  });


  $(".type").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      open: function () {
        layer.open({
          type: 1, // page 层类型
          area: ["500px", "300px"],
          // title: "Hello layer",
          shade: 0.6, // 遮罩透明度
          shadeClose: true, // 点击遮罩区域，关闭弹层
          maxmin: true, // 允许全屏最小化
          anim: 0, // 0-6 的动画形式，-1 不开启
          content:
            '<div style="padding: 32px;">一个普通的页面层，传入了自定义的 HTML</div>',
        });
      },
      alert: function () {
        layer.alert("对话框内容");
      },
      confirm: function () {
        layer.confirm(
          "一个询问框的示例？",
          {
            btn: ["确定", "关闭"], //按钮
          },
          function () {
            layer.msg("第一个回调", { icon: 1 });
          },
          function () {
            layer.msg("第二个回调", {
              time: 20000, // 20s 后自动关闭
              btn: ["明白了", "知道了"],
            });
          }
        );
      },
      msg: function () {
        layer.msg("一段提示信息");
      },
      page: function () {
        // 页面层
        layer.open({
          type: 1,
          area: ["420px", "240px"], // 宽高
          content: '<div style="padding: 11px;">任意 HTML 内容</div>',
        });
      },
      iframe: function () {
        // iframe 层
        layer.open({
          type: 2,
          title: "iframe test",
          shadeClose: true,
          shade: 0.8,
          area: ["380px", "80%"],
          content: "/welcome.html", // iframe 的 url
        });
      },
      load: function () {
        const index = layer.load(0, { shade: false });
        setTimeout(function () {
          layer.close(index); // 关闭 loading
        }, 2000);
      },
      tips: function () {
        layer.tips("一个 tips 层", that, {
          tips: 1,
        });
      },
      prompt: function () {
        layer.prompt(
          { title: "密令输入框", formType: 1 },
          function (pass, index) {
            layer.close(index);
            layer.prompt(
              { title: "文本输入框", formType: 2 },
              function (text, index) {
                layer.close(index);
                alert("您输入的密令：" + pass + "；文本：" + text);
              }
            );
          }
        );
      },
      photots: function () {
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
