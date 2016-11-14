var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: './src/main.js',
    output: {
        // path: '/dist',
        path: path.join(__dirname, "dist"),
        // publicPath: 'dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel!eslint',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: '[name].[ext]?[hash]&mimetype=application/font-woff'
            }
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: '[name].[ext]?[hash]&mimetype=application/font-woff2'
            }
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: '[name].[ext]?mimetype=application/font-woff2'
            }
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: '[name].[ext]?mimetype=application/font-woff2'
            }
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: '[name].[ext]?mimetype=image/svg+xml'
            }
        }, {
            test: /\.json(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
                name: '[name].[ext]?mimetype=application/json'
            }
        }]
    },
    vue: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader?sourceMap", {
                publicPath: "../dist/"
            }
        )
    },
    plugins: [
        new ExtractTextPlugin("[name].css", { allChunks: true, resolve: ['modules'] }),
    ],
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    }
}
