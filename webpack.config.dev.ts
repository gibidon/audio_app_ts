import { merge } from "webpack-merge"
import commonConfig from "./webpack.config.common"
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"

export default merge(commonConfig, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		port: 3000,
		hot: true,
		open: true,
	},
})
