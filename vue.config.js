const webpack = require('webpack')
const path = require('path')
const dayjs = require('dayjs')
const TerserPlugin = require('terser-webpack-plugin')
const webpackZipPlugin = require('webpack-zip-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const IS_PROD = process.env.VUE_APP_ENV === 'production'
const IS_NEED_ZIP = false // 是否需要打包zip（暂时只支持mac）
const IS_NEED_ZIP_HISTORY = false // 是否需要保留历史zip版本
const resolve = _path => path.resolve(__dirname, _path)
const timestamp = dayjs().format('YYYYMMDDHHmmss')
const versionName = dayjs().format('MMDDHHmm')
// 请求代理回调
const proxyReq = proxyReq => {
  const { sockets } = proxyReq.agent
  const keys = Object.keys(sockets)
  console.log(
    `当前请求代理到：${keys[0]}${sockets[keys[0]][0]._httpMessage.path}`
  )
}
module.exports = {
  // 根据环境变量部署应用包时的基本 URL,生产环境需要替换成打包的路径
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  productionSourceMap:false,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  pluginOptions: {
    // 配置less 公共变量 mixin引入, 不用每个文件引入了
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/variables.less'),
        path.resolve(__dirname, './src/assets/less/functions.less')
      ]
    }
  },
  runtimeCompiler: true,
  configureWebpack: config => ({
    // config: process.env.VUE_APP_ENV === 'production' ? Object.assign(config, {
    //   name: name,
    //   externals: externals
    // }) : config,
    resolve: {
       // 导入文件时，不带扩展名，会依次按这几个扩展名找
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        src: resolve('src')
      }
    },
    devtool: 'source-map',
    output: {
      // js输出重构【模块名称.时间戳】
      filename: `static/js/[name].${timestamp}.js`,
      chunkFilename: `static/js/[name].${timestamp}.js`
    },
    // 压缩混淆
    // optimization: IS_PROD
    //   ? {
    //     minimize: true,
    //     minimizer: [
    //       new TerserPlugin({
    //         test: /\.js(\?.*)?$/i,
    //         parallel: true,
    //         terserOptions: {
    //           compress: {
    //             drop_debugger: true,
    //             drop_console: false
    //           }
    //         }
    //       })
    //     ]
    //   }
    //   : {}
  }),
  chainWebpack: config => {
    // config.plugins.delete('preload') // TODO: need test
    // config.plugins.delete('prefetch') // TODO: need test

    if (process.env.VUE_APP_ENV === 'production') {
      // externals里的模块不打包(CDN)
      // config.externals(externals)

      config.plugin('html').tap(args => {
        args[0].minify.minifyCss = true
        return args
      })

      // 注入版本号时间戳
      config.plugin('html').tap(args => {
        const defaultConfig = args[0]
        return [
          {
            ...defaultConfig,
            timestamp: timestamp
          }
        ]
      })

      // gzip需要nginx进行配合
      // config
      //   .plugin('compression')
      //   .use(CompressionWebpackPlugin)
      //   .tap(() => [
      //     {
      //       test: /\.js$|\.html$|\.css/, // 匹配文件名
      //       threshold: 10240, // 超过10k进行压缩
      //       deleteOriginalAssets: false // 是否删除源文件
      //     }
      //   ])
    }
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    if (IS_PROD) {
      config
        .plugin('banner-plugin')
        .use(webpack.BannerPlugin, [
          {
            banner: `发布时间${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
            include: /app/
          }
        ])
        .end()

      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 20480 }))
        .end()

      if (IS_NEED_ZIP && require('os').type() !== 'Windows_NT') {
        config.plugin('zip-plugin').use(webpackZipPlugin, [
          {
            frontShell: IS_NEED_ZIP_HISTORY
              ? 'ls && pwd'
              : 'ls && pwd && cd ./buildHistory && rm -rf !.gitkeep *',
            initialFile: './dist/',
            endPath: './buildHistory',
            zipName: `h5-build-${versionName}.zip`
            // behindShell: `mv h5-build-${versionName}.zip ./buildHistory`
          }
        ])
      }
    }

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

      config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.VUE_APP_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.VUE_APP_ENV !== 'development', config => {
       

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          libs: {
            name: 'chunk-libs',
            chunks: 'initial', // only package third parties that are initially dependent
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      })

      config.optimization.runtimeChunk('single')
    })
  },
  css: {
    extract: {
      filename: `static/css/[name].${timestamp}.css`, // css输出重构【模块名称.时间戳】
      chunkFilename: `static/css/[name].${timestamp}.css`,
      ignoreOrder: true // 去除打包时因为css的引入顺序导致的warning
    },
    // 开启 CSS source maps? todo: 是否影响HMR
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 100, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            // propWhiteList: [],  // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], // 黑名单
            exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], // 要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 3 // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8088,
    disableHostCheck: true,
    proxy: {
      '/course': {
        target: process.env.VUE_APP_API_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/course': '/course'
        },
        onProxyReq: proxyReq
      }
    }
  }
}
