const path = require("path");

const { HotModuleReplacementPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const webpackConfigCommon = require("./webpack.config.common");

const webpackConfigDev = {
	mode: "development",
	plugins: [new HotModuleReplacementPlugin()],
	devServer: {
		host: '127.0.0.1',
        hot: true,
        inline: true,
        port: 3000,
        open: true,
        overlay: true,
	}
};

module.exports = merge(webpackConfigCommon, webpackConfigDev);