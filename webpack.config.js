const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const VENDOR_LIBS = ["cors", "dotenv", "express", "mongoose", "multer", "jsonwebtoken", "bcrypt"]

module.exports = {
	mode: "production",
	entry: {
		main: ["babel-polyfill", "./server.js"],
		vendor: VENDOR_LIBS,
	},
	output: {
		filename: "[name]-[contenthash].js",
		path: path.resolve(__dirname, "build"),
	},
	target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	plugins: [new CleanWebpackPlugin()],
}
