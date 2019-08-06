const path = require("path");
// 作为配置文件，直接导出配置对象即可
module.exports = {
  devServer: {
    // 设置主机地址
    host: "localhost",
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://172.50.10.39:8000/v1",
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  chainWebpack: config => {
    const imagesRule = config.module.rule("images");
    imagesRule
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        bypassOnDebug: true
      })
      .end();
    // config.module
    //   .rule("images")
    //   .use("url-loader")
    //   .loader("url-loader")
    //   .tap(options => Object.assign(options, { limit: 20480 }));
  }
};
