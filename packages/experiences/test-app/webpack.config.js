const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outDir = path.join(process.cwd(), "/dist");
module.exports = env => ({
  entry: [path.join(process.cwd()+ '/src', "index.tsx")],
  output: {
    filename: "[name]-[hash].js",
    path: outDir
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".graphql"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.join(process.cwd(), "tsconfig.json"),
              useCache: false
            }
          }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        use: [
          {
            loader: "webpack-graphql-loader",
            //loader: "graphql-tag/loader",
            options: {
              //output: 'document'
              // validate: true,
              // schema: "./path/to/schema.json",
              // removeUnusedFragments: true
              // etc. See "Loader Options" below
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outDir)
  ]
});
