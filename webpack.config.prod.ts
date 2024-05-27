import { merge } from "webpack-merge"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import commonConfig from "./webpack.config.common"

export default merge(commonConfig, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			openAnalyzer: true,
			reportFilename: "report.html",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: { chunks: "all", name: "vendor", test: /node_modules/ },
			},
		},
	},
})
