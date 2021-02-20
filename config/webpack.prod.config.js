/*
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-12-16 17:16:56
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-31 18:12:48
 */
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const ZipPugin = require('../webpack-plugin/zipPlugin')
module.exports = smp.wrap(
    merge(baseConfig, {
        mode: 'production',
        plugins: [
            new ZipPugin({
                filename: 'dist'
            }),
            new CleanWebpackPlugin()

        ]
    })
) 