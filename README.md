# 使用webpack搭建vue项目

## 1.创建一个空项目 
npm init -y

## 2.下载webpack，webpack-cli 
目前可以使用webpack5不过还是建议使用webpack4
```
npm i webpack@4.44.2 webpack-cli@3.3.11 -D
```
## 3.配置webpack
- 1.根目录下创建config文件夹，分别创建webpack.base.config.js,webpack.dev.config.js,webpack.prod.config.js

    webpack.base.config.js是我们的公共配置

    webpack.dev.config.js开发配置

    webpack.prod.config.js生产配置
- 2.接下来配置package.json的命令语句
```json
"scripts": {
    "dev": "webpack --mode development --config ./config/webpack.dev.config.js", // 可以打包成dist但是不会对代码进行压缩
    "dev:server": "webpack-dev-server --config ./config/webpack.dev.config.js", // 开发时使用可以通过devServer启动本地服务
    "prod": "webpack --mode production --config ./config/webpack.prod.config.js"// 可以打包成dist会对代码进行压缩
  }
```
执行npm run dev:server时，需要 **npm i webpack-dev-server -D **

- 3.在src目录下创建主入口main.js,模板index.html，接下来就是对webpack进行配置了。

首先在webpack.base.config.js中写入如下的配置
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
entry: './src/main.js',
  output: {
    filename: 'bundle[hash:5].js',
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    })
  ]
```


然后在webpack.dev.config.js中写入如下的配置
```js
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const path = require('path')
module.exports= merge(baseConfig, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9091, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
      },
})
```
在webpack.prod.config.js中写入如下的配置
```js
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
module.exports = merge(baseConfig, {
    mode: 'production'
})
```
这里需要注意的是我们需要使用到一个插件webpack-merge，只要是用来合并的webpack的配置，这样我们一个简单的webpack配置就完成了，可以正常的使用指令了。

- 4.那么我们如何去配置vue呢?这里我们用到了一个webpack的插件vue-loader，安装：
```
npm install -D vue-loader vue-template-compiler
```
同时修改webpack配置：
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle[hash:5].js',
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
        loader: 'babel-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]
}
```
基本的配置基本就完了，剩下的就是在main.js中引入vue实例化了，然后在使用vue-router，vuex全家桶了，上代码后面的不在多说了

main.js
```js
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")

```
app.vue
```vue
<template>
  
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="less" scoped>
  .main {
    color: red;
  } 
</style>
```
router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: "/",
        component: ()=>import('../view/index.vue')
    },
    {
        path: "/about",
        component: ()=>import('../view/about.vue') 
    }
]


const router = new VueRouter({
    routes // routes: routes 的简写
})

export default router
```

store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 1
    }
})

export default store
```

附上完整的package.json
```json
{
  "name": "webpack-spa",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "dev": "webpack --mode development --config ./config/webpack.dev.config.js",
    "dev:server": "webpack-dev-server --config ./config/webpack.dev.config.js",
    "prod": "webpack --mode production --config ./config/webpack.prod.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "autoprefixer-loader": "^3.2.0",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.1",
    "extract-text-webpack-plugin": "^3.0.2",
    "html-loader": "^1.3.2",
    "html-webpack-plugin": "^4.5.0",
    "less": "^4.0.0",
    "less-loader": "^7.1.0",
    "style-loader": "^2.0.0",
    "vue-loader": "^15.9.6",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.12",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^5.7.0"
  },
  "dependencies": {
    "vue": "^2.6.12",
    "vue-router": "^3.4.9",
    "vuex": "^3.6.0"
  }
}
```
以上仅仅是基础版本，更多的配置需要自己配置webpack


从输入url到页面解析的过程
// 回答要点
1.浏览器根据DNS服务器得到域名或ip
2.向这个ip的机器发送http请求
3.服务器收到，处理返回的http请求
4.浏览器得到返回内容

// 稍加分析
1.例如在浏览器输入baidu.com，通过DNS解析得到百度的ip，然后浏览器向该ip发送http请去
2.服务端收到http请求，然后通过计算，返回http请求，返回的内容其实就是一段HTML格式的字符串，因为只有HTML格式浏览器才能正确的解析，这是W3C的标准要求。

// 渲染过程
1.根据HTML结构生成DOM树
2.根据CSS生产CSSOM
3.将DOM和CSSOM整合成renderTree
4.根据renderTree开始渲染和展示
4.遇到<script>，会执行并阻塞渲染

// 加以分析
如果遇到<link  href=="..."/>
























