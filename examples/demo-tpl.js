$(function () {
  $(".type").on("click", "button", function () {
    const that = this;
    let type = $(this).data("type");

    const actions = {};

    (actions[type] || (() => console.log("Default action")))();
  });
});
