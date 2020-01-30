// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;
module.exports = { 
    chainWebpack: config => {
        config.performance
            .maxEntrypointSize(400000)
            .maxAssetSize(400000)
    },
    configureWebpack:{
        performance: {
            hints: false,
        },
        optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            maxSize: 25000,
        }
        }
    }
}