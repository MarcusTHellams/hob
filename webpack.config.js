const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractCSS = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('static/css/[name].css');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

module.exports = {
    entry: {
        vendor: [
            'angular'
        ],
        bundle: './app/index.js'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.join(path.join(process.cwd(), 'dist')),
        filename: 'static/js/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.scss$/,
                    /\.json$/
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[name].[ext]'
                        }
                    }
                ]
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: 'raw-loader',
                    }
                ]
            }, {
                test: /\.(js)|(jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }, {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: { sourceMap: true } }]
                })
            }
        ]
    },
    devServer: {
        contentBase: './app',
        watchContentBase: true,
        overlay: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        extractSass,
        new extractCSS({ filename: 'static/css/[name]-2.css' }),
        new webpack
            .optimize
            .CommonsChunkPlugin({
                names: [
                    'common', 'vendor'
                ],
                minChunks: 2
            }),
        new HtmlWebpackPlugin({ template: './app/index.html' }),
        new BaseHrefWebpackPlugin({ baseHref: '/' }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};