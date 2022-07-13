// 安装babel转换器,对图片进行base64编译
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
}