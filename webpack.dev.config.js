const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: 'widget.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,

                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'sass-loader',
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {template: path.resolve(__dirname, 'dev', 'index.html')}
        ),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ]
}

module.exports = merge(common, config);
