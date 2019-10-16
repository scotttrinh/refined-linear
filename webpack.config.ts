import * as path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

module.exports = (
  _env: string,
  argv: Record<string, boolean | number | string>
): webpack.Configuration => ({
  devtool: "source-map",
  stats: {
    all: false,
    errors: true,
    builtAt: true
  },
  entry: {
    content: "./src/content",
    options: "./src/options"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            query: {
              compilerOptions: {
                // Enables ModuleConcatenation. It must be in here to avoid conflict with ts-node
                module: "es2015",

                // With this, TS will error but the file will still be generated (on watch only)
                noEmitOnError: argv.watch === false
              },

              // Make compilation faster with `fork-ts-checker-webpack-plugin`
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([
      {
        from: "*",
        context: "src",
        ignore: ["*.js", "*.ts", "*.tsx", "*.css"]
      }
    ])
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  optimization: {
    // Without this, function names will be garbled and enableFeature won't work
    concatenateModules: true,

    // Automatically enabled on production; keeps it somewhat readable for AMO reviewers
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2 // eslint-disable-line @typescript-eslint/camelcase
          }
        }
      })
    ]
  }
});
