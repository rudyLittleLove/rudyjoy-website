const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 作为配置文件，直接导出配置对象即可
module.exports = {
  devServer: {
    // 设置主机地址
    host: "192.168.137.1",
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
  configureWebpack: config => {
    // 开发环境不需要gzip
    if (process.env.NODE_ENV !== "production") return;
    config.plugins.push(
      new CompressionWebpackPlugin({
        // 正在匹配需要压缩的文件后缀
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        // 大于10kb的会压缩
        threshold: 10240
        // 其余配置查看compression-webpack-plugin
      })
    );
  },
  chainWebpack: config => {
    // const imagesRule = config.module.rule("images");
    // imagesRule
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end();

    config.module
      .rule("html")
      .test(/\.html$/)
      .use("html-loader")
      .loader("html-loader");

    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 2048 }));
  }
};
