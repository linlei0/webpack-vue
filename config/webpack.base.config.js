/*
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-12-16 17:16:00
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-31 18:24:24
 */
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
console.log(OptimizeCssAssetsPlugin)
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')
// const PATHS = {
//   src: path.join(__dirname, 'src')
// }
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'postcss-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async', // async异步引入库进行分离(默认),initial同步引入库分离，all所有引入库分离
      minSize: 30000, // 抽离公共包最小的大小
      maxSize: 0,
      minChunks: 1, // 最小使用的次数 
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        // 提取公共js
        commons: {
          chunks: "all", // initial
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: "commons"
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // }
        // 合并所有css
        // styles: {
        //   name: 'style',
        //   test: /\.(css|scss)$/,
        //   chunks: 'all',
        //   minChunks: 1,
        //   enforce: true
        // }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].css",
      chunkFilename: "style/[hash:8].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),//需要安装cssnano
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    new VueLoaderPlugin()
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    // })
    
  ]
}

// webpack 优化
// 1.scope hoisting
// 构建后的代码会存在大量的闭包，造成体积增大，运行代码时创建的函数作用域变多，内存开销变大。scope hoisting蒋所有模块代码按照引用顺序，放在一个函数作用域里，然后适当的重命名一些变量以防止，变量名冲突。

// 2.speed-measure-webpack-plugin
// 可以分析每个loader和plugin耗时，有助于我们找到构建过程中的性能瓶颈

// 3.
