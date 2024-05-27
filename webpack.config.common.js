const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: "./index.ts",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html"),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "public/icons8-star.png"),
					to: path.resolve(__dirname, "dist"),
				},
			],
		}),
		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: { plugins: [require("postcss-preset-env")] },
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.[tj]sx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|jpeg|gif|mp3)$/i,
				type: "asset/resource",
			},
		],
	},
}
