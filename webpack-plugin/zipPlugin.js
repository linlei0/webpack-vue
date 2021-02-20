const JSZip = require('jszip')
const RawSource = require('webpack-sources').RawSource
const path = require('path')
const pluginName = 'MyPugin'
const zip = new JSZip()
class MyPugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // table钩子
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      // // 创建一个文件夹
      const folder = zip.folder(this.options.filename)
      // 读取打包后的文件内容，并写入到文件夹
      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source()
        folder.file(filename, source)
      }
      // 开始压缩
      zip.generateAsync({ type: 'nodebuffer' })
        .then(content => {
          const outputPath = path.join(
            compilation.options.output.path,
            this.options.filename + '.zip'
          )
          console.log(compilation.options.output.path, outputPath)
          const outputRelativePath = path.relative(
            compilation.options.output.path,
            outputPath
          )
          console.log(outputRelativePath)
          compilation.assets[outputRelativePath] = new RawSource(content)
          callback()
        })
    })
  }
}
module.exports = MyPugin