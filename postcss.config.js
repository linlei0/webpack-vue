/*
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-12-31 17:26:34
 * @LastEditors: Andy
 * @LastEditTime: 2020-12-31 17:28:58
 */
module.exports = {
    loader: 'postcss-loader',
    plugins: {
      'postcss-preset-env': {
        stage: 0,
        features: {
          'nesting-rules': true,
          'autoprefixer': { grid: true }
          
        }
      }
    }
  }