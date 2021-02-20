/*
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-12-16 17:16:12
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-31 17:56:22
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const path = require('path')

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(
  merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
              test: /\.js$/,
              loader: ['babel-loader', 'eslint-loader'],
              exclude: /node_modules/
            }
          ]
    },
    devServer: {
      // contentBase: path.join(__dirname, "dist"),
      port: 9091, // 本地服务器端口号
      // hot: true, // 热重载
      // overlay: true // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
      disableHostCheck: true
    },
  })
) 