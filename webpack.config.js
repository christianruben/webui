module.exports = { 
    optimization: {
        splitChunks: {
            chunks: 'all',
            noEmitOnErrors: true,
            namedModules: true,
            namedChunks: true,
            nodeEnv: 'production',
            removeAvailableModules: true
        }
    }
}