const path = require('path')
//导入包（生成预览页面的插件）
const HtmlWebpackPlugin = require('html-webpack-plugin')
//创建对象
const htmlPlugin = new HtmlWebpackPlugin({
  //设置生成预览页面的模板文件
  template: "./src/index.html",
  //设置生成的预览页面名称
  filename: "index.html"
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')
vueLoaderPlugin = new VueLoaderPlugin()

module.exports = {
  mode: "development",//可以设置为development(开发模式)，production(发布模式)
  // 设置入口文件路径
  entry: path.join(__dirname, './src/index.js'),
  //设置出口路径
  output: {
    //设置路径
    path: path.join(__dirname, './dist'),
    //设置文件名
    filename: 'bundle.js'
  },
  // 添加以下代码：
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
      watch: true
    }
  },
  plugins: [htmlPlugin, vueLoaderPlugin],
  //配置loader（.webpack中的加载器）
  module: {
    rules: [
      {
        //test设置需要匹配的文件类型，支持正则
        test: /\.css$/,
        //use表示该文件类型需要调用的loader
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        //test设置需要匹配的文件类型，支持正则
        test: /\.less$/,
        //use表示该文件类型需要调用的loader
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        //test设置需要匹配的文件类型，支持正则
        test: /\.scss$/,
        //use表示该文件类型需要调用的loader
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
        //limit用来设置字节数，只有小于limit值的图片，才会转换
        //为base64图片
        type: 'javascript/auto',
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            esModule: false,
            name: '[hash:10].[ext]'
          }
        }]
      },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}