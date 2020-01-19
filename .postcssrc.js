// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
    },
    "postcss-px-to-viewport":{
      viewportWidth: 375, //一般设计稿对应宽度，基于iphone6
      viewportHeight: 667,
      unitPrecision: 5, //px转换为vw小数点位数
      viewportUnit: 'vw', //建议使用vw
      selectorBlackList: ['main-tab-bar','tab-bar','tab-bar-item'],
      minPixelValue: 1, //小于1px时不做转化
      mediaQuery: false,//是否允许媒体查询
      exclude:[/TabBar/]
    }
  }
}
