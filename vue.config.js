module.exports = {
  devServer: {
    proxy: {
      "/v": {
        target: "https://elm.cangdu.org",
        changeOrigin: true,
      },
      "/shopping": {
        target: "https://elm.cangdu.org",
        changeOrigin: true,
      },
      "/img": {
        target: "https://elm.cangdu.org",
        changeOrigin: true,
      },
      "/payapi": {
        target: "https://elm.cangdu.org",
        changeOrigin: true,
      },
      "/bos": {
        target: "https://elm.cangdu.org",
        changeOrigin: true,
      },
    },
  },
};
