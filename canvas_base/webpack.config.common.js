const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader:'file-loader',
                options: {
                    name: '[hash].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                loader: 'url-loader',
                options: {
                    name: '[hash].[ext]',
                    limit: 8192
                }
            }
        ]
    },  
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "./static/favicon.ico",
            template: "./index.html",
            filename: "index.html"
    })],
}