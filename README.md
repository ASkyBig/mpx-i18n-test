# mpx-i18n-test

## Project setup

```javascript
// 开发构建，默认输出微信小程序
npm run serve

// 开发构建，跨平台输出支付宝小程序
npm run serve:ali

// 开发构建，跨平台输出 Web
npm run serve:web

// 开发构建，跨平台输出其他平台小程序target = swan|tt|qq|jd|ks
npm run serve -- --targets={target}

// 开发构建，同时输出多平台产物
npm run serve -- --targets=wx,ali,web

// 生产构建，默认输出微信小程序
npm run build

// 生产构建，跨平台输出
npm run build:ali
npm run build:web
npm run build -- --targets=wx,ali,web
```
<img width="664" height="764" alt="image" src="https://github.com/user-attachments/assets/95cea38c-58e0-44c3-98a8-ad981cacdb37" />
### config file
```
// mpx.config.js
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

```
### view
```index.mpx
<template>
  <view>
    <view>{{ $t('hello') }}</view>
    <view>{{ $t('500+ reviews') }}</view>
    <view>{{ $t('reviews 500+') }}</view>
    <view>Text from data: {{ testMsg }}</view>
  </view>
</template>

<script>
    import { createPage } from '@mpxjs/core'

    createPage({
      data: {
        testMsg: ''
      },
      onLoad() {
        this.testMsg = this.$t('500+ reviews')
      }
    })
</script>

<script type="application/json">
    {
      "usingComponents": {}
    }
</script>
```
