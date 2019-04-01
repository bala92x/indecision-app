const path = require('path')

const publicPath = path.join(__dirname, 'public')

module.exports = {
    entry: './src/app.js',
    output: {
        path: publicPath,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: publicPath
    }
}