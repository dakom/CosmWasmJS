const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = {
  mode: "production",
  entry: "./src/index.ts",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp:
        /wordlists\/(french|spanish|italian|korean|chinese_simplified|chinese_traditional|japanese)\.json$/,
    }),
  ],
};

const webEsmConfig = {
  ...commonConfig,
  target: "web",
  output: {
    filename: "bundle.esm.js",
    library: {
      type: "module",
    },
  },
  resolve: {
    ...commonConfig.resolve,
    fallback: {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      path: require.resolve("path-browserify"),
      crypto: false,
    },
  },
  plugins: [
    ...commonConfig.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  experiments: {
    outputModule: true,
  },
};

const webUmdConfig = {
  ...commonConfig,
  target: "web",
  output: {
    filename: "bundle.umd.js",
    library: {
      name: "CosmWasmJS",
      type: "umd",
    },
  },
  resolve: {
    ...commonConfig.resolve,
    fallback: {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      path: require.resolve("path-browserify"),
      crypto: false,
    },
  },
  plugins: [
    ...commonConfig.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};

const nodeConfig = {
  ...commonConfig,
  target: "node",
  output: {
    libraryTarget: "commonjs",
    filename: "bundle.node.js",
  },
};

module.exports = [webEsmConfig, webUmdConfig, nodeConfig];
