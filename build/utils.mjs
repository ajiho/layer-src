export default {
  sprintf(_str, ...args) {
    let flag = true;
    let i = 0;

    const str = _str.replace(/%s/g, () => {
      const arg = args[i++];

      if (typeof arg === "undefined") {
        flag = false;
        return "";
      }
      return arg;
    });

    return flag ? str : "";
  },
};
