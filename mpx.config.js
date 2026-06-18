const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: `dist/${process.env.MPX_CURRENT_TARGET_MODE}`,
  pluginOptions: {
    mpx: {
      plugin: {
        srcMode: "wx",
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const path = require("path");
          const packageJSONPath = path.resolve("package.json");
          if (files.has(packageJSONPath)) files.delete(packageJSONPath);
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath);
          }
        },
        i18n: {
          locale: "zh-CN",
          // messages既可以通过对象字面量传入，也可以通过messagesPath指定一个js模块路径，在该模块中定义配置并导出，dateTimeFormats/dateTimeFormatsPath和numberFormats/numberFormatsPath同理
          messages: {
            "en-US": {
              hello: "hello",
              "500+ reviews": "500+ reviews",
              "reviews 500+": "reviews 500+",
            },
            "zh-CN": {
              hello: "你好",
              "500+ reviews": "500+ 条评论",
              "reviews 500+": "评论 500+",
            },
          },
        },
      },
      loader: {},
    },
  },
  /**
   * 如果希望node_modules下的文件时对应的缓存可以失效，
   * 可以将configureWebpack.snap.managedPaths修改为 []
   */
  configureWebpack(config) {},
});
