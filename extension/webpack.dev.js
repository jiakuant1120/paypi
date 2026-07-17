const { merge } = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const { BUILD_PATH, commonConfig } = require("./webpack.common.js");
const { loadBuildEnv } = require("./webpack.env.js");

const devConfig = (envFile, env = {}) => ({
  mode: "development",
  devtool: "cheap-source-map",
  devServer: {
    static: BUILD_PATH,
    port: 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_SERVER: true,
      DEV_EXTENSION: true,
    }),
    new webpack.NormalModuleReplacementPlugin(
      /webextension-polyfill/,
      path.resolve(__dirname, "../config/shims/webextension-polyfill.ts"),
    ),
    new Dotenv({ path: envFile, systemvars: true }),
  ],
});

// Merge AMPLITUDE_KEY from .env into the env object passed to commonConfig,
// so its DefinePlugin handles the value without conflicts.
module.exports = (env = {}) => {
  const envFile = loadBuildEnv();
  const mergedEnv = {
    ...env,
    AMPLITUDE_KEY: env.AMPLITUDE_KEY || process.env.AMPLITUDE_KEY || "",
    AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY:
      env.AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY ||
      process.env.AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY ||
      "",
    BUILD_TYPE: "development",
  };
  return merge(devConfig(envFile, mergedEnv), commonConfig(mergedEnv));
};
