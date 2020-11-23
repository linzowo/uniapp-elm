// 过滤器 mixin

export const filtersMixin = {
  filters: {
    imgUrlFilter(origin, resize = "w_130,h_130,m_fixed") {
      return (
        "https://cube.elemecdn.com/" +
        origin[0] +
        "/" +
        origin.slice(1, 3) +
        "/" +
        origin.slice(3) +
        "." +
        (origin.slice(-3) == "png" ? "png" : origin.slice(-4)) +
        "?x-oss-process=image/format,webp/resize," +
        resize
      );
    },
  },
};
