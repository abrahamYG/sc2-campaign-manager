const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./renderer.tsx",
	target: "electron-renderer",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				//options: { presets: ["@babel/env"] }
			},
			{ 
				test: /\.tsx?$/, 
				loader: "awesome-typescript-loader" 
			},
			
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader", 
					"css-loader",
					"sass-loader"
				]
			},
			{ 
				enforce: "pre", 
				test: /\.js$/, 
				loader: "source-map-loader" 
			}
        ]
    },
	resolve: { 
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".json"] 
	},
	/*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/
	output: {
		path: path.join(__dirname, "/dist/"),
		publicPath: "./dist/",
		filename: "../bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "http://localhost:3000/dist/",
		hotOnly: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};
