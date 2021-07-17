const path = require("path")

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "assets": '@/assets',
                "common": '@/common',
                "components": '@/components',
                "network": '@/network',
                "views": '@/views',
            }
        },
        devServer: {
            open: true,
            // host: '0.0.0.0',
            // port: 8080,
            https: false,
            proxy: {
                '/api': {
                    target: 'http://192.168.1.8:3000/api',
                    // 允许跨域
                    changeOrigin: true,
                    ws: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    },
    css: {
        requireModuleExtension: true,
        loaderOptions: {
            // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
            // 因为 `scss` 语法在内部也是由 sass-loader 处理的
            // 但是在配置 `prependData` 选项的时候
            // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
            // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
            // 如果 sass-loader 版本 = 8，这里使用 `prependData` 字段
            // 如果 sass-loader 版本 < 8，这里使用 `data` 字段
            // 如果 sass-loader 版本 > 8，这里使用 `additionalData` 字段
            scss: {
                prependData: `@import "~@/styles/base.scss";`
            },
        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },

    chainWebpack: config => {
        // config.module
        //     .rule('scss')
        //     .test(/\.scss$/)
        //     .use('sass-loader')
        //         .loader('sass-loader')
        //     .tap(options => {
        //         // 修改它的选项...
        //         return options
        //     })
        //     .end()
    },
    chainWebpack: config => {
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) //处理svg目录（根据你建的文件路径）
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
}
