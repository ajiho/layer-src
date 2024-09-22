$(function () {
  $(".load").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {
      "load-1": function () {
        var loadIndex = layer.load(0);
        // 模拟关闭
        setTimeout(function () {
          layer.close(loadIndex);
        }, 3000);
      },
      "load-2": function () {
        var loadIndex = layer.load(1);
        // 模拟关闭
        setTimeout(function(){
          layer.close(loadIndex)
        }, 3000);
      },
      "load-3": function () {
        var loadIndex = layer.load(2);
        // 模拟关闭
        setTimeout(function(){
          layer.close(loadIndex)
        }, 3000);
      },
      "load-4": function () {
        var loadIndex = layer.msg('加载中', {
          icon: 16,
          shade: 0.01
        });;
        // 模拟关闭
        setTimeout(function(){
          layer.close(loadIndex)
        }, 3000);
      },
    };

    (actions[type] || (() => console.log("Default action")))();
  });
});
