const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {bundle: path.resolve(__dirname, 'src/index.js')},
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle[hash].js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'build'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
        {
            test: /\.(s(a|c)ss)$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'],
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        {
            test:/\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test:/\.(png|jpg|jpeg)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'images/[name][ext][query]'
              }
        },
        {
            test:/\.svg$/i,
            type: 'asset/resource',
            generator: {
                filename: 'svg/[name][ext][query]'
              }
        },
        {
            test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext][query]'
              }

        },
    ]
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name][hash].css",
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'The Spark',
            filename: 'index.html',
            template: 'src/index.html',
            favicon: 'src/favicon.png'
        })
    ]
}
